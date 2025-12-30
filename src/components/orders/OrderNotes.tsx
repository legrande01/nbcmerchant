import { useState } from 'react';
import { MessageSquare, Plus, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { OrderNote, formatDate, formatTime } from '@/data/mockData';

interface OrderNotesProps {
  notes: OrderNote[];
  onAddNote: (content: string) => void;
}

export function OrderNotes({ notes, onAddNote }: OrderNotesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewNote('');
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Merchant Notes
          </CardTitle>
          {!isAdding && (
            <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Note
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Note Form */}
        {isAdding && (
          <div className="space-y-3 p-4 bg-secondary/50 rounded-lg">
            <Textarea
              placeholder="Add a note about this order..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                Save Note
              </Button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {notes.length > 0 ? (
          <div className="space-y-3">
            {[...notes].reverse().map((note) => (
              <div
                key={note.id}
                className="p-3 bg-secondary/30 rounded-lg border border-border/50"
              >
                <p className="text-sm text-foreground whitespace-pre-wrap">{note.content}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{note.author}</span>
                  <span>•</span>
                  <span>
                    {formatDate(note.createdAt)} at {formatTime(note.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isAdding && (
            <div className="text-center py-6">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No notes yet</p>
              <p className="text-xs text-muted-foreground">
                Add notes to track important information about this order
              </p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
