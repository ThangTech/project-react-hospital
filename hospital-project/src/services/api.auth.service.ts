import axios from "./axios.interceptor";

type LoginPayload = {
  TenDangNhap: string;
  MatKhau: string;
};

type RegisterPayload = {
  TenDangNhap: string;
  MatKhau: string;
  VaiTro: string;
};

type ForgotPasswordPayload = {
  TenDangNhap: string;
};

type ResetPasswordPayload = {
  TenDangNhap: string;
  ResetToken: string;
  MatKhauMoi: string;
};

type ChangePasswordPayload = {
  MatKhauCu: string;
  MatKhauMoi: string;
};

export const authService = {
  login: (payload: LoginPayload) =>
    axios.post(`${BASE_URL}/login`, payload),

  register: (payload: RegisterPayload) =>
    axios.post(`${BASE_URL}/register`, payload),

  getMe: (token: string) =>
    axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    axios.post(`${BASE_URL}/forgot-password`, payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    axios.post(`${BASE_URL}/reset-password`, payload),

  changePassword: (payload: ChangePasswordPayload, token: string) =>
    axios.post(`${BASE_URL}/change-password`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
