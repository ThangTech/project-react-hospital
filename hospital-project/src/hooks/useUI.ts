// ─── useUI.ts ─────────────────────────────────────────────
// Custom hook bọc UIContext — API giữ nguyên như cũ.

import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI phải dùng bên trong <UIProvider>');
  return ctx;
};
