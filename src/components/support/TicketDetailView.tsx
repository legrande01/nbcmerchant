import { useState } from 'react';
import { ArrowLeft, Send, Paperclip, X, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supportTickets, supportCategories, SupportTicket, TicketMessage } from '@/data/supportData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface TicketDetailViewProps {
  ticketId: string;
  onBack: () => void;
}

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const statusLabels: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

const statusIcons: Record<string, React.ReactNode> = {
  open: <AlertCircle className="h-4 w-4" />,
  in_progress: <Clock className="h-4 w-4" />,
  resolved: <CheckCircle2 className="h-4 w-4" />,
  closed: <XCircle className="h-4 w-4" />,
};

export function TicketDetailView({ ticketId, onBack }: TicketDetailViewProps) {
  const { toast } = useToast();
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find ticket and allow for mock updates
  const [ticket, setTicket] = useState<SupportTicket | undefined>(
    supportTickets.find(t => t.id === ticketId)
  );

  const category = ticket ? supportCategories.find(c => c.id === ticket.category) : null;

  if (!ticket) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Ticket not found.</p>
          <Button variant="outline" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      sender: 'merchant',
      senderName: 'You',
      message: replyMessage,
      timestamp: new Date().toISOString(),
    };

    setTicket(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage],
      updatedAt: new Date().toISOString(),
    } : undefined);

    setReplyMessage('');
    setIsSubmitting(false);

    toast({
      title: 'Reply sent',
      description: 'Your message has been added to the ticket.',
    });
  };

  const handleCloseTicket = () => {
    setTicket(prev => prev ? {
      ...prev,
      status: 'closed',
      updatedAt: new Date().toISOString(),
    } : undefined);

    toast({
      title: 'Ticket closed',
      description: 'This support ticket has been closed.',
    });
  };

  const isTicketClosed = ticket.status === 'closed';

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge className={statusColors[ticket.status]} variant="secondary">
                  <span className="flex items-center gap-1">
                    {statusIcons[ticket.status]}
                    {statusLabels[ticket.status]}
                  </span>
                </Badge>
                {ticket.priority === 'high' && (
                  <Badge variant="destructive">High Priority</Badge>
                )}
              </div>
              <CardTitle className="text-xl">{ticket.subject}</CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="font-mono">{ticket.id}</span>
                {category && <span>{category.name}</span>}
                <span>Created {format(new Date(ticket.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
            {!isTicketClosed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <XCircle className="h-4 w-4 mr-2" />
                    Close Ticket
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Close this ticket?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to close this support ticket? You can create a new ticket if you need further assistance.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCloseTicket}>
                      Close Ticket
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Conversation Thread */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticket.messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'merchant' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.sender === 'merchant'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-medium text-sm">{message.senderName}</span>
                  <span className={`text-xs ${message.sender === 'merchant' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-current/10">
                    <p className="text-xs mb-1">Attachments:</p>
                    {message.attachments.map((attachment, i) => (
                      <span key={i} className="text-xs underline">{attachment}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTicketClosed && (
            <div className="text-center py-4">
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                This ticket is closed
              </Badge>
            </div>
          )}
        </CardContent>

        {/* Reply Section */}
        {!isTicketClosed && (
          <>
            <Separator />
            <CardContent className="pt-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" disabled>
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
