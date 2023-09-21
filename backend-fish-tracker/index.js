const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/add', async (req, res) => {
  const formData = req.body;
  const valorEnvio = formData.envio; // Obtener el valor de "envio"
  console.log(valorEnvio); // Imprimir el valor de "envio" en la consola

  // Debes enviar una respuesta para que la solicitud no se quede colgada
  res.json({ mensaje: `Valor de envio: ${valorEnvio}` });
});

// Resto de tu código...  

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
