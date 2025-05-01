interface BadgProps {
  title: string;
  desc: string;
  image?: string;
}

export default function Badg({ title, desc, image }: BadgProps) {
  return (
    <div className="px-1 flex items-center gap-1 w-[130px] h-[50px] bg-[rgba(217,217,217,0.6)] rounded-full">
      {image && <img src={image} className="w-8" alt="" />}
      <div className="flex flex-col">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-gray-600 text-xs">{desc}</p>
      </div>
    </div>
  );
}
