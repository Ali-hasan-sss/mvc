interface ServiceCardProps {
  service: {
    image: string;
    title: string;
    futuers: string[];
  };
}
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="w-[300px] h-[330px] flex flex-col items-center gap-5 py-4 px-2 ServiceCard">
      <div className="w-full flex items-center justify-center h-1/3">
        <img src={service.image} className="w-20" alt="" />
      </div>
      <h2 className="text-sm font-bold">{service.title}</h2>
      <ul style={{ listStyle: "disc" }} className="text-xs px-2 text-gray-500">
        {service.futuers.map((futuer, index) => (
          <li className="mt-1" key={index}>
            {futuer}
          </li>
        ))}
      </ul>
    </div>
  );
}
