// ─── NavMenuGroup.tsx ────────────────────────────────────
// Sub-component của AdminNavbar.
// Render 1 nhóm menu: nút trigger + dropdown sub-items.

import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from './adminNavbar.config';

type Props = {
  menu: NavItem;
  isOpen: boolean;          // Parent truyền: dropdown đang mở hay không
  onOpen: () => void;       // Gọi khi hover vào → mở dropdown
  onClose: () => void;      // Gọi khi hover ra  → đóng dropdown
  onChildClick: () => void; // Gọi khi click link → đóng dropdown
};

const NavMenuGroup = ({ menu, isOpen, onOpen, onClose, onChildClick }: Props) => {
  const location = useLocation();

  // Nhóm active nếu path hiện tại khớp với bất kỳ child nào
  const isGroupActive = menu.children.some((child) =>
    location.pathname.startsWith(child.path.split('?')[0])
  );

  // Sub-item active: so sánh chính xác path (bỏ query string)
  const isChildActive = (path: string) =>
    location.pathname === path.split('?')[0];

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {/* Nút menu cha */}
      <button
        className={[
          'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md',
          'transition-colors duration-150 cursor-pointer whitespace-nowrap',
          isGroupActive
            ? 'bg-white/20 text-white'
            : 'text-white/80 hover:bg-white/15 hover:text-white',
        ].join(' ')}
      >
        {menu.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown sub-items */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-0 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
          {menu.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              onClick={onChildClick}
              className={[
                'block px-4 py-2.5 text-sm transition-colors duration-100',
                isChildActive(child.path)
                  ? 'text-[#005b96] bg-blue-50 font-medium'
                  : 'text-gray-700 hover:text-[#005b96] hover:bg-gray-50',
              ].join(' ')}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMenuGroup;
