import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book, Ticket, MessageSquarePlus, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KnowledgeBase } from '@/components/support/KnowledgeBase';
import { ArticleView } from '@/components/support/ArticleView';
import { SupportTickets } from '@/components/support/SupportTickets';
import { TicketDetailView } from '@/components/support/TicketDetailView';
import { ContactSupport } from '@/components/support/ContactSupport';
import { Announcements } from '@/components/support/Announcements';

type ViewMode = 'list' | 'article' | 'ticket';

export default function Help() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'knowledge';
  
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
    setViewMode('list');
    setSelectedArticleId(null);
    setSelectedTicketId(null);
  };

  const handleViewArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setViewMode('article');
  };

  const handleViewTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setViewMode('ticket');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedArticleId(null);
    setSelectedTicketId(null);
  };

  const handleCreateTicket = () => {
    setSearchParams({ tab: 'contact' });
    setViewMode('list');
  };

  const handleTicketCreated = () => {
    setSearchParams({ tab: 'tickets' });
    setViewMode('list');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, get help, and stay updated
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="knowledge" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Knowledge Base</span>
            <span className="sm:hidden">Help</span>
          </TabsTrigger>
          <TabsTrigger 
            value="tickets" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Ticket className="h-4 w-4" />
            <span className="hidden sm:inline">Support Tickets</span>
            <span className="sm:hidden">Tickets</span>
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Support</span>
            <span className="sm:hidden">Contact</span>
          </TabsTrigger>
          <TabsTrigger 
            value="announcements" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Announcements</span>
            <span className="sm:hidden">News</span>
          </TabsTrigger>
        </TabsList>

        <div className="max-w-5xl">
          <TabsContent value="knowledge" className="mt-0">
            {viewMode === 'article' && selectedArticleId ? (
              <ArticleView
                articleId={selectedArticleId}
                onBack={handleBackToList}
                onViewArticle={handleViewArticle}
              />
            ) : (
              <KnowledgeBase onViewArticle={handleViewArticle} />
            )}
          </TabsContent>

          <TabsContent value="tickets" className="mt-0">
            {viewMode === 'ticket' && selectedTicketId ? (
              <TicketDetailView
                ticketId={selectedTicketId}
                onBack={handleBackToList}
              />
            ) : (
              <SupportTickets
                onViewTicket={handleViewTicket}
                onCreateTicket={handleCreateTicket}
              />
            )}
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <ContactSupport onTicketCreated={handleTicketCreated} />
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <Announcements />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
