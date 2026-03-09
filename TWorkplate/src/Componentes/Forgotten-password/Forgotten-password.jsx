import { useState } from "react";
import "./Forgotten-password.css";
function generateToken(lenght) {
  let token = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < lenght; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

function ForgottenPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = generateToken(20);
    console.log("Token generado:", token);
    alert(`Se ha enviado un correo a ${email} con el token: ${token}`);
  };

  return (
    <div className="contenedor-fgpswd">
      <h1>Olvide mi contraseña</h1>
      <form id="fgpswd-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
export default ForgottenPassword;
