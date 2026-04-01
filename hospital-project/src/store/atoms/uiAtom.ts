import { atom } from "recoil";

export const sidebarCollapsedAtom = atom<boolean>({
  key: "ui/sidebarCollapsed",
  default: false,
});

export const globalLoadingAtom = atom<boolean>({
  key: "ui/globalLoading",
  default: false,
});
