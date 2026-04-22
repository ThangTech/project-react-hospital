// ─── NavUserMenu.tsx ─────────────────────────────────────
// Sub-component của AdminNavbar.
// Hiển thị avatar + tên user, dropdown: đổi mật khẩu / đăng xuất.

import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, KeyRound, LogOut } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../../../store/atoms/authAtom';

type Props = {
  userName: string;
  userRole: string;
  isOpen: boolean;
  onToggle: () => void;   // Click avatar → toggle dropdown
  onClose: () => void;    // Click bên ngoài → đóng
};

const NavUserMenu = ({ userName, userRole, isOpen, onToggle, onClose }: Props) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài vùng component
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null, isAuthenticated: false });
    navigate('/login');
  };

  return (
    <div className="relative flex items-center" ref={menuRef}>
      {/* Avatar + tên */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
      >
        <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden md:inline max-w-[120px] truncate">
          {userName}
        </span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-800 truncate">{userName}</div>
            <div className="text-xs text-gray-400">{userRole}</div>
          </div>
          <button
            onClick={() => { onClose(); navigate('/change-password'); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#005b96] transition-colors cursor-pointer"
          >
            <KeyRound size={14} />
            Đổi mật khẩu
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default NavUserMenu;
