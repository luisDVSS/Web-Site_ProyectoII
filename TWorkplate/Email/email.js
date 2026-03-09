import express from 'express';
import nodemailer from 'nodemailer'; //Importar el módulo Nodemailer para enviar correos electrónicos

import cors from 'cors'; //Importar el módulo CORS para manejar solicitudes de diferentes orígenes
const app= express(); //Crear una instancia de Express
app.use(cors()); //Habilitar CORS para todas las rutas
app.use(express.json()); //Habilitar el análisis de JSON en las solicitudes entrantes

//configuracion de Nodemailer para enviar correos a través de Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "tiphonneassistant7@gmail.com",
        pass: "hmic lkkj pffu wtlr"},
        tls: {
            rejectUnauthorized: false
        }
});
//Enpoint para enviar el correo
app.post("/send-email",async(req,res)=>{
    const {email,token} = req.body;
    const mailOptions = {
        from: "tiphonneassistant7@gmail.com",
        to: email,
        subject: "Recuperación de contraseña",
        text: `Hola, aquí está tu token para recuperar tu contraseña: ${token}`
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado correctamente" });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ message: "Error al enviar el correo" });
    }
});
const port = 3001;
app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});