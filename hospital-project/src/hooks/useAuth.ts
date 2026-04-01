import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/authAtom";
import type { AuthUser } from "../store/atoms/authAtom";
import {
  isAdminSelector,
  isDoctorSelector,
  isNurseSelector,
  isAccountantSelector,
  isPatientSelector,
  userRoleSelector,
} from "../store/selectors/authSelectors";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const role = useRecoilValue(userRoleSelector);
  const isAdmin = useRecoilValue(isAdminSelector);
  const isDoctor = useRecoilValue(isDoctorSelector);
  const isNurse = useRecoilValue(isNurseSelector);
  const isAccountant = useRecoilValue(isAccountantSelector);
  const isPatient = useRecoilValue(isPatientSelector);

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem("token", token);
    setAuth({ user, token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
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
