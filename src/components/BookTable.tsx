import { Eye, Pencil, Trash } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

interface BookTableProps {
  books: Book[];
  onShowRead: (id: string) => void;
  onShowEdit: (id: string) => void;
  onShowDelete: (id: string) => void;
}

const BookTable = ({ books, onShowRead, onShowEdit, onShowDelete }: BookTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-y-3">
      <thead className="bg-muted">
        <tr>
          <th className="p-3 text-left rounded-l-md">No.</th>
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left hidden md:table-cell">Author</th>
          <th className="p-3 text-left hidden lg:table-cell">Publish Year</th>
          <th className="p-3 text-center rounded-r-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="bg-card hover:bg-card/80 transition-colors">
            <td className="p-3 rounded-l-md">{index + 1}</td>
            <td className="p-3 font-medium">{book.title}</td>
            <td className="p-3 hidden md:table-cell">{book.author}</td>
            <td className="p-3 hidden lg:table-cell">{book.publishYear}</td>
            <td className="p-3 rounded-r-md">
              <div className="flex justify-center gap-4">
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookTable;
