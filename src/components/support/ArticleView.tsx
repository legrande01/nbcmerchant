import { useState } from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supportArticles, supportCategories, getRelatedArticles } from '@/data/supportData';
import { useToast } from '@/hooks/use-toast';

interface ArticleViewProps {
  articleId: string;
  onBack: () => void;
  onViewArticle: (articleId: string) => void;
}

export function ArticleView({ articleId, onBack, onViewArticle }: ArticleViewProps) {
  const { toast } = useToast();
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const article = supportArticles.find(a => a.id === articleId);
  const category = article ? supportCategories.find(c => c.id === article.categoryId) : null;
  const relatedArticles = article ? getRelatedArticles(article.id) : [];

  if (!article) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Article not found.</p>
          <Button variant="outline" onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleFeedback = (helpful: boolean) => {
    setFeedbackGiven(helpful ? 'yes' : 'no');
    toast({
      title: 'Thank you for your feedback!',
      description: helpful
        ? "We're glad this article was helpful."
        : "We'll work on improving this article.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="space-y-3">
            {category && (
              <Badge variant="secondary">{category.name}</Badge>
            )}
            <CardTitle className="text-2xl">{article.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Last updated {new Date(article.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {article.content.split('\n').map((line, index) => {
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
                return null; // Skip table formatting for simplicity
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

          <Separator className="my-8" />

          {/* Feedback Section */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="font-medium mb-4">Was this article helpful?</p>
            {feedbackGiven ? (
              <p className="text-sm text-muted-foreground">
                Thank you for your feedback!
              </p>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleFeedback(true)}
                  className="gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Yes ({article.helpful.yes})
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleFeedback(false)}
                  className="gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  No ({article.helpful.no})
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Related Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onViewArticle(relatedArticle.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm">{relatedArticle.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {relatedArticle.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
