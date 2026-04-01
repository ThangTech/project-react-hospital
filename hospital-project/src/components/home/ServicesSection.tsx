import { Link } from "react-router-dom";

type Service = { name: string; desc: string };

const SERVICES: Service[] = [
  { name: "Nội khoa tổng quát", desc: "Khám và điều trị các bệnh lý nội khoa thường gặp với đội ngũ bác sĩ giàu kinh nghiệm." },
  { name: "Ngoại khoa", desc: "Phẫu thuật và can thiệp ngoại khoa với trang thiết bị hiện đại, quy trình an toàn." },
  { name: "Tim mạch — Lồng ngực", desc: "Chẩn đoán và điều trị chuyên sâu các bệnh lý tim mạch và lồng ngực." },
  { name: "Nhi khoa", desc: "Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến 15 tuổi." },
  { name: "Sản phụ khoa", desc: "Theo dõi thai kỳ, hỗ trợ sinh sản và chăm sóc sức khỏe phụ nữ." },
  { name: "Thần kinh học", desc: "Điều trị chuyên sâu các bệnh lý thần kinh trung ương và ngoại biên." },
];

const ServicesSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-[#005b96] text-xs font-semibold tracking-widest uppercase mb-3">Dịch vụ</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Dịch Vụ Y Tế Của Chúng Tôi</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Cung cấp đầy đủ các chuyên khoa y tế với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại nhất.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((svc) => (
          <article
            key={svc.name}
            className="p-7 border border-gray-100 rounded-2xl hover:shadow-lg hover:border-blue-100 transition-all duration-200 group"
          >
            <div className="w-8 h-0.5 bg-[#005b96] mb-5 group-hover:w-14 transition-all duration-300" />
            <h3 className="font-bold text-lg text-gray-900 mb-3">{svc.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
            <Link to="/service" className="text-[#005b96] text-sm font-semibold hover:underline">
              Xem thêm →
            </Link>
          </article>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/service"
          className="inline-block px-8 py-3 border-2 border-[#005b96] text-[#005b96] font-semibold rounded-xl hover:bg-[#005b96] hover:text-white transition-all duration-200"
        >
          Xem tất cả dịch vụ →
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesSection;
