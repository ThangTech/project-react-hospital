import { atom } from "recoil";

type UserRole = "Admin" | "BacSi" | "YTa" | "KeToan" | "BenhNhan";

type AuthUser = {
  id: number;
  username: string;
  role: UserRole;
  fullName: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

export const authAtom = atom<AuthState>({
  key: "auth/authAtom",
  default: {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
  },
});

export type { AuthUser, AuthState, UserRole };
