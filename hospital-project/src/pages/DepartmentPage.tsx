import { useState } from "react";
import PageHero from "../components/shared/PageHero";
import SectionTitle from "../components/shared/SectionTitle";
import DepartmentCard from "../components/shared/DepartmentCard";
import type { KhoaPhong } from "../types";

const DepartmentPage = () => {
  const [departments] = useState<KhoaPhong[]>([]);
  const [loading] = useState(false);

  return (
    <div>
      <PageHero
        title="Khoa Phòng"
        subtitle="Hệ thống khoa phòng chuyên sâu, đầy đủ chuyên khoa"
        breadcrumbs={[{ label: "Khoa phòng" }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionTitle title="Danh Sách Khoa Phòng" subtitle="Chuyên khoa" centered />

        {loading ? (
          <p className="text-center text-gray-400 py-20">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} id={dept.id} name={dept.tenKhoa} type={dept.loaiKhoa} totalBeds={dept.soGiuongTieuChuan} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DepartmentPage;
