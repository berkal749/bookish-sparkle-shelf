import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../Input';
import Spinner from '../Spinner';
import { API_URL, USE_MOCK_DATA } from '@/lib/constants';

interface CreateBookProps {
  onClose: () => void;
}

const CreateBook = ({ onClose }: CreateBookProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    
    const request = USE_MOCK_DATA
      ? new Promise(res => setTimeout(() => res({}), 500))
      : axios.post(API_URL, data);

    request
      .then(() => {
        setLoading(false);
        toast.success('Book Created Successfully!');
        onClose();
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(`An error occurred: ${error.message}`);
      });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-3xl font-bold text-foreground mb-6">Create New Book</h2>
      {loading && <Spinner />}
      <div className="flex flex-col gap-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Input label="Publish Year" type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        <button
          onClick={handleSaveBook}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg mt-4 transition-all"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};

export default CreateBook;
