import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#001529] text-gray-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Cột 1: Giới thiệu */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">🏥 HOSPITAL</h3>
            <p className="text-sm leading-relaxed">
              Hệ thống quản lý bệnh viện hiện đại, cung cấp dịch vụ y tế chất lượng cao
              với đội ngũ bác sĩ giàu kinh nghiệm.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-[#1677ff] text-xl transition-colors">
                <FacebookOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-xl transition-colors">
                <YoutubeOutlined />
              </a>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#1677ff] transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/khoa-phong" className="hover:text-[#1677ff] transition-colors">
                  Khoa phòng
                </Link>
              </li>
              <li>
                <Link to="/bac-si" className="hover:text-[#1677ff] transition-colors">
                  Đội ngũ bác sĩ
                </Link>
              </li>
              <li>
                <Link to="/dich-vu" className="hover:text-[#1677ff] transition-colors">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-[#1677ff] transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Thông tin liên hệ */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <EnvironmentOutlined className="mt-1 text-[#1677ff]" />
                <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneOutlined className="text-[#1677ff]" />
                <span>1900-xxxx</span>
              </li>
              <li className="flex items-center gap-2">
                <MailOutlined className="text-[#1677ff]" />
                <span>contact@hospital.vn</span>
              </li>
            </ul>
          </div>

          {/* Cột 4: Giờ làm việc */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Giờ làm việc</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <ClockCircleOutlined className="text-[#1677ff]" />
                <div>
                  <div className="font-medium text-white">Thứ 2 - Thứ 6</div>
                  <div>7:00 - 17:00</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <ClockCircleOutlined className="text-[#1677ff]" />
                <div>
                  <div className="font-medium text-white">Thứ 7</div>
                  <div>7:00 - 12:00</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <ClockCircleOutlined className="text-gray-500" />
                <div>
                  <div className="font-medium text-white">Chủ nhật</div>
                  <div className="text-gray-500">Nghỉ</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © 2026 Hospital Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;