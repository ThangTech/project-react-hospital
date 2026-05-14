import { useEffect, useState } from "react";
import HeroSlider from "../components/home/HeroSlider";
import StatsStrip from "../components/home/StatsStrip";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import FaqSection from "../components/home/FaqSection";
import DoctorsSection from "../components/home/DoctorsSection";
import BlogPreviewSection from "../components/home/BlogPreviewSection";
import { getAllDoctors } from "../services/api.doctor.service";
import { getAllDepartments } from "../services/api.bed-department.service";
import type { BacSi, KhoaPhong } from "../types";

const HomePage = () => {
  const [departments, setDepartments] = useState<KhoaPhong[]>([]);
  const [doctors, setDoctors] = useState<BacSi[]>([]);

  const loadData = async () => {
    const [deptList, doctorList] = await Promise.all([getAllDepartments(), getAllDoctors()]);
    setDepartments(deptList);
    setDoctors(doctorList);
  };

  useEffect(() => {
    void loadData();
  }, []);

  return (
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
};

export default HomePage;
