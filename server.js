const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));

// Ruta para el formulario
app.post('/enviar-formulario', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  // Configura tu transporte SMTP aquí
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia esto si usas otro servicio
    auth: {
      user: 'TU_EMAIL@gmail.com', // Cambia por tu email
      pass: 'TU_CONTRASEÑA', // Cambia por tu contraseña o app password
    },
  });

  const mailOptions = {
    from: email,
    to: 'info@insitubroker.com',
    subject: `Nuevo mensaje de contacto de ${nombre}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('<script>alert("Mensaje enviado correctamente. ¡Gracias por contactarnos!"); window.location.href="/index.html";</script>');
  } catch (error) {
    res.send('<script>alert("Hubo un error al enviar el mensaje. Intenta nuevamente más tarde."); window.location.href="/contacto.html";</script>');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
}); 