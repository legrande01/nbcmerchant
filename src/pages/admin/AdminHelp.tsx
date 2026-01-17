import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Plus, Ticket, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminSupportCategories, adminFAQs, mockAdminTickets, getAdminFAQsByCategory } from '@/data/adminData';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

export default function AdminHelp() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('driver-issues');
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleCreateTicket = () => {
    if (!ticketSubject || !ticketCategory || !ticketMessage) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Support ticket created');
    setIsCreateTicketOpen(false);
    setTicketSubject('');
    setTicketCategory('');
    setTicketMessage('');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="faqs">
        <TabsList>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="faqs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Common questions about managing your transport operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {adminSupportCategories.map((category) => {
                const faqs = getAdminFAQsByCategory(category.id);
                const isExpanded = expandedCategory === category.id;
                return (
                  <Collapsible key={category.id} open={isExpanded} onOpenChange={() => setExpandedCategory(isExpanded ? null : category.id)}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary">{faqs.length}</Badge>
                      </div>
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-3 pt-2">
                        {faqs.map((faq) => (
                          <div key={faq.id} className="border rounded-lg p-4">
                            <p className="font-medium text-sm">{faq.question}</p>
                            <p className="text-sm text-muted-foreground mt-2">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Support Tickets
                </CardTitle>
                <CardDescription>View and manage your support requests</CardDescription>
              </div>
              <Button onClick={() => setIsCreateTicketOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAdminTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {ticket.priority === 'high' && <AlertCircle className="h-4 w-4 text-red-500" />}
                            <span className="font-medium text-sm">{ticket.subject}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {adminSupportCategories.find(c => c.id === ticket.category)?.name}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[ticket.status]} variant="secondary">
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>Submit a new support request to NBC Sokoni</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Subject</Label>
              <Input placeholder="Brief description of your issue" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={ticketCategory} onValueChange={setTicketCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {adminSupportCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Message</Label>
              <Textarea placeholder="Describe your issue in detail..." rows={4} value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTicket}>Submit Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
