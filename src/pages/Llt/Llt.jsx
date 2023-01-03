import "../../general.scss";
import Background from "../../img/bg.jpg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";

import { Lltlecture } from "../../data";

const Llt = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="calc">
        <img
          src="https://plus.unsplash.com/premium_photo-1664299732090-b805797b22c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
          alt="hell0"
        />
        <button>Find a lecture hall</button>
        <div className="container">
          {Lltlecture.map((item) => (
            <div className="item" key={item.id}>
              <img src={item.img} alt="" />
              <div className="desc">
                <span className="name">{item.name}</span>
                <span className="capacity"> Capacity: {item.capacity}</span>
                <span className="status">Status :available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Llt;
