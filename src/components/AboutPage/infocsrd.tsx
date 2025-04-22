interface InfoCardProps {
  isChip: boolean;
  image: string;
  title: string;
  desc: string;
}
export default function InfoCard({
  isChip,
  image,
  title,
  desc,
}: InfoCardProps) {
  return (
    <div className="w-[250px] h-[250px] flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center w-full  h-1/2">
        {isChip && <img src="/images/shep.png" className="w-30" alt="" />}
        <img src={image} className="w-20 absolute top-7 left-21" alt="" />
      </div>
      <div className="p-2 flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl text-white font-bold">{title}</h2>
        <p className="text-gray-300 text-sm">{desc}</p>
      </div>
    </div>
  );
}
