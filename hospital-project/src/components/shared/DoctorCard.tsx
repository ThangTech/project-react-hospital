interface DoctorCardProps {
  name: string;
  specialty: string;
  department?: string;
  contact?: string;
}

const DoctorCard = ({ name, specialty, department, contact }: DoctorCardProps) => {
  // Lấy chữ cái đầu làm avatar
  const initials = name.split(' ').slice(-2).map((w) => w[0]).join('');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
        {initials}
      </div>

      <h3 className="font-semibold text-gray-800">{name}</h3>
      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
        {specialty}
      </span>

      {department && <p className="text-xs text-gray-500 mt-2">{department}</p>}
      {contact && <p className="text-xs text-gray-500">{contact}</p>}
    </div>
  );
};

export default DoctorCard;
