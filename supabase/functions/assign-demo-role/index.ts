import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Get JWT from Authorization header - REQUIRED
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's auth token to verify identity
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify the user is authenticated using getClaims
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error("Invalid token:", claimsError);
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    const userEmail = claimsData.claims.email;

    if (!userId || !userEmail) {
      console.error("Missing user claims");
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid claims" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body for email (for demo role determination)
    const { email: requestEmail } = await req.json();

    // CRITICAL: Only allow users to assign roles to themselves
    // Verify the email in the request matches the authenticated user
    if (requestEmail && userEmail !== requestEmail) {
      console.error(`Forbidden: User ${userEmail} tried to assign role for ${requestEmail}`);
      return new Response(
        JSON.stringify({ error: "Forbidden: Cannot assign roles to other users" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Determine role based on authenticated user's email (not client-provided)
    let role: "merchant" | "driver" | "transport_admin" = "merchant";
    
    if (userEmail === "driver@demo.com") {
      role = "driver";
    } else if (userEmail === "admin@demo.com") {
      role = "transport_admin";
    } else if (userEmail === "merchant@demo.com") {
      role = "merchant";
    }
    // All other users get default 'merchant' role

    // Use service key client for insertion (to bypass RLS for role assignment)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if role already exists
    const { data: existingRole } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", role)
      .maybeSingle();

    if (!existingRole) {
      const { error: insertError } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: userId, role });

      if (insertError) {
        console.error("Error inserting role:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to assign role" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.log(`Role '${role}' assigned to user ${userId}`);
    } else {
      console.log(`Role '${role}' already exists for user ${userId}`);
    }

    return new Response(
      JSON.stringify({ success: true, role }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    // Return generic error message to avoid leaking internal details
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
