// ─── NavMenuGroup.tsx ────────────────────────────────────
// Sub-component của AdminNavbar.
// Render 1 nhóm menu: nút trigger + dropdown sub-items.
// Dùng Dropdown của Ant Design — hover để mở, không cần quản lý state thủ công.

import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from './adminNavbar.config';

type Props = {
  menu: NavItem;
  onChildClick: () => void;
};

const NavMenuGroup = ({ menu, onChildClick }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhóm active nếu path hiện tại khớp với bất kỳ child nào
  const isGroupActive = menu.children.some((child) =>
    location.pathname.startsWith(child.path.split('?')[0])
  );

  const items: MenuProps['items'] = menu.children.map((child) => {
    const isActive = location.pathname === child.path.split('?')[0];
    return {
      key: child.path,
      label: (
        <span
          className={
            isActive
              ? 'text-[#005b96] font-medium'
              : 'text-gray-700'
          }
        >
          {child.label}
        </span>
      ),
      onClick: () => {
        navigate(child.path);
        onChildClick();
      },
    };
  });

  return (
    <Dropdown menu={{ items }} trigger={['hover']} placement="bottomLeft">
      <button
        className={[
          'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md h-full',
          'transition-colors duration-150 cursor-pointer whitespace-nowrap',
          isGroupActive
            ? 'bg-white/20 text-white'
            : 'text-white/80 hover:bg-white/15 hover:text-white',
        ].join(' ')}
      >
        {menu.label}
        <ChevronDown size={13} className="transition-transform duration-150" />
      </button>
    </Dropdown>
  );
};

export default NavMenuGroup;
