import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';

type Service = {
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    title: 'Khám & Chẩn đoán',
    description: 'Khám tổng quát, chuyên khoa, xét nghiệm và chẩn đoán hình ảnh với máy móc hiện đại.',
  },
  {
    title: 'Phẫu thuật',
    description: 'Phòng mổ vô khuẩn, đội ngũ phẫu thuật viên giàu kinh nghiệm, gây mê an toàn.',
  },
  {
    title: 'Cấp cứu 24/7',
    description: 'Hệ thống cấp cứu hoạt động liên tục, tiếp nhận và xử lý nhanh các trường hợp khẩn cấp.',
  },
  {
    title: 'Chăm sóc Nội trú',
    description: 'Phòng bệnh tiêu chuẩn và VIP, điều dưỡng chăm sóc tận tình 24/7.',
  },
  {
    title: 'Xét nghiệm',
    description: 'Hệ thống phòng lab hiện đại, kết quả nhanh, chính xác với đầy đủ các loại xét nghiệm.',
  },
  {
    title: 'Chẩn đoán hình ảnh',
    description: 'X-quang, siêu âm, CT-Scan, MRI với công nghệ mới nhất.',
  },
  {
    title: 'Phục hồi chức năng',
    description: 'Chương trình phục hồi vận động, vật lý trị liệu cho bệnh nhân sau phẫu thuật.',
  },
  {
    title: 'Tư vấn dinh dưỡng',
    description: 'Chuyên gia dinh dưỡng tư vấn chế độ ăn phù hợp cho từng tình trạng sức khỏe.',
  },
];

const ServicePage = () => {
  return (
    <div>
      <PageHero
        title="Dịch Vụ Y Tế"
        subtitle="Cung cấp đầy đủ dịch vụ khám chữa bệnh chất lượng cao"
        breadcrumbs={[{ label: 'Dịch vụ' }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionTitle title="Các Dịch Vụ Của Chúng Tôi" subtitle="Dịch vụ" centered />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#005b96]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#005b96]/10 mb-4 flex items-center justify-center text-[#005b96] font-semibold">
                •
              </div>
              <h3 className="font-semibold text-gray-800 text-base mb-2 group-hover:text-[#005b96] transition-colors">
                {svc.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-[#005b96] py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-3">Cần tư vấn dịch vụ?</h2>
          <p className="text-blue-100 mb-6">Liên hệ với chúng tôi để được tư vấn miễn phí và đặt lịch khám.</p>
          <a
            href="tel:1900xxxx"
            className="inline-block px-8 py-3 bg-white text-[#005b96] font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Gọi ngay: 1900 xxxx
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
