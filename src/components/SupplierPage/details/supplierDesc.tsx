import { useTranslation } from "react-i18next";
import { supplier } from "../../../../types";
import CompanyCard from "../../cards/companyCard";
import ProductsTypeCard from "../../cards/productsType";

interface SupplierDiscriptionProps {
  supplier: supplier;
}
export default function SupplierDiscription({
  supplier,
}: SupplierDiscriptionProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col mt-4 text-gray-900 px-2 md:px-10 w-full">
      <p className="text-xs md:text-sm">
        {supplier.description && supplier.description}
      </p>
      {/* SelectCompany  */}
      {supplier.companies && (
        <div className="flex flex-col w-full items-center gap-10 py-5 md:py-10 mt-10">
          <h2 className="text-xl md:text-3xl font-bold">
            {t("suppliers.Select_Company")}
          </h2>
          <div className="flex flex-wrap items-center w-full justify-center md:justify-between gap-4">
            {supplier.companies?.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          <button className="text-white font-bold cursor-pointer bg-[#BF1E2E] border border-transparent hover:bg-transparent hover:border hover:border-[#BF1E2E] hover:text-[#BF1E2E] py-3 px-5 rounded-full min-w-[150px]">
            {t("See_More")}
          </button>
        </div>
      )}
      {/* ProductsType */}
      {supplier.products_tipe && (
        <div className="flex flex-col w-full items-center gap-10 py-6 mb-5 md:py-10 mt-10">
          <div className="flex flex-col items-center gap-3 w-full justify-center ">
            <h2 className="text-xl md:text-3xl font-bold">
              {t("suppliers.productType")}
            </h2>
            <p className="text-sm text-gray-600">
              {t("suppliers.Some_products")}
            </p>
          </div>
          <div className="flex flex-wrap items-center w-full justify-center md:justify-between gap-4">
            {supplier.products_tipe?.map((product) => (
              <ProductsTypeCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
