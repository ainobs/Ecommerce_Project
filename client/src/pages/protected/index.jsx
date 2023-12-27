import { useState } from 'react';
import { BsFilterLeft, BsFilterRight } from 'react-icons/bs';
import Sidebar from '../../component/layouts/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../../component/loading';

function Dashboard() {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-screen justify-center items-center flex">
        <Loading />
      </div>
    );
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="relative">
        <div
          className={`absolute inset-y-0 left-0 bg-white w-full md:w-64  transition-transform transform ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }`}
        >
          <BsFilterLeft
            onClick={toggleSidebar}
            className="text-orange-500 absolute right-4 top-4 text-3xl md:hidden"
          />
          <Sidebar />
        </div>
        <div
          className={`flex-1 p-4 min-h-[50vh] ${'ml-0 md:ml-64 overflow-x-hidden'}`}
        >
          {/* Mobile menu button */}
          <div className=" flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className=" md:hidden text-orange-500"
            >
              <BsFilterRight className="text-primary text-3xl" />
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
