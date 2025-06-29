"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Modal from "../common/modal";
import { VisitorSupplier } from "@/store/visitorSuppliers";
import useVisitorSuppliersStore from "@/store/visitorSuppliers";
import useVisitorSectorsStore from "@/store/visitorSectors";
import useVisitorProductsStore from "@/store/visitorProducts";

interface SearchSuppliersProps {
  suppliers: VisitorSupplier[];
  loading: boolean;
}

export default function SearchSuppliers({
  suppliers,
  loading,
}: SearchSuppliersProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    sector_id: "",
    product_id: "",
  });

  const [results, setResults] = useState<VisitorSupplier[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { fetchSupplierById, fetchSuppliers } = useVisitorSuppliersStore();
  const { sectors, fetchSectors } = useVisitorSectorsStore();
  const { products, fetchProducts } = useVisitorProductsStore();

  // جلب القطاعات عند تحميل المكون
  useEffect(() => {
    fetchSectors({ page_size: 100 });
  }, [fetchSectors]);

  // جلب المنتجات عند تغيير القطاع
  useEffect(() => {
    if (formData.sector_id) {
      fetchProducts({
        sector_id: parseInt(formData.sector_id),
        page_size: 100,
      });
    } else {
      fetchProducts({ page_size: 100 });
    }
  }, [formData.sector_id, fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filters: {
      sector_id?: number;
      product_id?: number;
    } = {};

    if (formData.sector_id) {
      filters.sector_id = parseInt(formData.sector_id);
    }

    if (formData.product_id) {
      filters.product_id = parseInt(formData.product_id);
    }

    try {
      await fetchSuppliers(filters);
      setResults(suppliers);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const gotoSupplire = async (supplier: VisitorSupplier) => {
    try {
      await fetchSupplierById(supplier.id);
      router.push("/suppliers/details");
    } catch (error) {
      console.error("Error fetching supplier details:", error);
    }
  };

  useEffect(() => {
    if (showModal && results.length > 0) {
      const timeout = setTimeout(() => {
        setShowModal(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [showModal, results]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 min-w-[300px] max-w-[400px] w-1/3"
      >
        <div className="title flex flex-col">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-Timmana)" }}
          >
            {t("suppliers.Find_Suppliers")}
          </h2>
          <p className="text-sm text-gray-700">
            {t("suppliers.Find_Suppliers_des")}
          </p>
        </div>

        {/* Sector Selection */}
        <div className="form-group flex flex-col">
          <label className="text-sm text-[rgba(0,109,119,1)] capitalize">
            {t("suppliers.sector")}
          </label>
          <select
            value={formData.sector_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                sector_id: e.target.value,
                product_id: "",
              })
            }
            className="p-1 w-full rounded-lg border-[2px] outline-none border-[rgba(0,109,119,1)]"
          >
            <option value="">{t("suppliers.Select_Sector")}</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.title}
              </option>
            ))}
          </select>
        </div>

        {/* Product Type Selection */}
        <div className="form-group flex flex-col">
          <label className="text-sm text-[rgba(0,109,119,1)] capitalize">
            {t("suppliers.productType")}
          </label>
          <select
            value={formData.product_id}
            onChange={(e) =>
              setFormData({ ...formData, product_id: e.target.value })
            }
            className="p-1 w-full rounded-lg border-[2px] outline-none border-[rgba(0,109,119,1)]"
          >
            <option value="">{t("suppliers.Select_Product_Type")}</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group flex items-center mt-5 justify-center w-full">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-3 search_btn w-full rounded-full cursor-pointer text-gray-100 hover:text-gray-900 font-bold bg-[rgba(0,109,119,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t("Loading...") : t("Search_Now")}
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title={t("suppliers.search_result")}
          content={
            results.length > 0 ? (
              <ul className="space-y-4 max-h-[300px] overflow-auto">
                {results.map((supplier) => (
                  <li
                    key={supplier.id}
                    className="flex items-center gap-4 p-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => gotoSupplire(supplier)}
                  >
                    <img
                      src={supplier.image}
                      alt={`${supplier.first_name} ${supplier.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[rgba(0,109,119,1)]">
                        {`${supplier.first_name} ${supplier.last_name}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {supplier.address}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">{t("suppliers.no_seach_results")}</p>
            )
          }
        />
      )}
    </>
  );
}
