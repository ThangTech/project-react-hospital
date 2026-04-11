import HeroSlider from "../components/home/HeroSlider";
import StatsStrip from "../components/home/StatsStrip";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import FaqSection from "../components/home/FaqSection";
import DoctorsSection from "../components/home/DoctorsSection";
import BlogPreviewSection from "../components/home/BlogPreviewSection";
import type { KhoaPhong, BacSi } from "../types";

const departments: KhoaPhong[] = [];
const doctors: BacSi[] = [];

const HomePage = () => (
  <div>
    <HeroSlider />
    <StatsStrip />
    <AboutSection />
    <ServicesSection departments={departments} />
    <FaqSection />
    <DoctorsSection doctors={doctors} />
    <BlogPreviewSection />
  </div>
);

export default HomePage;
