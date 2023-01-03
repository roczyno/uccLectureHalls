import "../../general.scss";
import Background from "../../img/bg.jpg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";

import { CalcLecture } from "../../data";

const Calc = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="calc">
        <img
          src="https://images.unsplash.com/photo-1627560985113-ab67e8031f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="hell0"
        />
        <button>Find a lecture hall</button>
        <div className="container">
          {CalcLecture.map((item) => (
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

export default Calc;
