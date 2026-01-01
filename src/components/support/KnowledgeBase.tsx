import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Book, ChevronRight, Rocket, Package, ShoppingCart, CreditCard, Megaphone, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supportCategories, supportArticles, searchArticles, getArticlesByCategory } from '@/data/supportData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Package,
  ShoppingCart,
  CreditCard,
  Megaphone,
  Shield,
};

interface KnowledgeBaseProps {
  onViewArticle: (articleId: string) => void;
}

export function KnowledgeBase({ onViewArticle }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searchResults = searchQuery.length > 2 ? searchArticles(searchQuery) : [];
  const categoryArticles = selectedCategory ? getArticlesByCategory(selectedCategory) : [];
  const selectedCategoryData = supportCategories.find(c => c.id === selectedCategory);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Knowledge Base
          </CardTitle>
          <CardDescription>
            Find answers to common questions and learn how to use NBC Sokoni
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0) {
                  setSelectedCategory(null);
                }
              }}
              className="pl-10"
            />
          </div>

          {/* Search Results */}
          {searchQuery.length > 2 && (
            <div className="mt-4 space-y-2">
              {searchResults.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Found {searchResults.length} article{searchResults.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((article) => (
                      <div
                        key={article.id}
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => onViewArticle(article.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-sm">{article.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {article.description}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No articles matched your search — try different keywords.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category View */}
      {selectedCategory && selectedCategoryData ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleBackToCategories}>
                ← Back
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              {iconMap[selectedCategoryData.icon] && (
                <div className="p-2 bg-primary/10 rounded-lg">
                  {(() => {
                    const IconComponent = iconMap[selectedCategoryData.icon];
                    return <IconComponent className="h-5 w-5 text-primary" />;
                  })()}
                </div>
              )}
              <div>
                <CardTitle>{selectedCategoryData.name}</CardTitle>
                <CardDescription>{selectedCategoryData.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {categoryArticles.length > 0 ? (
              <div className="space-y-2">
                {categoryArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onViewArticle(article.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                          <span>
                            {article.helpful.yes} found helpful
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No articles in this category yet.
              </p>
            )}
          </CardContent>
        </Card>
      ) : searchQuery.length <= 2 && (
        /* Categories Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCategories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Card
                key={category.id}
                className="hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <Badge variant="secondary" className="mt-3">
                        {category.articleCount} articles
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Popular Articles */}
      {!selectedCategory && searchQuery.length <= 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {supportArticles
                .sort((a, b) => b.helpful.yes - a.helpful.yes)
                .slice(0, 5)
                .map((article) => (
                  <div
                    key={article.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onViewArticle(article.id)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-sm">{article.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {supportCategories.find(c => c.id === article.categoryId)?.name}
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
