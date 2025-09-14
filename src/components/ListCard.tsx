type ListCardProps = {
  // key: string,
  title: string;
  // createdAt: Date;
  updatedAt: Date;
  onClick?: () => void;
};

export const ListCard = ({ title, updatedAt, onClick }: ListCardProps) => {
  return (
    <div
      className="bg-neutral-700 p-2 rounded-lg my-4 border border-neutral-500"
      onClick={onClick}
    >
      <h4>{title}</h4>
      <p className="text-neutral-400 text-sm">{updatedAt.toString()}</p>
    </div>
  );
};
