// ─── Auth ────────────────────────────────────────────────
export type UserRole = "Admin" | "BacSi" | "YTa" | "KeToan" | "BenhNhan";

export type AuthUser = {
  id: string;
  tenDangNhap: string;
  vaiTro: UserRole;
  email: string;
  permissions: string[];
};

// ─── KhoaPhong ────────────────────────────────────────────
export type KhoaPhong = {
  id: string;
  tenKhoa: string;
  loaiKhoa: string;
  soGiuongTieuChuan: number;
  soGiuongHienCo?: number;
};

// ─── BacSi ───────────────────────────────────────────────
export type BacSi = {
  id: string;
  hoTen: string;
  chuyenKhoa: string;
  thongTinLienHe: string;
  khoaId: string;
};

// ─── BenhNhan ────────────────────────────────────────────
export type BenhNhan = {
  id: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  diaChi: string;
  soTheBaoHiem: string;
  mucHuong: number | null;
  hanTheBHYT: string | null;
  trangThai: string;
  avatar?: string;
  soDienThoai?: string;
};

// ─── GiuongBenh ──────────────────────────────────────────
export type GiuongBenh = {
  id: string;
  tenGiuong: string;
  loaiGiuong: string;
  giaTien: number;
  trangThai: string;
  khoa: {
    tenKhoa: string;
    loaiKhoa: string;
  };
};

// ─── NhapVien ────────────────────────────────────────────
export type NhapVien = {
  id: string;
  benhNhanId: string;
  tenBenhNhan: string;
  giuongId: string;
  tenGiuong: string;
  khoaId: string;
  tenKhoa: string;
  lyDoNhap: string;
  ngayNhap: string;
  ngayXuat: string | null;
  trangThai: string;
};

// ─── HoSoBenhAn ──────────────────────────────────────────
export type HoSoBenhAn = {
  id: string;
  nhapVienId: string;
  bacSiPhuTrachId: string;
  tienSuBenh: string | null;
  chanDoanBanDau: string | null;
  phuongAnDieuTri: string | null;
  chanDoanRaVien: string | null;
  ketQuaDieuTri: string | null;
  ngayLap: string | null;
};

// ─── LichPhauThuat ───────────────────────────────────────
export type LichPhauThuat = {
  id: string;
  nhapVienId: string;
  bacSiChinhId: string;
  tenBacSi: string | null;
  benhNhanId: string;
  tenBenhNhan: string | null;
  loaiPhauThuat: string | null;
  ekip: string | null;
  ngay: string | null;
  phongMo: string | null;
  chiPhi: number | null;
  trangThai: string | null;
};

// ─── HoaDon ──────────────────────────────────────────────
export type HoaDon = {
  id: string;
  benhNhanId: string;
  tenBenhNhan: string;
  nhapVienId: string;
  tongTien: number;
  baoHiemChiTra: number;
  benhNhanThanhToan: number;
  ngay: string | null;
  ngayNhapVien: string | null;
  ngayXuatVien: string | null;
  trangThai: string;
};

// ─── Shared ──────────────────────────────────────────────
export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
