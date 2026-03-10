import { BrowserRouter, Routes, route } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import Login from "./Componentes/Login/Login.jsx";
import Registro from "./Componentes/Registro/Registro.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/registro" element={<Registro />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
