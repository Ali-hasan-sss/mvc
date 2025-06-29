import { create } from "zustand";
import axiosInstance from "@/utils/axios";

export interface VisitorSupplier {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  description: string;
  about_us: string;
  image: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorSupplierDetail extends VisitorSupplier {
  companies: {
    id: number;
    title: string;
    description: string;
    image: string;
    products: {
      id: number;
      title: string;
      description: string;
      image: string;
      created_at: string;
      updated_at: string;
    }[];
    created_at: string;
    updated_at: string;
  }[];
}

interface VisitorSuppliersState {
  suppliers: VisitorSupplier[];
  selectedSupplier: VisitorSupplierDetail | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchSuppliers: (filters?: {
    sector_id?: number;
    product_id?: number;
    page_size?: number;
    page?: number;
  }) => Promise<void>;
  fetchSupplierById: (id: number) => Promise<void>;
  clearSuppliers: () => void;
  clearSelectedSupplier: () => void;
}

const useVisitorSuppliersStore = create<VisitorSuppliersState>((set, get) => ({
  suppliers: [],
  selectedSupplier: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,

  fetchSuppliers: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();

      if (filters.sector_id) {
        params.append("sector_id", filters.sector_id.toString());
      }

      if (filters.product_id) {
        params.append("product_id", filters.product_id.toString());
      }

      if (filters.page_size) {
        params.append("page_size", filters.page_size.toString());
      }

      if (filters.page) {
        params.append("page", filters.page.toString());
      }

      const response = await axiosInstance.get(
        `web/suppliers?${params.toString()}`
      );

      if (response.data.success) {
        set({
          suppliers: response.data.data.users,
          totalPages: response.data.data.total_pages || 1,
          currentPage: filters.page || 1,
          loading: false,
        });
      } else {
        set({ error: "Failed to fetch suppliers", loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Network error",
        loading: false,
      });
    }
  },

  fetchSupplierById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`web/suppliers/${id}`);

      if (response.data.success) {
        set({
          selectedSupplier: response.data.data,
          loading: false,
        });
      } else {
        set({ error: "Failed to fetch supplier details", loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Network error",
        loading: false,
      });
    }
  },

  clearSuppliers: () => {
    set({ suppliers: [], totalPages: 0, currentPage: 1, error: null });
  },

  clearSelectedSupplier: () => {
    set({ selectedSupplier: null, error: null });
  },
}));

export default useVisitorSuppliersStore;
