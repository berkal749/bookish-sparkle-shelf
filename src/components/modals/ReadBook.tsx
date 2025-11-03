import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import DetailItem from '../DetailItem';
import Spinner from '../Spinner';
import BookReviewGenerator from '../BookReviewGenerator';
import { API_URL, USE_MOCK_DATA, mockBooks } from '@/lib/constants';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ReadBookProps {
  bookId: string;
  onClose: () => void;
}

const ReadBook = ({ bookId, onClose }: ReadBookProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const request = USE_MOCK_DATA
      ? new Promise<{ data: Book }>(res => setTimeout(() => res({ data: mockBooks.find(b => b._id === bookId) || mockBooks[0] as any }), 500))
      : axios.get<Book>(`${API_URL}/${bookId}`);

    request
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(`An error occurred: ${error.message}`);
        onClose();
      });
  }, [bookId, onClose]);

  return (
    <Modal onClose={onClose}>
      <h2 className="text-3xl font-bold text-foreground mb-6">Book Details</h2>
      {loading || !book ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-3">
          <DetailItem label="ID" value={book._id} />
          <DetailItem label="Title" value={book.title} />
          <DetailItem label="Author" value={book.author} />
          <DetailItem label="Publish Year" value={book.publishYear} />
          <DetailItem label="Create Time" value={book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'} />
          <DetailItem label="Last Update" value={book.updatedAt ? new Date(book.updatedAt).toLocaleString() : 'N/A'} />
          
          <BookReviewGenerator title={book.title} author={book.author} />
        </div>
      )}
    </Modal>
  );
};

export default ReadBook;
