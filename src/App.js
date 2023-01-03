import "./App.scss";
import Calc from "./pages/calc/Calc";

import Home from "./pages/home/Home";
import Code from "./pages/code/Code";
import Llt from "./pages/Llt/Llt";
import Swlt from "./pages/swlt/Swlt";
import Lt from "./pages/lt/Lt";
import Nlt from "./pages/nlt/Nlt";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/calc" element={<Calc />} />
        <Route path="/code" element={<Code />} />
        <Route path="/lt" element={<Lt />} />
        <Route path="/swlt" element={<Swlt />} />
        <Route path="/nlt" element={<Nlt />} />
        <Route path="/llt" element={<Llt />} />
      </Routes>
    </div>
  );
};

export default App;
