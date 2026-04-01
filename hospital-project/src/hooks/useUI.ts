import { useRecoilState } from "recoil";
import { sidebarCollapsedAtom, globalLoadingAtom } from "../store/atoms/uiAtom";

export const useUI = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(sidebarCollapsedAtom);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingAtom);

  return {
    sidebarCollapsed,
    globalLoading,
    toggleSidebar: () => setSidebarCollapsed((v) => !v),
    setGlobalLoading,
  };
};
