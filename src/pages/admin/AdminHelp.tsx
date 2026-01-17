import { useState } from 'react';
import { HelpCircle, MessageSquare, FileText, Bell, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAdminFAQs, mockAdminSupportTickets } from '@/data/transportAdminData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AdminHelp() {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = mockAdminFAQs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTicket = () => {
    toast.success('Support ticket created');
    setShowNewTicket(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get help with driver issues, disputes, and more</p>
        </div>
        <Button onClick={() => setShowNewTicket(true)}><Plus className="h-4 w-4 mr-2" />New Ticket</Button>
      </div>

      <Tabs defaultValue="faq">
        <TabsList><TabsTrigger value="faq">FAQs</TabsTrigger><TabsTrigger value="tickets">My Tickets</TabsTrigger><TabsTrigger value="announcements">Announcements</TabsTrigger></TabsList>

        <TabsContent value="faq" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search FAQs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminSupportTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell><Badge variant="outline">{ticket.category.replace('_', ' ')}</Badge></TableCell>
                      <TableCell><Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>{ticket.status}</Badge></TableCell>
                      <TableCell>{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No announcements at this time</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Support Ticket</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label>Subject</Label><Input placeholder="Brief description of the issue" className="mt-2" /></div>
            <div><Label>Category</Label><Select><SelectTrigger className="mt-2"><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent><SelectItem value="driver_issue">Driver Issue</SelectItem><SelectItem value="delivery_dispute">Delivery Dispute</SelectItem><SelectItem value="reassignment">Reassignment</SelectItem><SelectItem value="compliance">Compliance</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
            <div><Label>Description</Label><Textarea placeholder="Describe your issue in detail..." className="mt-2" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowNewTicket(false)}>Cancel</Button><Button onClick={handleCreateTicket}>Submit</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
