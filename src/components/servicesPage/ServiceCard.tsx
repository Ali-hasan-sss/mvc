interface ServiceCardProps {
  service: {
    image: string;
    title: string;
    futuers: string[];
  };
}
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="w-[350px] md:w-[300px] h-[250px] md:h-[330px] flex md:flex-col md:items-center gap-1 md:gap-5 py-4 md:px-2 md:border-[8px] md:border-[rgba(0,0,0,0.03)]">
      <div className="w-1/5 md:w-full flex items-center justify-center h-1/3">
        <img src={service.image} className="w-12 md:w-20" alt="" />
      </div>
      <div className="w-4/5 md:w-full flex flex-col pt-4">
        <h2 className="text-lg md:text-sm font-bold">{service.title}</h2>
        <ul
          style={{ listStyle: "disc" }}
          className="text-xs px-2 text-gray-500"
        >
          {service.futuers.map((futuer, index) => (
            <li className="mt-1" key={index}>
              {futuer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
