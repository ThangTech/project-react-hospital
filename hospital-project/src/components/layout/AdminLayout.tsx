import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
