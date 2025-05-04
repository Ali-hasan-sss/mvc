"use client";
import { useState, useEffect } from "react";
import { supplier } from "../../../types";
import { useRouter } from "next/navigation";

interface SearchSuppliersProps {
  suppliers: supplier[];
}

export default function SearchSuppliers({ suppliers }: SearchSuppliersProps) {
  const [formData, setFormData] = useState({
    country: "",
    sector: "",
    productType: "",
  });

  const [results, setResults] = useState<supplier[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!suppliers || suppliers.length === 0) {
      console.error("No suppliers data available.");
      return;
    }

    const filtered = suppliers.filter((s) => {
      return (
        s.contact?.country
          .toLowerCase()
          .includes(formData.country.toLowerCase()) &&
        s.description.toLowerCase().includes(formData.sector.toLowerCase()) &&
        s.products_tipe?.some((product) =>
          product.product
            .toLowerCase()
            .includes(formData.productType.toLowerCase())
        )
      );
    });
    setResults(filtered);
    setShowModal(true);
  };
  const gotoSupplire = (suplier: supplier) => {
    localStorage.setItem("suplier", JSON.stringify(suplier));
    router.push("/suppliers/details");
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
            Find Suppliers
          </h2>
          <p className="text-sm text-gray-700">
            Use the advanced search system to find the right supplier quickly
            and efficiently.
          </p>
        </div>

        {["country", "sector", "productType"].map((field, i) => (
          <div key={i} className="form-group flex flex-col">
            <label className="text-sm text-[rgba(0,109,119,1)] capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              placeholder={`Enter ${field}`}
              value={formData[field as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="p-1 w-full rounded-lg border-[2px] outline-none border-[rgba(0,109,119,1)]"
            />
          </div>
        ))}

        <div className="form-group flex items-center mt-5 justify-center w-full">
          <button
            type="submit"
            className="py-2 px-3 search_btn w-full rounded-full cursor-pointer text-gray-100 hover:text-gray-900 font-bold bg-[rgba(0,109,119,1)]"
          >
            Search Now
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[rgba(0,109,119,1)]">
              search result
            </h3>

            {results.length > 0 ? (
              <ul className="space-y-4 max-h-[300px] overflow-auto">
                {results.map((supplier) => (
                  <li
                    key={supplier.id}
                    className="flex items-center gap-4 p-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => gotoSupplire(supplier)}
                  >
                    <img
                      src={supplier.image}
                      alt={supplier.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[rgba(0,109,119,1)]">
                        {supplier.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {supplier.contact?.country}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">no seach results</p>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-[rgba(0,109,119,1)] text-white px-4 py-2 rounded-full w-full"
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
