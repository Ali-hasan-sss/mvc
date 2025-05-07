import CompanyCard from "@/components/cards/companyCard";
interface SelectCompanyProop {
  companies: [{ id: number; companyName: string }];
}
export default function SelectCompany({ companies }: SelectCompanyProop) {
  return (
    <div className="flex flex-col w-full items-center gap-10 py-5 md:py-10 mt-10">
      <h2 className="text-xl md:text-3xl font-bold">Select Company</h2>
      <div className="flex flex-wrap items-center w-full justify-center md:justify-between gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
