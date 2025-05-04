import { useRouter } from "next/navigation";

interface Comppany {
  id: number;
  companyName: string;
}
interface CompanyCardProps {
  company: Comppany;
}
export default function CompanyCard({ company }: CompanyCardProps) {
  const router = useRouter();

  const viewCompany = (id: number) => {
    localStorage.setItem("selectCompany", String(id));
    router.push("/suppliers/details/company");
  };

  return (
    <div className="flex flex-col items-center justify-between py-5 w-[150px] bg_company h-[150px] rounded-lg">
      <h2 className="font-bold text-2xl text-white">{company.companyName}</h2>
      <button
        className="w-[100px] cursor-pointer text-xs font-bold p-2 bg-gray-50 rounded-full"
        onClick={() => viewCompany(company.id)}
      >
        See Products
      </button>
    </div>
  );
}
