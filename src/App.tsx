import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl min-h-[85vh] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
