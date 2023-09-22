const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(bodyParser.json());
// Configura CORS
app.use(cors());

const connection = require('./SQL_Conection');  

app.post('/test', async (req, res) => {
  console.log("joto"); 
});


app.post('/add', async (req, res) => {
  const formData = req.body;
  const valorEnvio = formData.Usuario; // Obtener el valor de "envio"
  console.log(valorEnvio); // Imprimir el valor de "envio" en la consola

  // Debes enviar una respuesta para que la solicitud no se quede colgada
  res.json({ mensaje: `Valor de envio: ${valorEnvio}` });
});

/*
const formData = {
  "Usuario": "Javier",
  "Clave": "admin"
};
*/



app.post('/api/login', (req, res) => {
  const formData = req.body;
 //const { Usuario, Clave } = req.body;
  const Usuario = formData.Usuario;
  const Clave = formData.Clave;
  // Realiza una consulta a la base de datos para verificar el inicio de sesión
  connection.query(
    'SELECT * FROM Usuarios WHERE Usuario = ? AND Clave = ?',
    [Usuario, Clave],
    (error, results, fields) => {
     // console.log("Enviados: "+Usuario +"\nClave"+ Clave);
      //console.log("Enviados: "+results[0].Usuario +"\nClave"+ results[0].Clave);
      if (error) {
        console.error('Error al verificar el inicio de sesión:', error);
        res.status(500).json({ mensaje: 'Error al verificar el inicio de sesión' });
      } else {
        if (results.length > 0) {
          // El inicio de sesión es exitoso, se encontró un usuario con las credenciales
          res.sendStatus(200);
          console.log("Simon");
        } 
        if (results.length == 0) {
          // Las credenciales no coinciden con ningún usuario
          res.sendStatus(401);
          console.log("NO");
          
        }
      }
    }
  );
});


//REGSITRO SIMULACIONES
app.post('/newSimulationInsert', (req, res) => {
  const nuevoRegistro = req.body; // El cuerpo de la solicitud debe contener los datos en formato JSON

  // Realiza la inserción en la base de datos
  connection.query('INSERT INTO RegistrosSimulaciones SET ?', nuevoRegistro, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar el registro:', error);
      res.status(500).json({ mensaje: 'Error al insertar el registro' });
    } else {
      console.log('Registro insertado con éxito');
      res.sendStatus(201);
      
    }
  });
});

app.delete('/eliminar-registro/:id', (req, res) => {
  const registroID = req.params.id; // Obtener el ID del parámetro de la URL

  // Realiza la eliminación en la base de datos
  connection.query('DELETE FROM RegistrosSimulaciones WHERE ID = ?', registroID, (error, results, fields) => {
    if (error) {
      console.error('Error al eliminar el registro:', error);
      res.status(500).json({ mensaje: 'Error al eliminar el registro' });
    } else {
      if (results.affectedRows > 0) {
        console.log('Registro eliminado con éxito');
        res.status(200).json({ mensaje: 'Registro eliminado con éxito' });
      } else {
        console.log('No se encontró el registro');
        res.status(404).json({ mensaje: 'No se encontró el registro' });
      }
    }
  });
});

// Endpoint para obtener todos los registros
app.get('/api/getTable', (req, res) => {
  // Realiza una consulta a la base de datos para obtener todos los registros
  connection.query('SELECT * FROM RegistrosSimulaciones', (error, results, fields) => {
    if (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ mensaje: 'Error al obtener los registros' });
    } else {
      // Enviar los resultados como respuesta en formato JSON
      res.json(results);
    }
  });
});


//test de prueba
app.get('/usuarios', (req, res) => {
  // Realiza una consulta a la base de datos para obtener todos los usuarios
  connection.query('SELECT * FROM Usuarios', (error, results, fields) => {
    if (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
    } else {
      // Enviar los resultados como respuesta en formato JSON
      res.json(results);
    }
  });
});




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
