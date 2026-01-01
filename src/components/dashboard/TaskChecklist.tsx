import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChecklistItem } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface TaskChecklistProps {
  items: ChecklistItem[];
  className?: string;
}

const priorityColors = {
  high: 'bg-destructive/10 text-destructive',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-muted text-muted-foreground',
};

export function TaskChecklist({ items, className }: TaskChecklistProps) {
  const incompleteItems = items.filter(item => !item.completed);
  const completedCount = items.filter(item => item.completed).length;
  
  if (incompleteItems.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-success" />
            Things to Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-success mb-2" />
            <p className="text-sm font-medium text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground">You've completed all tasks.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            Things to Complete
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {completedCount}/{items.length} done
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {incompleteItems.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary truncate">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.description}
                </p>
              </div>
              <span className={cn(
                'text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0',
                priorityColors[item.priority]
              )}>
                {item.priority}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0" />
            </Link>
          ))}
        </div>
        {incompleteItems.length > 4 && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            +{incompleteItems.length - 4} more tasks
          </p>
        )}
      </CardContent>
    </Card>
  );
}