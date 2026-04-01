type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "500+", label: "Bác sĩ chuyên khoa" },
  { value: "20", label: "Khoa phòng" },
  { value: "50.000+", label: "Bệnh nhân mỗi năm" },
  { value: "15+", label: "Năm kinh nghiệm" },
];

const StatsStrip = () => (
  <section className="bg-white py-12 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`text-center py-6 px-6 ${i < STATS.length - 1 ? "border-r border-gray-100" : ""}`}
          >
            <div className="text-4xl font-bold text-[#005b96]">{s.value}</div>
            <div className="text-gray-500 text-sm mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsStrip;
