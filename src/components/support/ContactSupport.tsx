import { useState } from 'react';
import { Send, Paperclip, MessageSquarePlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supportCategories } from '@/data/supportData';
import { useToast } from '@/hooks/use-toast';

interface ContactSupportProps {
  onTicketCreated: () => void;
}

export function ContactSupport({ onTicketCreated }: ContactSupportProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'normal',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.category || !formData.message) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Support request submitted',
      description: 'Your support request has been submitted — our team will follow up.',
    });

    // Reset form
    setFormData({
      subject: '',
      category: '',
      priority: 'normal',
      message: '',
    });

    setIsSubmitting(false);
    onTicketCreated();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5 text-primary" />
          Contact Support
        </CardTitle>
        <CardDescription>
          Can't find what you need? Submit a support request and our team will help you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          {/* Category and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {supportCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General inquiry</SelectItem>
                  <SelectItem value="normal">Normal - Issue affecting work</SelectItem>
                  <SelectItem value="high">High - Urgent, business impacted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Please describe your issue in detail. Include any relevant order numbers, product names, or error messages."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
            />
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments (optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Paperclip className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Button type="button" variant="outline" size="sm" disabled>
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Max file size: 10MB. Supported: Images, PDF, Documents
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
