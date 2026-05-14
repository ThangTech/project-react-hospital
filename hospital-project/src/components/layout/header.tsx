import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useAuth } from '../../hooks/useAuth';


const Header = () => {
       const { user, isAuthenticated, logout } = useAuth();
       const navItems = [
              {
                     label: "Khoa phòng",
                     path: "/department",
                     children: [
                            { label: "Khoa Nội", path: "/department/noi" },
                            { label: "Khoa Ngoại", path: "/department/ngoai" },
                            { label: "Khoa Sản", path: "/department/san" },
                            { label: "Khoa Nhi", path: "/department/nhi" },
                     ],
              },
              { label: "Đội ngũ bác sĩ", path: "/doctor" },
              { label: "Dịch vụ", path: "/service" },
              { label: "Blog", path: "/blog" },
              { label: "Liên hệ", path: "/contact" },
       ];
       const [mobileOpen, setMobileOpen] = useState(false);
       const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
       const navigate = useNavigate();
       const location = useLocation();


       const isActive = (path: string) =>
              path === "/"
                     ? location.pathname === "/"
                     : location.pathname.startsWith(path);

       return (
              <header className="bg-white shadow-sm sticky top-0 z-50">
                     <div className="max-w-7xl mx-auto px-6">
                            <div className="flex items-center justify-between h-16">

                                   <Link to="/" className="flex items-center gap-3 flex-shrink-0">
                                          <img
                                                 src={logo}
                                                 alt="Hospital Logo"
                                                 className="h-11 w-11 rounded-full object-cover border-2 border-[#005b96]"
                                          />
                                          <div className="leading-tight">
                                                 <div className="text-[#005b96] font-bold text-base tracking-wide">
                                                        BỆNH VIỆN ĐA KHOA
                                                 </div>
                                                 <div className="text-gray-400 text-xs">
                                                        Hospital Management System
                                                 </div>
                                          </div>
                                   </Link>


                                   <nav className="hidden lg:flex items-center gap-1">
                                          {navItems.map((item) => (
                                                 <div
                                                        key={item.path}
                                                        className="relative"
                                                        onMouseEnter={() => item.children && setDropdownOpen(item.path)}
                                                        onMouseLeave={() => setDropdownOpen(null)}
                                                 >
                                                        <Link
                                                               to={item.path}
                                                               className={[
                                                                      "flex items-center gap-1.5 px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-150",
                                                                      isActive(item.path)
                                                                             ? "text-[#005b96] bg-blue-100 font-semibold"
                                                                             : "text-gray-700 hover:text-[#005b96] hover:bg-blue-100",
                                                               ].join(" ")}
                                                        >
                                                               {item.label}
                                                               {item.children && <span>▾</span>}
                                                        </Link>


                                                        {item.children && dropdownOpen === item.path && (
                                                               <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                                                                      {item.children.map((sub) => (
                                                                             <Link
                                                                                    key={sub.path}
                                                                                    to={sub.path}
                                                                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#005b96] hover:bg-blue-50 transition-colors"
                                                                             >
                                                                                    {sub.label}
                                                                             </Link>
                                                                      ))}
                                                               </div>
                                                        )}
                                                 </div>
                                          ))}
                                   </nav>


                                   {isAuthenticated ? (
                                          <div className="hidden lg:flex items-center gap-4">
                                                 <span className="text-sm text-gray-600">
                                                        Xin chào, <span className="font-medium text-[#005b96]">{user?.tenDangNhap}</span>
                                                 </span>
                                                 <button
                                                        onClick={() => {
                                                               logout();
                                                               navigate("/login");
                                                        }}
                                                        className="px-5 py-2.5 bg-blue-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                                 >
                                                        Đăng xuất
                                                 </button>
                                          </div>
                                   ) : (
                                          <button
                                                 onClick={() => navigate("/login")}
                                                 className="hidden lg:block px-7 py-2.5 bg-[#005b96] text-white text-sm font-semibold rounded-lg hover:bg-[#004a7c] active:scale-95 transition-all duration-150 cursor-pointer"
                                          >
                                                 Đăng nhập
                                          </button>
                                   )}


                                   <button
                                          className="lg:hidden p-2 text-gray-600 hover:text-[#005b96] cursor-pointer"
                                          onClick={() => setMobileOpen(!mobileOpen)}
                                   >
                                          {mobileOpen ? <span>×</span> : <span>☰</span>}
                                   </button>
                            </div>
                     </div>


                     {mobileOpen && (
                            <div className="lg:hidden border-t border-gray-100 px-6 pb-4">
                                   {navItems.map((item) => (
                                          <Link
                                                 key={item.path}
                                                 to={item.path}
                                                 onClick={() => setMobileOpen(false)}
                                                 className={[
                                                        "block py-3 text-sm border-b border-gray-50 font-medium",
                                                        isActive(item.path)
                                                               ? "text-[#005b96]"
                                                               : "text-gray-700 hover:text-[#005b96]",
                                                 ].join(" ")}
                                          >
                                                 {item.label}
                                          </Link>
                                   ))}
                                   {isAuthenticated ? (
                                          <button
                                                 onClick={() => {
                                                        logout();
                                                        navigate("/");
                                                 }}
                                                 className="mt-3 w-full py-2.5 bg-blue-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                          >
                                                 Đăng xuất
                                          </button>
                                   ) : (
                                          <button
                                                 onClick={() => {
                                                        navigate("/login");
                                                        setMobileOpen(false);
                                                 }}
                                                 className="mt-3 w-full py-2.5 bg-[#005b96] text-white text-sm font-semibold rounded-lg hover:bg-[#004a7c] transition-colors cursor-pointer"
                                          >
                                                 Đăng nhập
                                          </button>
                                   )}
                            </div>
                     )}
              </header>
       );
};

export default Header;
