// ─── adminNavbar.config.ts ───────────────────────────────
// Cấu hình tĩnh: menu items, sub-items, và phân quyền theo role.
// Tách riêng để dễ thêm/sửa menu mà không cần đụng vào component.

import type { UserRole } from '../../../store/atoms/authAtom';

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
      { label: 'Hồ sơ bệnh án', path: '/medical-records' },
      { label: 'Ca phẫu thuật',  path: '/surgeries' },
    ],
  },
  {
    label: 'Quản lý bệnh nhân',
    roles: ['Admin', 'YTa', 'BacSi', 'KeToan'],
    children: [
      { label: 'Danh sách bệnh nhân', path: '/patients' },
      { label: 'Nhập viện',           path: '/admissions' },
      { label: 'Xuất viện',           path: '/admissions?tab=discharge' },
      { label: 'Quản lý giường',      path: '/beds' },
    ],
  },
  {
    label: 'Quản lý báo cáo',
    roles: ['Admin', 'KeToan'],
    children: [
      { label: 'Báo cáo tổng hợp',  path: '/reports' },
      { label: 'Thống kê Dashboard', path: '/dashboard/admin' },
    ],
  },
  {
    label: 'Mẫu phiếu',
    roles: ['Admin', 'KeToan'],
    children: [
      { label: 'Hóa đơn', path: '/invoices' },
    ],
  },
];
