import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BookCard from '@/components/BookCard';
import BookTable from '@/components/BookTable';
import Spinner from '@/components/Spinner';
import CreateBook from '@/components/modals/CreateBook';
import ReadBook from '@/components/modals/ReadBook';
import EditBook from '@/components/modals/EditBook';
import DeleteBook from '@/components/modals/DeleteBook';
import { API_URL, USE_MOCK_DATA, mockBooks } from '@/lib/constants';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

interface ModalState {
  show: boolean;
  type: 'create' | 'read' | 'edit' | 'delete' | null;
  bookId: string | null;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState<'card' | 'table'>('card');
  const [modal, setModal] = useState<ModalState>({ show: false, type: null, bookId: null });

  const fetchBooks = () => {
    setLoading(true);
    
    const request = USE_MOCK_DATA
      ? new Promise<{ data: { data: Book[] } }>(res => setTimeout(() => res({ data: { data: mockBooks } }), 1000))
      : axios.get<{ data: Book[] }>(API_URL);
      
    request
      .then((response) => {
        setBooks(response.data.data); 
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(`An error occurred: ${error.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openModal = (type: 'create' | 'read' | 'edit' | 'delete', bookId: string | null = null) => {
    setModal({ show: true, type, bookId });
  };

  const closeModal = () => {
    const refetch = modal.type === 'create' || modal.type === 'edit' || modal.type === 'delete';
    setModal({ show: false, type: null, bookId: null });
    if (refetch) {
      fetchBooks();
    }
  };

  const renderModalContent = () => {
    if (!modal.show || !modal.type) return null;

    switch (modal.type) {
      case 'create':
        return <CreateBook onClose={closeModal} />;
      case 'read':
        return modal.bookId ? <ReadBook bookId={modal.bookId} onClose={closeModal} /> : null;
      case 'edit':
        return modal.bookId ? <EditBook bookId={modal.bookId} onClose={closeModal} /> : null;
      case 'delete':
        return modal.bookId ? <DeleteBook bookId={modal.bookId} onClose={closeModal} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Toaster position="top-center" reverseOrder={false} />
      
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <Header
          viewType={viewType}
          setViewType={setViewType}
          onShowCreate={() => openModal('create')}
        />

        <main>
          {loading ? (
            <Spinner />
          ) : viewType === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onShowRead={() => openModal('read', book._id)}
                  onShowEdit={() => openModal('edit', book._id)}
                  onShowDelete={() => openModal('delete', book._id)}
                />
              ))}
            </div>
          ) : (
            <BookTable
              books={books}
              onShowRead={(bookId) => openModal('read', bookId)}
              onShowEdit={(bookId) => openModal('edit', bookId)}
              onShowDelete={(bookId) => openModal('delete', bookId)}
            />
          )}
        </main>

        {renderModalContent()}
      </div>
    </div>
  );
};

export default Index;
