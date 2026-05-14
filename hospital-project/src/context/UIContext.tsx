// ─── UIContext.tsx ───────────────────────────────────────
// Thay thế Recoil uiAtom (sidebarCollapsed, globalLoading).
// Dùng React Context thuần.

import { createContext, useState, type ReactNode } from 'react';

type UIContextType = {
  sidebarCollapsed: boolean;
  globalLoading: boolean;
  toggleSidebar: () => void;
  setGlobalLoading: (v: boolean) => void;
};

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <UIContext.Provider value={{
      sidebarCollapsed,
      globalLoading,
      toggleSidebar: () => setSidebarCollapsed((v) => !v),
      setGlobalLoading,
    }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIContext };
