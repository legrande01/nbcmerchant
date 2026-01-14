import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Book, 
  Ticket, 
  MessageSquarePlus, 
  ChevronRight,
  Truck,
  ClipboardCheck,
  UserX,
  Wallet,
  User,
  Search,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  driverSupportCategories,
  driverFAQs,
  driverSupportTickets,
  getDriverFAQsByCategory,
  getCategoryName,
  DriverSupportCategory,
  DriverFAQ,
  DriverSupportTicket,
  DriverTicketStatus
} from '@/data/driverSupportData';
import { mockDriverDeliveries } from '@/data/driverData';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'delivery-issues': Truck,
  'proof-verification': ClipboardCheck,
  'buyer-problems': UserX,
  'payments-earnings': Wallet,
  'account-profile': User,
};

const ticketStatusConfig: Record<DriverTicketStatus, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }> = {
  open: { 
    label: 'Open', 
    icon: AlertCircle,
    className: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  },
  in_review: { 
    label: 'In Review', 
    icon: Clock,
    className: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  },
  resolved: { 
    label: 'Resolved', 
    icon: CheckCircle,
    className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  },
};

export default function DriverHelp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentTab = searchParams.get('tab') || 'faq';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<DriverSupportTicket | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    deliveryId: '',
    message: '',
  });

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
    setSelectedCategory(null);
    setSelectedTicket(null);
  };

  const filteredFAQs = searchQuery
    ? driverFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
      ? getDriverFAQsByCategory(selectedCategory)
      : driverFAQs;

  const handleSubmitTicket = async () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Ticket Submitted',
      description: 'Your support ticket has been created. We will respond shortly.',
    });

    setNewTicket({ subject: '', category: '', deliveryId: '', message: '' });
    setSearchParams({ tab: 'tickets' });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Find answers and get help with deliveries</p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="faq" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">FAQ</span>
          </TabsTrigger>
          <TabsTrigger 
            value="tickets" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Ticket className="h-4 w-4" />
            <span className="hidden sm:inline">My Tickets</span>
          </TabsTrigger>
          <TabsTrigger 
            value="new-ticket" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span className="hidden sm:inline">New Ticket</span>
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-0 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              className="pl-9"
            />
          </div>

          {/* Categories */}
          {!searchQuery && !selectedCategory && (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {driverSupportCategories.map((category) => {
                const Icon = categoryIcons[category.id] || Book;
                return (
                  <Card 
                    key={category.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">{category.articleCount} articles</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Category Header */}
          {selectedCategory && (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h3 className="font-semibold">{getCategoryName(selectedCategory)}</h3>
            </div>
          )}

          {/* FAQ List */}
          <Card>
            <CardContent className="p-4">
              {filteredFAQs.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No FAQs found</p>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-start gap-3">
                          <span className="text-sm font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="mt-0 space-y-6">
          {selectedTicket ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Tickets
              </Button>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
                      <CardDescription>
                        {selectedTicket.id} • {getCategoryName(selectedTicket.category)}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={ticketStatusConfig[selectedTicket.status].className}>
                      {ticketStatusConfig[selectedTicket.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTicket.deliveryId && (
                    <div className="flex items-center gap-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Linked to:</span>
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-primary"
                        onClick={() => navigate(`/driver/deliveries?delivery=${selectedTicket.deliveryId}`)}
                      >
                        {selectedTicket.deliveryId}
                      </Button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Original message */}
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">You</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(selectedTicket.createdAt), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedTicket.message}</p>
                    </div>

                    {/* Responses */}
                    {selectedTicket.responses.map((response) => (
                      <div 
                        key={response.id} 
                        className={`p-4 rounded-lg ${response.isSupport ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {response.isSupport ? 'Support Team' : 'You'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(response.createdAt), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{response.message}</p>
                      </div>
                    ))}
                  </div>

                  {selectedTicket.status !== 'resolved' && (
                    <div className="pt-4 border-t">
                      <Textarea placeholder="Type your reply..." className="mb-3" />
                      <Button>Send Reply</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Ticket Stats */}
              <div className="grid gap-4 grid-cols-3">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">
                      {driverSupportTickets.filter(t => t.status === 'open').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Open</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {driverSupportTickets.filter(t => t.status === 'in_review').length}
                    </p>
                    <p className="text-xs text-muted-foreground">In Review</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                      {driverSupportTickets.filter(t => t.status === 'resolved').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tickets List */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">My Tickets</CardTitle>
                    <Button size="sm" onClick={() => handleTabChange('new-ticket')}>
                      <MessageSquarePlus className="h-4 w-4 mr-2" />
                      New Ticket
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {driverSupportTickets.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No tickets yet</p>
                  ) : (
                    <div className="divide-y">
                      {driverSupportTickets.map((ticket) => (
                        <div 
                          key={ticket.id}
                          className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 min-w-0">
                              <p className="font-medium text-sm truncate">{ticket.subject}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{ticket.id}</span>
                                <span>•</span>
                                <span>{getCategoryName(ticket.category)}</span>
                                <span>•</span>
                                <span>{format(new Date(ticket.updatedAt), 'MMM d')}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className={ticketStatusConfig[ticket.status].className}>
                              {ticketStatusConfig[ticket.status].label}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* New Ticket Tab */}
        <TabsContent value="new-ticket" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Submit a Support Ticket</CardTitle>
              <CardDescription>
                Describe your issue and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={newTicket.category} 
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {driverSupportCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery">Link to Delivery (Optional)</Label>
                <Select 
                  value={newTicket.deliveryId} 
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, deliveryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a delivery (optional)" />
                  </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">No delivery linked</SelectItem>
                    {mockDriverDeliveries.map((delivery) => (
                      <SelectItem key={delivery.id} value={delivery.id}>
                        {delivery.id} - {delivery.customerName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleSubmitTicket}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
