import "./navbar.scss";
import Jacob from "../../img/jacob.jpg";
import { useState } from "react";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);

    return () => (window.onscroll = null);
  };

  const handleNav = () => {
    setIsScrolled(!isScrolled);
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div
          className={menuOpen ? "hamburger active" : "hamburger"}
          onClick={handleNav}
        >
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
        </div>
        <div className="user">
          <div className="name">Jacob</div>
          <img src={Jacob} />
          <span>LOGOUT</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
