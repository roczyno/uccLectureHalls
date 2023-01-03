import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Background from "../../img/vh.jpg";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="home">
        <img src={Background} alt="" />
        <div className="home-text">
          <p>
            Hello Jacob! Select a lecture hall to view available lecture rooms
          </p>
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Footer />
    </>
  );
};

export default Home;
