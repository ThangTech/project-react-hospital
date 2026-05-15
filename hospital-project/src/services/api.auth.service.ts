import axios from "./axios.interceptor";

type LoginPayload = {
  TenDangNhap: string;
  MatKhau: string;
};

type RegisterPayload = {
  TenDangNhap: string;
  MatKhau: string;
  Email: string;
  VaiTro: string;
};

type ChangePasswordPayload = {
  MatKhauCu: string;
  MatKhauMoi: string;
};

type ForgotPasswordPayload = {
  Email: string;
};

type VerifyResetOtpPayload = {
  Email: string;
  OtpCode: string;
};

type ResetPasswordPayload = {
  ResetToken: string;
  MatKhauMoi: string;
};

const loginAccount = async (data: LoginPayload) => {
  const url = "/gateway/api/Auth/login";
  const res = await axios.post(url, data);
  return res;
};

const registerAccount = async (data: RegisterPayload) => {
  const url = "/gateway/api/Auth/register";
  const res = await axios.post(url, data);
  return res;
};

const getAccount = async () => {
  const url = "/gateway/api/auth/me";
  const res = await axios.get(url);
  return res;
};

const changePassword = async (data: ChangePasswordPayload) => {
  const url = "/gateway/api/Auth/change-password";
  const res = await axios.post(url, data);
  return res;
};

const forgotPassword = async (data: ForgotPasswordPayload) => {
  const url = "/gateway/api/Auth/forgot-password";
  const res = await axios.post(url, data);
  return res;
};

const verifyResetOtp = async (data: VerifyResetOtpPayload) => {
  const url = "/gateway/api/Auth/verify-reset-otp";
  const res = await axios.post(url, data);
  return res;
};

const resetPassword = async (data: ResetPasswordPayload) => {
  const url = "/gateway/api/Auth/reset-password";
  const res = await axios.post(url, data);
  return res;
};

export { changePassword, forgotPassword, getAccount, loginAccount, registerAccount, resetPassword, verifyResetOtp };
// export const authService = {
//   login: (payload: LoginPayload) =>
//     axios.post(`${BASE_URL}/login`, payload),

//   register: (payload: RegisterPayload) =>
//     axios.post(`/register`, payload),

//   getMe: (token: string) =>
//     axios.get(`${BASE_URL}/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     }),

//   forgotPassword: (payload: ForgotPasswordPayload) =>
//     axios.post(`${BASE_URL}/forgot-password`, payload),

//   resetPassword: (payload: ResetPasswordPayload) =>
//     axios.post(`${BASE_URL}/reset-password`, payload),

//   changePassword: (payload: ChangePasswordPayload, token: string) =>
//     axios.post(`${BASE_URL}/change-password`, payload, {
//       headers: { Authorization: `Bearer ${token}` },
//     }),
// };
