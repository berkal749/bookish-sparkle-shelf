import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../Input';
import Spinner from '../Spinner';
import { API_URL, USE_MOCK_DATA, mockBooks } from '@/lib/constants';

interface EditBookProps {
  bookId: string;
  onClose: () => void;
}

const EditBook = ({ bookId, onClose }: EditBookProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const request = USE_MOCK_DATA
      ? new Promise<{ data: any }>(res => setTimeout(() => res({ data: mockBooks.find(b => b._id === bookId) || mockBooks[0] }), 500))
      : axios.get(`${API_URL}/${bookId}`);
      
    request
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear.toString());
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(`An error occurred: ${error.message}`);
        onClose();
      });
  }, [bookId, onClose]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);

    const request = USE_MOCK_DATA
      ? new Promise(res => setTimeout(() => res({}), 500))
      : axios.put(`${API_URL}/${bookId}`, data);
      
    request
      .then(() => {
        setLoading(false);
        toast.success('Book Updated Successfully!');
        onClose();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(`An error occurred: ${error.message}`);
      });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-3xl font-bold text-foreground mb-6">Edit Book</h2>
      {loading && <Spinner />}
      <div className="flex flex-col gap-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Input label="Publish Year" type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        <button
          onClick={handleEditBook}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg mt-4 transition-all"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};

export default EditBook;
