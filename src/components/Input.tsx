interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = ({ label, value, onChange, type = 'text' }: InputProps) => (
  <div>
    <label className="text-lg text-muted-foreground mb-1 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-input border border-border text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
    />
  </div>
);

export default Input;
