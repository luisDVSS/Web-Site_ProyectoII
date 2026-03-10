import { useState } from "react";
import "./Appbar.css";
function Appbar() {
  return (
    <>
      <header id="appbar">
        {/*<img src="" alt="Tworkplate logo" /> */}
        <h2>TWorkPlate</h2>
        <MenuIcon />
      </header>
    </>
  );
}

//Componente de menu icon
function MenuIcon() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    // Lógica para abrir o menu lateral
    console.log("Menu clicado!");
  };
  return (
    <>
      <div class="menu-icon" onClick={handleMenuClick}>
        <div class="bit-1"></div>
        <div class="bit-2"></div>
        <div class="bit-3"></div>
      </div>
    </>
  );
}
export default Appbar;
