import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../../assets/background.jpg";
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";

type Slide = {
  image: string;
  label: string;
  title: string;
  desc: string;
  cta: string;
  ctaPath: string;
};

const SLIDES: Slide[] = [
  {
    image: backgroundImg,
    label: "Được chứng nhận Bộ Y tế Việt Nam",
    title: "Giải Pháp Chăm Sóc Sức Khỏe Toàn Diện",
    desc: "Đội ngũ y bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại, luôn đồng hành cùng sức khỏe của bạn và gia đình.",
    cta: "Tìm hiểu thêm",
    ctaPath: "/service",
  },
  {
    image: hero1,
    label: "Hơn 500 bác sĩ chuyên khoa",
    title: "Đội Ngũ Y Tế Hàng Đầu Khu Vực",
    desc: "Được đào tạo bài bản trong và ngoài nước, luôn đặt sức khỏe và sự an toàn của bệnh nhân lên hàng đầu.",
    cta: "Gặp gỡ bác sĩ",
    ctaPath: "/doctor",
  },
  {
    image: hero2,
    label: "Phục vụ 24/7",
    title: "Chăm Sóc Tận Tâm Không Ngừng Nghỉ",
    desc: "Khoa Cấp cứu hoạt động liên tục, đảm bảo bệnh nhân được tiếp nhận và điều trị kịp thời mọi lúc mọi nơi.",
    cta: "Liên hệ ngay",
    ctaPath: "/contact",
  },
];

type HeroSliderProps = {
  slides?: Slide[];
};

const HeroSlider = ({ slides = SLIDES }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: animating ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,43,91,0.96) 38%, rgba(0,91,150,0.7) 62%, rgba(0,91,150,0.15) 100%)",
        }}
      />

      <div
        className="relative max-w-7xl mx-auto px-6 w-full py-24 transition-all duration-500"
        style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)" }}
      >
        <div className="max-w-lg text-white">
          <p className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-5">
            {slide.label}
          </p>
          <h1 className="text-5xl font-bold leading-tight mb-6">{slide.title}</h1>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">{slide.desc}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to={slide.ctaPath}
              className="px-8 py-3.5 bg-white text-[#005b96] font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              {slide.cta}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={[
              "rounded-full transition-all duration-300",
              i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={[
              "w-1 rounded-full transition-all duration-300",
              i === current ? "h-10 bg-white" : "h-5 bg-white/30 hover:bg-white/60",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
export type { Slide };
