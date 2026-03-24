import { Link } from 'react-router-dom';

interface DepartmentCardProps {
  id: string;
  name: string;
  type?: string;
  totalBeds?: number;
}

const DepartmentCard = ({ id, name, type, totalBeds }: DepartmentCardProps) => {
  return (
    <Link to={`/departments/${id}`} className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-400 hover:bg-blue-50 transition-colors">
      <h3 className="font-semibold text-gray-800">{name}</h3>
      {type && <p className="text-xs text-gray-500 mt-1">{type}</p>}
      {totalBeds !== undefined && (
        <p className="text-xs text-gray-400 mt-2">{totalBeds} giường</p>
      )}
    </Link>
  );
};

export default DepartmentCard;
