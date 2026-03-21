interface SkeletonCardProps {
  count?: number;
}

function SingleSkeletonCard() {
  return (
    <div className="card animate-pulse flex flex-col gap-2">
      <div className="h-5 bg-[#E0D5CC] rounded w-3/4" />
      <div className="h-3 bg-[#E0D5CC] rounded w-full" />
      <div className="h-3 bg-[#E0D5CC] rounded w-5/6" />
      <div className="h-3 bg-[#E0D5CC] rounded w-1/3 mt-2" />
    </div>
  );
}

export function SkeletonCard({ count = 3 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SingleSkeletonCard key={i} />
      ))}
    </>
  );
}
