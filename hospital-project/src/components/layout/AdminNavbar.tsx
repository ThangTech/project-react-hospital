// ─── AdminNavbar.tsx ─────────────────────────────────────
// Navbar dành riêng cho giao diện quản trị (sau đăng nhập).
// Chỉ chứa STATE và LAYOUT — logic nằm trong sub-components.
//
// Cấu trúc:
//   <AdminNavbar>
//     ├── Logo  (Link về dashboard)
//     ├── <NavMenuGroup /> × N  (lọc theo role)
//     └── <NavUserMenu />

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../store/atoms/authAtom';
import { menuConfig } from '../admin/navbar/adminNavbar.config';
import NavMenuGroup from '../admin/navbar/NavMenuGroup';
import NavUserMenu from '../admin/navbar/NavUserMenu';
import logo from '../../assets/logo.jpg';

const AdminNavbar = () => {
  // State: tên menu đang mở (hover) — null = tất cả đóng
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // State: dropdown user có đang mở không
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Lấy thông tin user từ Recoil global state
  const auth = useRecoilValue(authAtom);
  const userRole = auth.user?.role ?? 'Admin';
  const userName = auth.user?.fullName ?? 'Quản trị viên';

  // Lọc menu: chỉ hiện menu mà role hiện tại có quyền
  const visibleMenus = menuConfig.filter((m) => m.roles.includes(userRole));

  return (
    <nav className="bg-gradient-to-r from-[#005b96] to-[#003f6b] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-12">

        {/* ── Logo ── */}
        <Link to="/dashboard/admin" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-8 rounded-full object-cover border border-white/30"
          />
          <span className="font-bold text-sm tracking-wide hidden sm:inline">BỆNH VIỆN</span>
        </Link>

        {/* ── Menu chính: render từng NavMenuGroup theo role ── */}
        <div className="flex items-center gap-0.5 h-full">
          {visibleMenus.map((menu) => (
            <NavMenuGroup
              key={menu.label}
              menu={menu}
              isOpen={openMenu === menu.label}
              onOpen={() => setOpenMenu(menu.label)}
              onClose={() => setOpenMenu(null)}
              onChildClick={() => setOpenMenu(null)}
            />
          ))}
        </div>

        {/* ── User section ── */}
        <NavUserMenu
          userName={userName}
          userRole={userRole}
          isOpen={userMenuOpen}
          onToggle={() => setUserMenuOpen((prev) => !prev)}
          onClose={() => setUserMenuOpen(false)}
        />

      </div>
    </nav>
  );
};

export default AdminNavbar;
