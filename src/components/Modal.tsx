import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-lg bg-card rounded-lg shadow-xl p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-2xl text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={24} />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
