import { useEffect, useState } from 'react';
import PageHero from '../components/shared/PageHero';
import SectionTitle from '../components/shared/SectionTitle';
import DoctorCard from '../components/shared/DoctorCard';

type Doctor = {
  name: string;
  specialty: string;
  department: string;
};

const ALL_DEPARTMENTS = ['Tất cả', 'Khoa Nội', 'Khoa Ngoại', 'Khoa Nhi', 'Khoa Sản'];

const MOCK_DOCTORS: Doctor[] = [
  { name: 'BS.CKI Nguyễn Văn An', specialty: 'Nội tổng quát', department: 'Khoa Nội' },
  { name: 'BS.CKII Hoàng Văn Bình', specialty: 'Tim mạch', department: 'Khoa Nội' },
  { name: 'TS.BS Trần Thị Bích', specialty: 'Ngoại thần kinh', department: 'Khoa Ngoại' },
  { name: 'BS.CKI Đỗ Quang Cường', specialty: 'Chỉnh hình', department: 'Khoa Ngoại' },
  { name: 'BS.CKII Lê Minh Châu', specialty: 'Nhi tổng quát', department: 'Khoa Nhi' },
  { name: 'PGS.TS Phạm Thu Dung', specialty: 'Sản phụ khoa', department: 'Khoa Sản' },
  { name: 'BS.CKI Vũ Thị Em', specialty: 'Nhi hô hấp', department: 'Khoa Nhi' },
  { name: 'TS.BS Ngô Xuân Phú', specialty: 'Tiêu hóa', department: 'Khoa Nội' },
];

const DoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Thay bằng API — doctorService.getAll()
    setDoctors(MOCK_DOCTORS);
    setLoading(false);
  }, []);

  const filtered = activeTab === 'Tất cả'
    ? doctors
    : doctors.filter((d) => d.department === activeTab);

  return (
    <div>
      <PageHero
        title="Đội Ngũ Bác Sĩ"
        subtitle="Những chuyên gia hàng đầu, tận tâm với từng bệnh nhân"
        breadcrumbs={[{ label: 'Bác sĩ' }]}
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionTitle title="Danh Sách Bác Sĩ" subtitle="Đội ngũ" centered />

        {/* Tabs lọc theo khoa */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {ALL_DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveTab(dept)}
              className={[
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                activeTab === dept
                  ? 'bg-[#005b96] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ].join(' ')}
            >
              {dept}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc, i) => (
              <DoctorCard key={i} {...doc} />
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
