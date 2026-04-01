import { useState } from "react";
import backgroundImg from "../../assets/background.jpg";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  { q: "Làm thế nào để đặt lịch khám?", a: "Bạn có thể đặt lịch qua hotline 1900-1234 hoặc trực tiếp tại quầy lễ tân từ 7:00 – 17:00 các ngày trong tuần." },
  { q: "Bệnh viện có nhận bảo hiểm y tế không?", a: "Chúng tôi chấp nhận thẻ BHYT toàn quốc. Vui lòng mang theo thẻ BHYT và CMND/CCCD khi đến khám." },
  { q: "Thời gian chờ khám trung bình là bao lâu?", a: "Thời gian chờ trung bình từ 20 – 40 phút tùy ca. Đặt lịch trước giúp rút ngắn thời gian chờ đáng kể." },
  { q: "Có dịch vụ cấp cứu 24/7 không?", a: "Khoa Cấp cứu hoạt động 24/7 kể cả ngày lễ và cuối tuần. Gọi 1900-1234 để được hỗ trợ ngay." },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className="hidden lg:block min-h-[520px]"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="bg-[#005b96] px-10 lg:px-16 py-20">
        <p className="text-blue-200 text-xs font-semibold tracking-widest uppercase mb-3">
          Câu hỏi thường gặp
        </p>
        <h2 className="text-3xl font-bold text-white mb-10 leading-tight">
          Giải Đáp Mọi Thắc Mắc Của Bạn
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-white/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-xl ml-4 flex-shrink-0 leading-none">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 pt-3 text-blue-100 text-sm leading-relaxed border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
