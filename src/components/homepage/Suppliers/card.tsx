interface ExploreCardProps {
  item: {
    image: string;
    title: string;
    description: string;
  };
}
export default function ExploreCard({ item }: ExploreCardProps) {
  return (
    <div className="w-[200px] h-[250px] explore_card ">
      <div
        className="rounded-tl-[90px] rounded-br-[150px] overflow-hidden
        w-[150px] h-[110px]"
      >
        <img src={item.image} alt="a" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 px-3  py-4">
        <h3
          className="font-bold italic text-sm"
          style={{ fontFamily: "var(--font-inria)" }}
        >
          {item.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-3 ">
          {item.description}
        </p>
      </div>
    </div>
  );
}
