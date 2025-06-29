import { create } from "zustand";
import axiosInstance from "@/utils/axios";

export interface VisitorSector {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface VisitorSectorsState {
  sectors: VisitorSector[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchSectors: (filters?: {
    title?: string;
    page_size?: number;
    page?: number;
  }) => Promise<void>;
  clearSectors: () => void;
}

const useVisitorSectorsStore = create<VisitorSectorsState>((set, get) => ({
  sectors: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,

  fetchSectors: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();

      if (filters.title) {
        params.append("title", filters.title);
      }

      if (filters.page_size) {
        params.append("page_size", filters.page_size.toString());
      }

      if (filters.page) {
        params.append("page", filters.page.toString());
      }

      const response = await axiosInstance.get(
        `web/sectors?${params.toString()}`
      );

      if (response.data.success) {
        set({
          sectors: response.data.data.sectors,
          totalPages: response.data.data.total_pages,
          currentPage: filters.page || 1,
          loading: false,
        });
      } else {
        set({ error: "Failed to fetch sectors", loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Network error",
        loading: false,
      });
    }
  },

  clearSectors: () => {
    set({ sectors: [], totalPages: 0, currentPage: 1, error: null });
  },
}));

export default useVisitorSectorsStore;
