import axios from 'axios';

const BASE_URL = 'http://localhost:5076/gateway/api/auth';

// --- Types ---
type LoginPayload = {
  TenDangNhap: string;
  MatKhau: string;
};

type RegisterPayload = {
  TenDangNhap: string;
  MatKhau: string;
  VaiTro: string; // 'Admin' | 'BacSi' | 'YTa' | 'KeToan'
};

// --- API calls ---
export const authService = {
  login: (payload: LoginPayload) =>
    axios.post(`${BASE_URL}/login`, payload),

  register: (payload: RegisterPayload) =>
    axios.post(`${BASE_URL}/register`, payload),

  getMe: (token: string) =>
    axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
