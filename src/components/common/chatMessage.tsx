interface messageProps {
  bg?: string;
  image?: string;
  message: string;
}
export default function ChatMessage({ bg, image, message }: messageProps) {
  return (
    <div className={`flex w-full items-center gap-2 rounded-lg p-2 ${bg}`}>
      {image && <img src={image} className="w-15" alt="" />}
      <p className="text-xs md:text-sm text-white">{message}</p>
    </div>
  );
}
