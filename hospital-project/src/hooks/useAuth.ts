// ─── useAuth.ts ───────────────────────────────────────────
// Custom hook bọc AuthContext — API giữ nguyên như cũ.
// Các component dùng useAuth() không cần thay đổi gì.

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải dùng bên trong <AuthProvider>');

  const { user, token, isAuthenticated, login, logout } = ctx;

  // Các computed values từ role (thay cho Recoil selectors)
  const role = user?.role ?? null;
  const isAdmin       = role === 'Admin';
  const isDoctor      = role === 'BacSi';
  const isNurse       = role === 'YTa';
  const isAccountant  = role === 'KeToan';
  const isPatient     = role === 'BenhNhan';

  return {
    user,
    token,
    isAuthenticated,
    role,
    isAdmin,
    isDoctor,
    isNurse,
    isAccountant,
    isPatient,
    login,
    logout,
  };
};
