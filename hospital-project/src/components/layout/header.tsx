import { Menu } from 'antd';
import {
  HomeOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();

  const onClick = (e: { key: string }) => {
    setCurrent(e.key);
  };

  // Menu items bên trái (navigation chính)
  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/khoa-phong">Khoa phòng</Link>,
      key: 'khoa-phong',
      icon: <MedicineBoxOutlined />,
    },
    {
      label: <Link to="/bac-si">Đội ngũ bác sĩ</Link>,
      key: 'bac-si',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to="/dich-vu">Dịch vụ</Link>,
      key: 'dich-vu',
      icon: <CustomerServiceOutlined />,
    },
    {
      label: <Link to="/lien-he">Liên hệ</Link>,
      key: 'lien-he',
      icon: <PhoneOutlined />,
    },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar - thông tin liên hệ nhanh */}
      <div className="bg-[#1677ff] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
          <div className="flex gap-4">
            <span>📞 Hotline: 1900-xxxx</span>
            <span className="hidden sm:inline">📧 contact@hospital.vn</span>
          </div>
          <div className="flex gap-2">
            <span>🕐 Thứ 2 - Thứ 7: 7:00 - 17:00</span>
          </div>
        </div>
      </div>

      {/* Main header - Logo + Menu + Login */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer py-2"
          onClick={() => {
            setCurrent('home');
            navigate('/');
          }}
        >
          <MedicineBoxOutlined className="text-3xl text-[#1677ff]" />
          <div>
            <div className="text-lg font-bold text-[#1677ff] leading-tight">
              HOSPITAL
            </div>
            <div className="text-xs text-gray-500 leading-tight">
              Hệ thống quản lý bệnh viện
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="flex-1 justify-center border-none"
        />

        {/* Nút đăng nhập */}
        <div
          className="flex items-center gap-2 cursor-pointer text-[#1677ff] hover:text-[#4096ff] transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
          onClick={() => navigate('/login')}
        >
          <LoginOutlined className="text-lg" />
          <span className="font-medium hidden md:inline">Đăng nhập</span>
        </div>
      </div>
    </header>
  );
};

export default Header;