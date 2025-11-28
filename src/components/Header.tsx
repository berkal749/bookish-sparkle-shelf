import { LayoutGrid, List, Plus } from 'lucide-react';
import UserButton from './UserButton';

interface HeaderProps {
  viewType: 'card' | 'table';
  setViewType: (type: 'card' | 'table') => void;
  onShowCreate: () => void;
}

const Header = ({ viewType, setViewType, onShowCreate }: HeaderProps) => (
  <header className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold text-foreground">Book Store</h1>
    <div className="flex items-center gap-4">
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          className={`px-3 py-1.5 rounded-md transition-all ${
            viewType === 'card' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setViewType('card')}
        >
          <LayoutGrid className="text-xl" />
        </button>
        <button
          className={`px-3 py-1.5 rounded-md transition-all ${
            viewType === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setViewType('table')}
        >
          <List className="text-xl" />
        </button>
      </div>
      <button
        onClick={onShowCreate}
        className="bg-primary hover:bg-primary/90 text-primary-foreground p-2.5 rounded-lg flex items-center gap-2 transition-all"
      >
        <Plus size={24} />
        <span className="hidden sm:block font-medium">Create Book</span>
      </button>
      <UserButton />
    </div>
  </header>
);

export default Header;
