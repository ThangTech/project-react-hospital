import { Link } from "react-router-dom";
import type { BacSi } from "../../types";

type Props = {
  doctors: BacSi[];
};

const getInitials = (name: string) => {
  const parts = name.replace(/^(BS\.|TS\.|PGS\.|GS\.|CKII?|ThS)\s*/gi, "").trim().split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
};

const DoctorsSection = ({ doctors }: Props) => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-[#005b96] text-xs font-semibold tracking-widest uppercase mb-3">Đội ngũ</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Gặp Gỡ Các Bác Sĩ Của Chúng Tôi</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Đội ngũ bác sĩ chuyên khoa hàng đầu, được đào tạo bài bản trong và ngoài nước, tận tâm với từng bệnh nhân.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.slice(0, 4).map((doc) => (
          <article
            key={doc.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow text-center"
          >
            <div
              className="h-52 flex items-center justify-center text-white text-5xl font-bold"
              style={{ background: "linear-gradient(135deg, #002f5c 0%, #005b96 100%)" }}
            >
              {getInitials(doc.hoTen)}
            </div>
            <div className="p-5">
              <h4 className="font-bold text-gray-900 text-sm leading-snug">{doc.hoTen}</h4>
              <p className="text-[#005b96] text-xs mt-1.5 font-medium">{doc.chuyenKhoa}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/doctor"
          className="inline-block px-8 py-3 border-2 border-[#005b96] text-[#005b96] font-semibold rounded-xl hover:bg-[#005b96] hover:text-white transition-all duration-200"
        >
          Xem tất cả bác sĩ →
        </Link>
      </div>
    </div>
  </section>
);

export default DoctorsSection;
