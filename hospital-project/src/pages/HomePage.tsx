import { useEffect, useState } from "react";
import HeroSlider from "../components/home/HeroSlider";
import StatsStrip from "../components/home/StatsStrip";
import AboutSection from "../components/home/AboutSection";
import QuickActionSection from "../components/home/QuickActionSection";
import ServicesSection from "../components/home/ServicesSection";
import FaqSection from "../components/home/FaqSection";
import DoctorsSection from "../components/home/DoctorsSection";
import BlogPreviewSection from "../components/home/BlogPreviewSection";
import { getAllDoctors } from "../services/api.doctor.service";
import { getAllDepartments } from "../services/api.bed-department.service";
import { getAllPatients } from "../services/api.patient.service";
import { getAllAdmissions } from "../services/api.admission.service";
import type { BacSi, KhoaPhong } from "../types";

const HomePage = () => {
  const [departments, setDepartments] = useState<KhoaPhong[]>([]);
  const [doctors, setDoctors] = useState<BacSi[]>([]);
  const [stats, setStats] = useState([
    { value: "0", label: "Bác sĩ chuyên khoa" },
    { value: "0", label: "Khoa phòng" },
    { value: "0", label: "Bệnh nhân mỗi năm" },
    { value: "0", label: "Ca nhập viện" },
  ]);

  const loadData = async () => {
    const [deptList, doctorList, patientList, admissionList] = await Promise.all([
      getAllDepartments(),
      getAllDoctors(),
      getAllPatients(),
      getAllAdmissions(),
    ]);

    setDepartments(deptList);
    setDoctors(doctorList);
    setStats([
      { value: `${doctorList.length}`, label: "Bác sĩ chuyên khoa" },
      { value: `${deptList.length}`, label: "Khoa phòng" },
      { value: `${patientList.length}`, label: "Bệnh nhân" },
      { value: `${admissionList.length}`, label: "Ca nhập viện" },
    ]);
  };

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <div>
      <HeroSlider />
      <StatsStrip stats={stats} />
      <AboutSection />
      <QuickActionSection />
      <ServicesSection departments={departments} />
      <FaqSection />
      <DoctorsSection doctors={doctors} />
      <BlogPreviewSection />
    </div>
  );
};

export default HomePage;
