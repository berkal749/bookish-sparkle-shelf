import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import { API_URL, USE_MOCK_DATA } from '@/lib/constants';

interface DeleteBookProps {
  bookId: string;
  onClose: () => void;
}

const DeleteBook = ({ bookId, onClose }: DeleteBookProps) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteBook = () => {
    setLoading(true);
    
    const request = USE_MOCK_DATA
      ? new Promise(res => setTimeout(() => res({}), 500))
      : axios.delete(`${API_URL}/${bookId}`);
      
    request
      .then(() => {
        setLoading(false);
        toast.success('Book Deleted Successfully!');
        onClose();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(`An error occurred: ${error.message}`);
      });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-3xl font-bold text-foreground mb-6">Delete Book</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Are you sure you want to delete this book? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-2 px-6 rounded-lg transition-all"
          disabled={loading}
        >
          No, Cancel
        </button>
        <button
          onClick={handleDeleteBook}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-2 px-6 rounded-lg transition-all"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteBook;
