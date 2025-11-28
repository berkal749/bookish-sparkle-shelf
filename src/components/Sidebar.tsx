import { useState } from 'react';
import { BookOpen, Store, TrendingUp, Users, Lock, ChevronRight, ChevronLeft } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  locked?: boolean;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'My Book Shelf', icon: <BookOpen className="w-5 h-5" />, active: true },
  { label: 'Book Store', icon: <Store className="w-5 h-5" /> },
  { label: 'Trending', icon: <TrendingUp className="w-5 h-5" />, locked: true },
  { label: 'Friends', icon: <Users className="w-5 h-5" />, locked: true },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Ticket/Tab trigger - always visible on the left edge */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-primary-foreground py-4 px-1.5 rounded-r-lg shadow-lg transition-all duration-300 hover:px-2.5 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 p-4 flex flex-col gap-2 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-foreground mb-4 mt-1">Navigation</h2>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => !item.locked && setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left w-full ${
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : item.locked
                  ? 'text-muted-foreground cursor-not-allowed opacity-60'
                  : 'text-foreground hover:bg-muted'
              }`}
              disabled={item.locked}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {item.locked && <Lock className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
