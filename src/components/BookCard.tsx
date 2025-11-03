import { Eye, Pencil, Trash } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

interface BookCardProps {
  book: Book;
  onShowRead: (id: string) => void;
  onShowEdit: (id: string) => void;
  onShowDelete: (id: string) => void;
}

const BookCard = ({ book, onShowRead, onShowEdit, onShowDelete }: BookCardProps) => (
  <div className="bg-card rounded-lg shadow-md p-5 flex flex-col justify-between relative transition-transform transform hover:scale-105">
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{book.title}</h3>
      <p className="text-lg text-muted-foreground mb-1">{book.author}</p>
      <p className="text-md text-muted-foreground mb-4 bg-muted inline-block px-2 py-0.5 rounded">
        {book.publishYear}
      </p>
    </div>
    <div className="flex justify-end gap-3">
      <button
        onClick={() => onShowRead(book._id)}
        className="text-[hsl(var(--success))] hover:opacity-80 text-2xl transition-opacity"
        title="Show Details"
      >
        <Eye size={24} />
      </button>
      <button
        onClick={() => onShowEdit(book._id)}
        className="text-[hsl(var(--warning))] hover:opacity-80 text-2xl transition-opacity"
        title="Edit Book"
      >
        <Pencil size={24} />
      </button>
      <button
        onClick={() => onShowDelete(book._id)}
        className="text-destructive hover:opacity-80 text-2xl transition-opacity"
        title="Delete Book"
      >
        <Trash size={24} />
      </button>
    </div>
  </div>
);

export default BookCard;
