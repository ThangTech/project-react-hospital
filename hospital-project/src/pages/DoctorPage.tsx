import { useState } from "react";
import PageHero from "../components/shared/PageHero";
import SectionTitle from "../components/shared/SectionTitle";
import DoctorCard from "../components/shared/DoctorCard";
import type { BacSi } from "../types";

const DoctorPage = () => {
  const [doctors] = useState<BacSi[]>([]);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [loading] = useState(false);
  const [departments] = useState<string[]>(["Tất cả"]);

  const filtered = activeTab === "Tất cả"
    ? doctors
    : doctors.filter((d) => d.chuyenKhoa === activeTab);

  return (
    <div>
      <PageHero
        title="Đội Ngũ Bác Sĩ"
        subtitle="Những chuyên gia hàng đầu, tận tâm với từng bệnh nhân"
        breadcrumbs={[{ label: "Bác sĩ" }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionTitle title="Danh Sách Bác Sĩ" subtitle="Đội ngũ" centered />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveTab(dept)}
              className={[
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === dept
                  ? "bg-[#005b96] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              ].join(" ")}
            >
              {dept}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc) => (
              <DoctorCard key={doc.id} name={doc.hoTen} specialty={doc.chuyenKhoa} department="" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20">Không có bác sĩ trong khoa này.</p>
        )}
      </section>
    </div>
  );
};

export default DoctorPage;
