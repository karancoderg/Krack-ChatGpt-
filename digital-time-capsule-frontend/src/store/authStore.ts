import { create } from "zustand";
import jwtDecode from "jwt-decode";

interface AuthState {
  user: { id: string } | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (token) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    set({ token, user: { id: decoded.userId } });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
