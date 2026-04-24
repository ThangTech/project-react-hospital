// ─── NavUserMenu.tsx ─────────────────────────────────────
// Sub-component của AdminNavbar.
// Hiển thị avatar + tên user, dropdown: đổi mật khẩu / đăng xuất.
// Dùng Dropdown của Ant Design — không cần quản lý state mở/đóng thủ công.

import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ChevronDown, KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

type Props = {
  userName: string;
  userRole: string;
};

const NavUserMenu = ({ userName, userRole }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'header',
      label: (
        <div className="px-1 py-0.5">
          <div className="text-sm font-semibold text-gray-800 truncate max-w-[150px]">
            {userName}
          </div>
          <div className="text-xs text-gray-400">{userRole}</div>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'change-password',
      icon: <KeyRound size={14} />,
      label: 'Đổi mật khẩu',
      onClick: () => navigate('/change-password'),
    },
    {
      key: 'logout',
      icon: <LogOut size={14} />,
      label: <span className="text-white-600">Đăng xuất</span>,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer">
        <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden md:inline max-w-[120px] truncate">
          {userName}
        </span>
        <ChevronDown size={13} className="transition-transform duration-150" />
      </button>
    </Dropdown>
  );
};

export default NavUserMenu;
