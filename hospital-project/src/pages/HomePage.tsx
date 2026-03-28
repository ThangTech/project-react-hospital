import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, CalendarCheck, Award, Phone, MapPin, Clock } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import StatCard from '../components/shared/StatCard';
import DoctorCard from '../components/shared/DoctorCard';
import DepartmentCard from '../components/shared/DepartmentCard';

// ─── Types ───────────────────────────────────────────────
type Doctor = {
  name: string;
  specialty: string;
  department: string;
};

type Department = {
  id: string;
  name: string;
  type: string;
  totalBeds: number;
};

// ─── Mock Data ────────────────────────────────────────────
const MOCK_DOCTORS: Doctor[] = [
  { name: 'BS.CKI Nguyễn Văn An', specialty: 'Nội tổng quát', department: 'Khoa Nội' },
  { name: 'TS.BS Trần Thị Bích', specialty: 'Ngoại thần kinh', department: 'Khoa Ngoại' },
  { name: 'BS.CKII Lê Minh Châu', specialty: 'Nhi khoa', department: 'Khoa Nhi' },
  { name: 'PGS.TS Phạm Thu Dung', specialty: 'Sản phụ khoa', department: 'Khoa Sản' },
];

const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Khoa Nội', type: 'Nội khoa', totalBeds: 50 },
  { id: '2', name: 'Khoa Ngoại', type: 'Ngoại khoa', totalBeds: 40 },
  { id: '3', name: 'Khoa Nhi', type: 'Nhi khoa', totalBeds: 35 },
  { id: '4', name: 'Khoa Sản', type: 'Sản phụ khoa', totalBeds: 30 },
];

// ─── Component ────────────────────────────────────────────
const HomePage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    // TODO: Thay bằng API thật
    setDoctors(MOCK_DOCTORS);
    setDepartments(MOCK_DEPARTMENTS);
  }, []);

  return (
    <div>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[88vh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, #002f5c 0%, #005b96 65%, #1a7abf 100%)',
        }}
      >
        {/* Vòng trang trí */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.03] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/[0.04] translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Cột trái — Text */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Được chứng nhận Bộ Y tế Việt Nam
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Chăm Sóc Sức Khỏe<br />
              <span className="text-blue-300">Tận Tâm & Chuyên Nghiệp</span>
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-md">
              Đội ngũ y bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại,
              luôn đồng hành cùng sức khỏe của bạn và gia đình.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/khoa-phong"
                className="px-7 py-3 bg-white text-[#005b96] font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Khám phá chuyên khoa
              </Link>
              <Link
                to="/lien-he"
                className="px-7 py-3 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Liên hệ ngay
              </Link>
            </div>

            {/* Thông tin nhanh */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2"><Phone size={14} /> 1900 xxxx</span>
              <span className="flex items-center gap-2"><Clock size={14} /> 24/7</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> TP. Hồ Chí Minh</span>
            </div>
          </div>

          {/* Cột phải — Stats grid (hiện trên desktop) */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Bác sĩ chuyên khoa', icon: <Users size={22} /> },
              { value: '20', label: 'Khoa phòng', icon: <Building2 size={22} /> },
              { value: '50.000+', label: 'Bệnh nhân / năm', icon: <CalendarCheck size={22} /> },
              { value: '15+', label: 'Năm kinh nghiệm', icon: <Award size={22} /> },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white text-center hover:bg-white/15 transition-colors"
              >
                <div className="flex justify-center mb-2 text-blue-200">{s.icon}</div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-blue-200 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS (mobile) ── */}
      <section className="lg:hidden bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-4">
          <StatCard value="500+" label="Bác sĩ chuyên khoa" icon={<Users size={22} />} />
          <StatCard value="20 khoa" label="Khoa phòng" icon={<Building2 size={22} />} />
          <StatCard value="50k+" label="Bệnh nhân/năm" icon={<CalendarCheck size={22} />} />
          <StatCard value="15+ năm" label="Kinh nghiệm" icon={<Award size={22} />} />
        </div>
      </section>

      {/* ── CHUYÊN KHOA NỔI BẬT ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Chuyên Khoa Nổi Bật" subtitle="Dịch vụ" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} {...dept} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/khoa-phong"
              className="inline-block px-8 py-3 border-2 border-[#005b96] text-[#005b96] font-semibold rounded-xl hover:bg-[#005b96] hover:text-white transition-all duration-200"
            >
              Xem tất cả khoa phòng →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BÁC SĨ TIÊU BIỂU ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Bác Sĩ Tiêu Biểu" subtitle="Đội ngũ" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <DoctorCard key={i} {...doc} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/bac-si"
              className="inline-block px-8 py-3 bg-[#005b96] text-white font-semibold rounded-xl hover:bg-[#004a7c] transition-colors shadow-md"
            >
              Xem tất cả bác sĩ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TẠI SAO CHỌN CHÚNG TÔI ── */}
      <section className="bg-[#005b96] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Tại Sao Chọn Chúng Tôi?" subtitle="Cam kết" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {[
              {
                title: 'Đội ngũ chuyên sâu',
                desc: 'Bác sĩ được đào tạo trong và ngoài nước, có chứng chỉ chuyên khoa uy tín.',
              },
              {
                title: 'Trang thiết bị hiện đại',
                desc: 'Hệ thống máy móc, thiết bị y tế nhập khẩu từ các nước tiên tiến.',
              },
              {
                title: 'Phục vụ 24/7',
                desc: 'Cấp cứu và chăm sóc bệnh nhân xuyên suốt, không nghỉ ngày lễ.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
