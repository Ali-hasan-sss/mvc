import axiosInstance from "@/utils/axios";
import { create } from "zustand";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  description: { ar: string; en: string };
  about_us: { ar: string; en: string };
  image: string;
  is_shown: 0 | 1;
  address: string;
  companies?: Company[];
  socials?: Social[];
  created_at?: string;
  updated_at?: string;
};

export type Company = {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  products?: Product[];
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  created_at: string;
  updated_at: string;
};

export type Social = {
  id: number;
  icon: string;
  link: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<User | null>;
  addUser: (data: FormData) => Promise<void>;
  updateUser: (id: number, data: FormData) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUsers: (users: User[]) => void;
};

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setUsers: (users: User[]) => set({ users }),

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("admin/users");
      set({ users: res.data.data.users, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },

  addUser: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("admin/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchUsers();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  updateUser: async (id: number, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`admin/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchUsers();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`admin/users/${id}`);
      await get().fetchUsers();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchUserById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`admin/users/${id}`);
      set({ loading: false });
      return res.data.data;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      set({ error: errorMessage, loading: false });
      return null;
    }
  },
}));

export default useUserStore;
