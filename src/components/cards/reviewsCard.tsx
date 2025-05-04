interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    image?: string;
    comment?: string;
  };
}
export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 w-[250px] rounded-lg py-4 px-2 h-[200px] bg-white">
      <div className="flex items-center gap-3">
        <img
          src={review.image ? review.image : "/images/slider.png"}
          className="w-15 h-15 rounded-full"
          alt="pro"
        />
        <h2 className="text-xl font-bold">{review.name}</h2>
      </div>
      <p className="text-sm text-gray-400 overflow-y-auto h-[200px]">
        {review.comment || "no comment"}
      </p>
    </div>
  );
}
