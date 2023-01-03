import "../../general.scss";
import Background from "../../img/bg.jpg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";

import { Nltlecture } from "../../data";

const Nlt = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {};
  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="calc">
        <img
          src="https://images.unsplash.com/photo-1603239230811-72ce793c4393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGxlY3R1cmUlMjBoYWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="hell0"
        />
        <button onClick={handleClick}>Find a lecture hall</button>
        <div className="container">
          {Nltlecture.map((item) => (
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

export default Nlt;
