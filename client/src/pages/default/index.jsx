import { Outlet } from "react-router-dom";
import Navbar from "../../component/layouts/Navbar";
import Footer from "../../component/layouts/Footer";
function Default() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Default;
