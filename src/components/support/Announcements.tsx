import { useState } from 'react';
import { Bell, Megaphone, Wrench, Sparkles, FileText, ChevronRight, ArrowLeft, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { announcements, Announcement } from '@/data/supportData';
import { format, formatDistanceToNow } from 'date-fns';

const typeIcons: Record<string, React.ReactNode> = {
  maintenance: <Wrench className="h-4 w-4" />,
  feature: <Sparkles className="h-4 w-4" />,
  policy: <FileText className="h-4 w-4" />,
  general: <Megaphone className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  feature: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  policy: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  general: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const typeLabels: Record<string, string> = {
  maintenance: 'Maintenance',
  feature: 'New Feature',
  policy: 'Policy Update',
  general: 'Announcement',
};

export function Announcements() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  if (announcements.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Announcements</h3>
          <p className="text-muted-foreground">
            There are no platform announcements at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (selectedAnnouncement) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedAnnouncement(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Announcements
            </Button>
          </div>
          <div className="space-y-3">
            <Badge className={typeColors[selectedAnnouncement.type]} variant="secondary">
              <span className="flex items-center gap-1">
                {typeIcons[selectedAnnouncement.type]}
                {typeLabels[selectedAnnouncement.type]}
              </span>
            </Badge>
            <CardTitle className="text-xl">{selectedAnnouncement.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Published {format(new Date(selectedAnnouncement.publishedAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {selectedAnnouncement.content.split('\n').map((line, index) => {
              if (line.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={index} className="ml-4">{line.replace('- ', '')}</li>;
              }
              if (line.startsWith('| ')) {
                return null; // Skip table rows for simplicity
              }
              if (line.trim() === '') {
                return <br key={index} />;
              }
              if (line.includes('**')) {
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={index}>
                    {parts.map((part, i) => 
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                );
              }
              return <p key={index}>{line}</p>;
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Platform Announcements
          </CardTitle>
          <CardDescription>
            Stay updated with the latest news, features, and important notices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.map((announcement, index) => (
            <div key={announcement.id}>
              <div
                className="p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setSelectedAnnouncement(announcement)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${typeColors[announcement.type]}`}>
                    {typeIcons[announcement.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[announcement.type]}
                          </Badge>
                          {!announcement.isRead && (
                            <span className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {announcement.summary}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(new Date(announcement.publishedAt), { addSuffix: true })}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              {index < announcements.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
