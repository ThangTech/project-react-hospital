import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react";
import logo from "../../assets/logo.jpg";

const footerLinks = [
  { label: "Trang chủ", path: "/" },
  { label: "Khoa phòng", path: "/department" },
  { label: "Đội ngũ bác sĩ", path: "/doctor" },
  { label: "Dịch vụ", path: "/service" },
  { label: "Liên hệ", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-gray-400 mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Cột 1: Thương hiệu */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover border-2 border-[#005b96]"
              />
              <div>
                <div className="text-white font-bold text-sm leading-tight">
                  BỆNH VIỆN ĐA KHOA
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  Hospital Management System
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Cung cấp dịch vụ y tế chất lượng cao, tận tâm với sức khỏe cộng
              đồng.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-[#005b96] text-gray-400 hover:text-white transition-all duration-200"
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white transition-all duration-200"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-150 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin
                  size={15}
                  className="mt-0.5 text-[#4a9fd4] flex-shrink-0"
                />
                <span>123 Đường Nguyễn Văn Dương, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-[#4a9fd4] flex-shrink-0" />
                <span>
                  Hotline: <span className="text-white">1900-1234</span>
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-[#4a9fd4] flex-shrink-0" />
                <span>contact@hospital.vn</span>
              </li>
            </ul>
          </div>

          {/* Cột 4: Giờ làm việc */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Giờ làm việc
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Clock
                  size={15}
                  className="mt-0.5 text-[#4a9fd4] flex-shrink-0"
                />
                <div>
                  <div className="text-white">Thứ 2 – Thứ 6</div>
                  <div>07:00 – 17:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  size={15}
                  className="mt-0.5 text-[#4a9fd4] flex-shrink-0"
                />
                <div>
                  <div className="text-white">Thứ 7</div>
                  <div>07:00 – 12:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  size={15}
                  className="mt-0.5 text-gray-600 flex-shrink-0"
                />
                <div>
                  <div className="text-gray-500">Chủ nhật</div>
                  <div className="text-gray-600">Nghỉ</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© 2026 Bệnh Viện Đa Khoa. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
