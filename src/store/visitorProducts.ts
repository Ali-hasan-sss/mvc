import { create } from "zustand";
import axiosInstance from "@/utils/axios";

export interface VisitorProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface VisitorProductsState {
  products: VisitorProduct[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchProducts: (filters?: {
    sector_id?: number;
    company_id?: number;
    page_size?: number;
    page?: number;
  }) => Promise<void>;
  clearProducts: () => void;
}

const useVisitorProductsStore = create<VisitorProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,

  fetchProducts: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();

      if (filters.sector_id) {
        params.append("sector_id", filters.sector_id.toString());
      }

      if (filters.company_id) {
        params.append("company_id", filters.company_id.toString());
      }

      if (filters.page_size) {
        params.append("page_size", filters.page_size.toString());
      }

      if (filters.page) {
        params.append("page", filters.page.toString());
      }

      const response = await axiosInstance.get(
        `web/product-types?${params.toString()}`
      );

      if (response.data.success) {
        set({
          products: response.data.data.products,
          totalPages: response.data.data.total_pages,
          currentPage: filters.page || 1,
          loading: false,
        });
      } else {
        set({ error: "Failed to fetch products", loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Network error",
        loading: false,
      });
    }
  },

  clearProducts: () => {
    set({ products: [], totalPages: 0, currentPage: 1, error: null });
  },
}));

export default useVisitorProductsStore;
