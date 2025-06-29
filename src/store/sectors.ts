import axiosInstance from "@/utils/axios";
import { create } from "zustand";

export type Sector = {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  created_at?: string;
  updated_at?: string;
};

type SectorState = {
  sectors: Sector[];
  loading: boolean;
  error: string | null;
  fetchSectors: () => Promise<void>;
  addSector: (data: FormData) => Promise<void>;
  updateSector: (id: number, data: FormData) => Promise<void>;
  deleteSector: (id: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSectors: (sectors: Sector[]) => void;
};

const useSectorStore = create<SectorState>((set, get) => ({
  sectors: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSectors: (sectors: Sector[]) => set({ sectors }),

  fetchSectors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("admin/sectors");
      set({ sectors: res.data.data.sectors, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },

  addSector: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("admin/sectors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchSectors();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  updateSector: async (id: number, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`admin/sectors/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchSectors();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  deleteSector: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`admin/sectors/${id}`);
      await get().fetchSectors();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useSectorStore;
