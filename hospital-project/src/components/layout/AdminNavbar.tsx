// ─── AdminNavbar.tsx ─────────────────────────────────────
// Navbar dành riêng cho giao diện quản trị (sau đăng nhập).
// Dùng Ant Design Dropdown trong các sub-component → không cần state mở/đóng ở đây.

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { menuConfig } from '../admin/navbar/adminNavbar.config';
import NavMenuGroup from '../admin/navbar/NavMenuGroup';
import NavUserMenu from '../admin/navbar/NavUserMenu';
import logo from '../../assets/logo.jpg';

const AdminNavbar = () => {
  const { user, role } = useAuth();
  const userRole = role ?? 'Admin';
  const userName = user?.fullName ?? 'Quản trị viên';

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
          <span className="font-bold text-sm tracking-wide hidden sm:inline">QUẢN LÝ BỆNH VIỆN</span>
        </Link>

        {/* ── Menu chính ── */}
        <div className="flex items-center gap-0.5 h-full">
          {visibleMenus.map((menu) => (
            <NavMenuGroup
              key={menu.label}
              menu={menu}
              onChildClick={() => {}}
            />
          ))}
        </div>

        {/* ── User section ── */}
        <NavUserMenu userName={userName} userRole={userRole} />

      </div>
    </nav>
  );
};

export default AdminNavbar;
