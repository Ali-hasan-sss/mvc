import axiosInstance from "@/utils/axios";
import { create } from "zustand";

export type Social = {
  id: number;
  icon: string;
  link: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type SocialState = {
  socials: Social[];
  loading: boolean;
  error: string | null;
  fetchSocials: () => Promise<void>;
  fetchSocialsByUserId: (userId: number) => Promise<Social[]>;
  addSocial: (data: FormData) => Promise<void>;
  updateSocial: (id: number, data: FormData) => Promise<void>;
  deleteSocial: (id: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSocials: (socials: Social[]) => void;
};

const useSocialStore = create<SocialState>((set, get) => ({
  socials: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSocials: (socials: Social[]) => set({ socials }),

  fetchSocials: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("admin/socials");
      set({ socials: res.data.data, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchSocialsByUserId: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`admin/socials?user_id=${userId}`);
      set({ loading: false });
      return res.data.data || [];
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      return [];
    }
  },

  addSocial: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("admin/socials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchSocials();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  updateSocial: async (id: number, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`admin/socials/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchSocials();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  deleteSocial: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`admin/socials/${id}`);
      await get().fetchSocials();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useSocialStore;
