import { useState } from "react";
import "./Login.css";
import runningcat from "../../assets/Gifs/runingcat.gif";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoged, setLog] = useState(false);
  return (
    <>
      {isLoged ? (
        <div className="contenedor-login">
          <h1>TWorkPlate&gt;login</h1>
          <h3>Iniciando sesion..</h3>
          <img src={runningcat} alt="gato corriendo" />
          <></>
        </div>
      ) : (
        <div className="contenedor-login">
          <h1>TWorkPlate&gt;login</h1>
          <form action="" id="login-form">
            <input
              type="email"
              className="login-input"
              placeholder="Correo electronico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="Password"
              className="password-input"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <a href="#" id="olvide-password">
              Olvide mi contraseña
            </a>

            <button type="button" onClick={() => setLog(true)}>
              Ingresar
            </button>
            <div id="contenedor-Log-Apis"></div>
            <a href="#">Registrarme</a>
          </form>
        </div>
      )}
    </>
  );
}
