import Sidebar from "./Sidebar";
import AdminNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <AdminNavbar onLogout={handleLogout} />

      <div className="d-flex">
        <Sidebar />

        <main className="p-4 w-100 bg-light" style={{ minHeight: "100vh" }}>
          <Outlet/>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;