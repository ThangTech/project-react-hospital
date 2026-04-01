import { Link } from "react-router-dom";
import backgroundImg from "../../assets/background.jpg";

const AboutSection = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div
        className="rounded-2xl h-80 lg:h-[420px] shadow-xl"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div>
        <p className="text-[#005b96] text-xs font-semibold tracking-widest uppercase mb-3">
          Về chúng tôi
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Chào Mừng Đến Với Bệnh Viện Đa Khoa
        </h2>
        <p className="text-gray-500 leading-relaxed mb-4">
          Với hơn 15 năm hoạt động, chúng tôi tự hào là một trong những bệnh viện hàng đầu trong khu vực, cung cấp dịch vụ y tế chất lượng cao cho hàng chục nghìn bệnh nhân mỗi năm.
        </p>
        <p className="text-gray-500 leading-relaxed mb-8">
          Đội ngũ hơn 500 bác sĩ và chuyên gia y tế được đào tạo bài bản trong và ngoài nước, luôn đặt sức khỏe và sự an toàn của bệnh nhân lên hàng đầu.
        </p>
        <Link
          to="/department"
          className="inline-block px-8 py-3.5 bg-[#005b96] text-white font-semibold rounded-xl hover:bg-[#004a7c] transition-colors"
        >
          Tìm hiểu thêm
        </Link>
      </div>
    </div>
  </section>
);

export default AboutSection;
