interface DetailItemProps {
  label: string;
  value: string | number;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className="flex">
    <span className="text-xl text-muted-foreground w-32 shrink-0">{label}:</span>
    <span className="text-xl text-foreground font-semibold">{value}</span>
  </div>
);

export default DetailItem;
