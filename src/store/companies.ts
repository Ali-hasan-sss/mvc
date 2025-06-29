import axiosInstance from "@/utils/axios";
import { create } from "zustand";

export type Company = {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  user_id: number;
  image: string;
  created_at: string;
  updated_at: string;
};

type CompanyState = {
  companies: Company[];
  loading: boolean;
  error: string | null;
  fetchCompanies: () => Promise<void>;
  fetchCompanyById: (id: number) => Promise<Company | null>;
  addCompany: (data: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    user_id: number;
    image: string;
  }) => Promise<void>;
  updateCompany: (
    id: number,
    data: {
      title: { ar: string; en: string };
      description: { ar: string; en: string };
      user_id: number;
      image: string;
    }
  ) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCompanies: (companies: Company[]) => void;
};

const useCompanyStore = create<CompanyState>((set, get) => ({
  companies: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setCompanies: (companies: Company[]) => set({ companies }),

  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("admin/companies");
      set({ companies: res.data.data || [], loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchCompanyById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`admin/companies/${id}`);
      return res.data.data as Company | null;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      return null;
    }
  },

  addCompany: async (data: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    user_id: number;
    image: string;
  }) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(data.title));
      formData.append("description", JSON.stringify(data.description));
      formData.append("user_id", data.user_id.toString());
      formData.append("image", data.image);

      await axiosInstance.post("admin/companies", formData);
      await get().fetchCompanies();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  updateCompany: async (
    id: number,
    data: {
      title: { ar: string; en: string };
      description: { ar: string; en: string };
      user_id: number;
      image: string;
    }
  ) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(data.title));
      formData.append("description", JSON.stringify(data.description));
      formData.append("user_id", data.user_id.toString());
      formData.append("image", data.image);

      await axiosInstance.put(`admin/companies/${id}`, formData);
      await get().fetchCompanies();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  deleteCompany: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`admin/companies/${id}`);
      await get().fetchCompanies();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useCompanyStore;
