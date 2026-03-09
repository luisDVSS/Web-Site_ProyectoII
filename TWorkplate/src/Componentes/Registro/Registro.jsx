import { useState } from "react";
import "./Registro.css";
import runingcat from "../../assets/Gifs/runingcat.gif";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  return (
    <>
      {isLoading ? (
        <div className="contenedor-registro">
          <h1>TWorkPlate&gt; Registro</h1>
          <h3>Registrando usuario..</h3>
          <img src={runingcat} alt="loading service" />
        </div>
      ) : (
        <div className="contenedor-registro">
          <h1>TWorkPlate&gt; Registro</h1>
          <form id="registro-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              required
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              required
              onChange={(e) => setApellido(e.target.value)}
            />
            <input
              type="date"
              placeholder="Edad"
              required
              onChange={(e) => setEdad(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              onChange={(e) => setContraseña(e.target.value)}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      )}
    </>
  );
}
