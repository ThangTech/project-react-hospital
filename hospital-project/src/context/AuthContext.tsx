// ─── AuthContext.tsx ──────────────────────────────────────
// Thay thế Recoil authAtom + authSelectors.
// Dùng React Context thuần — không cần thư viện ngoài.
//
// Cách dùng:
//   - Bọc app bằng <AuthProvider>
//   - Dùng hook useAuth() ở bất kỳ component con nào

import { createContext, useContext, useState, type ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────
export type UserRole = 'Admin' | 'BacSi' | 'YTa' | 'KeToan' | 'BenhNhan';

export type AuthUser = {
    id: string;             
    tenDangNhap: string;
    vaiTro: UserRole;
    email: string | null;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

// ─── Context shape ───────────────────────────────────────
type AuthContextType = AuthState & {
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

// ─── Tạo Context ─────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('auth_user');
    const user: AuthUser | null = userRaw ? JSON.parse(userRaw) : null;
    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
    };
  });

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    setAuth({ user, token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Raw context export (để useAuth dùng) ────────────────
export { AuthContext };
