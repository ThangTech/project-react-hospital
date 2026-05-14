import { Link } from "react-router-dom";

const QuickActionSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#005b96] to-[#003f6b] text-white p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <p className="text-blue-100 text-xs font-semibold tracking-widest uppercase mb-3">Hành động nhanh</p>
          <h2 className="text-3xl font-bold mb-3">Cần hỗ trợ ngay?</h2>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            Truy cập nhanh cổng bệnh nhân, đổi mật khẩu hoặc liên hệ với bệnh viện khi cần hỗ trợ.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/patient" className="px-6 py-3 rounded-xl bg-white text-[#005b96] font-semibold hover:bg-blue-50 transition-colors">
            Cổng bệnh nhân
          </Link>
          <Link to="/change-password" className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            Đổi mật khẩu
          </Link>
          <Link to="/contact" className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            Liên hệ
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default QuickActionSection;
