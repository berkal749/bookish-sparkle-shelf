import { BookOpen, Store, TrendingUp, Users, Lock } from 'lucide-react';

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
  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4 flex flex-col gap-2">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
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
  );
};

export default Sidebar;
