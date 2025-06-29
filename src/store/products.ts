import axiosInstance from "@/utils/axios";
import { create } from "zustand";

export type Product = {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  sector_id: number;
  company_id: number;
  image: string;
  created_at: string;
  updated_at: string;
};

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductsByCompanyId: (companyId: number) => Promise<Product[]>;
  addProduct: (data: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    sector_id: number;
    company_id: number;
    image: string;
  }) => Promise<void>;
  updateProduct: (
    id: number,
    data: {
      title: { ar: string; en: string };
      description: { ar: string; en: string };
      sector_id: number;
      company_id: number;
      image: string;
    }
  ) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setProducts: (products: Product[]) => void;
};

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setProducts: (products: Product[]) => set({ products }),

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("admin/products");
      set({ products: res.data.data.products || [], loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchProductsByCompanyId: async (companyId: number) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `admin/products/company/${companyId}`
      );
      set({ loading: false });
      return res.data.data.products || [];
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      return [];
    }
  },

  addProduct: async (data: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    sector_id: number;
    company_id: number;
    image: string;
  }) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(data.title));
      formData.append("description", JSON.stringify(data.description));
      formData.append("sector_id", data.sector_id.toString());
      formData.append("company_id", data.company_id.toString());
      formData.append("image", data.image);

      await axiosInstance.post("admin/products", formData);
      await get().fetchProducts();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  updateProduct: async (
    id: number,
    data: {
      title: { ar: string; en: string };
      description: { ar: string; en: string };
      sector_id: number;
      company_id: number;
      image: string;
    }
  ) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(data.title));
      formData.append("description", JSON.stringify(data.description));
      formData.append("sector_id", data.sector_id.toString());
      formData.append("company_id", data.company_id.toString());
      formData.append("image", data.image);

      await axiosInstance.put(`admin/products/${id}`, formData);
      await get().fetchProducts();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`admin/products/${id}`);
      await get().fetchProducts();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useProductStore;
