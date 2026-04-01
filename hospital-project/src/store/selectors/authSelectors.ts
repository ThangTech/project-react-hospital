import { selector } from "recoil";
import { authAtom } from "../atoms/authAtom";
import type { UserRole } from "../atoms/authAtom";

export const isAuthenticatedSelector = selector<boolean>({
  key: "auth/isAuthenticated",
  get: ({ get }) => get(authAtom).isAuthenticated,
});

export const currentUserSelector = selector({
  key: "auth/currentUser",
  get: ({ get }) => get(authAtom).user,
});

export const userRoleSelector = selector<UserRole | null>({
  key: "auth/userRole",
  get: ({ get }) => get(authAtom).user?.role ?? null,
});

export const isAdminSelector = selector<boolean>({
  key: "auth/isAdmin",
  get: ({ get }) => get(authAtom).user?.role === "Admin",
});

export const isDoctorSelector = selector<boolean>({
  key: "auth/isDoctor",
  get: ({ get }) => get(authAtom).user?.role === "BacSi",
});

export const isNurseSelector = selector<boolean>({
  key: "auth/isNurse",
  get: ({ get }) => get(authAtom).user?.role === "YTa",
});

export const isAccountantSelector = selector<boolean>({
  key: "auth/isAccountant",
  get: ({ get }) => get(authAtom).user?.role === "KeToan",
});

export const isPatientSelector = selector<boolean>({
  key: "auth/isPatient",
  get: ({ get }) => get(authAtom).user?.role === "BenhNhan",
});
