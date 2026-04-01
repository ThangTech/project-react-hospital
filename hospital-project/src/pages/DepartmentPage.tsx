import { useEffect, useState } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import DepartmentCard from '../components/shared/DepartmentCard';

type Department = {
  id: string;
  name: string;
  type: string;
  totalBeds: number;
};

const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Khoa Nội', type: 'Nội khoa tổng quát', totalBeds: 50 },
  { id: '2', name: 'Khoa Ngoại', type: 'Ngoại khoa', totalBeds: 40 },
  { id: '3', name: 'Khoa Nhi', type: 'Nhi khoa', totalBeds: 35 },
  { id: '4', name: 'Khoa Sản', type: 'Sản phụ khoa', totalBeds: 30 },
  { id: '5', name: 'Khoa Tim Mạch', type: 'Tim mạch - Lồng ngực', totalBeds: 25 },
  { id: '6', name: 'Khoa Thần Kinh', type: 'Thần kinh học', totalBeds: 28 },
  { id: '7', name: 'Khoa Hô Hấp', type: 'Hô hấp - Phổi', totalBeds: 32 },
  { id: '8', name: 'Khoa Tiêu Hóa', type: 'Tiêu hóa - Gan mật', totalBeds: 22 },
];

const DepartmentPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDepartments(MOCK_DEPARTMENTS);
    setLoading(false);
  }, []);

  return (
    <div>
      <PageHero
        title="Khoa Phòng"
        subtitle="Hệ thống khoa phòng chuyên sâu, đầy đủ chuyên khoa"
        breadcrumbs={[{ label: 'Khoa phòng' }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionTitle title="Danh Sách Khoa Phòng" subtitle="Chuyên khoa" centered />

        {loading ? (
          <p className="text-center text-gray-400 py-20">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} {...dept} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DepartmentPage;
