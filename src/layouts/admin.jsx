import { Outlet } from "react-router-dom";
import Footer from "../components/Dashboard/Footer";
import Sidenav from "../components/Dashboard/Sidenav";
import DashboardNavbar from "../components/Dashboard/Navbar";
import { useState } from "react";
import { decodeToken } from "../_formats";

export default function AdminLayout() {
  const [openSidenav, setOpenSidenav] = useState(false);

  const sidenavType = "white";

  const profile = decodeToken(localStorage.getItem("accessToken"));

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        profile={profile}
        sidenavType={sidenavType}
        openSidenav={openSidenav}
        setOpenSidenav={setOpenSidenav}
      />
      <div className="p-4 lg:ml-80">
        <DashboardNavbar
          profile={profile}
          openSidenav={openSidenav}
          setOpenSidenav={setOpenSidenav}
        />

        <Outlet />

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
