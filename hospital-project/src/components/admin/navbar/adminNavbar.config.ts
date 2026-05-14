// ─── adminNavbar.config.ts ───────────────────────────────
// Cấu hình tĩnh: menu items, sub-items, và phân quyền theo role.
// Tách riêng để dễ thêm/sửa menu mà không cần đụng vào component.

import type { UserRole } from '../../../context/AuthContext';

export type NavChild = {
  label: string;
  path: string;
};

export type NavItem = {
  label: string;              // Tên nhóm menu hiển thị trên navbar
  roles: UserRole[];          // Chỉ role trong mảng này mới thấy menu
  children: NavChild[];       // Danh sách sub-items trong dropdown
};

export const menuConfig: NavItem[] = [
  {
    label: 'Quản lý ca khám',
    roles: ['Admin', 'BacSi', 'YTa'],
    children: [
      { label: 'Hồ sơ bệnh án', path: '/dashboard/medical-records' },
      { label: 'Ca phẫu thuật',  path: '/dashboard/surgeries' },
    ],
  },
  {
    label: 'Quản lý bệnh nhân',
    roles: ['Admin', 'YTa', 'BacSi', 'KeToan'],
    children: [
      { label: 'Danh sách bệnh nhân', path: '/dashboard/patients' },
      { label: 'Nhập viện',           path: '/dashboard/admissions' },
      { label: 'Xuất viện',           path: '/dashboard/admissions?tab=discharge' },
      { label: 'Quản lý giường',      path: '/dashboard/beds' },
    ],
  },
  {
    label: 'Quản lý báo cáo',
    roles: ['Admin', 'KeToan'],
    children: [
      { label: 'Báo cáo tổng hợp',  path: '/dashboard/reports' },
      { label: 'Audit log',         path: '/dashboard/audit' },
      { label: 'Thống kê Dashboard', path: '/dashboard/admin' },
    ],
  },
  {
    label: 'Mẫu phiếu',
    roles: ['Admin', 'KeToan'],
    children: [
      { label: 'Hóa đơn', path: '/dashboard/invoices' },
    ],
  },
];
