const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/pruebas_usuario', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Exit the process with failure
  });

// Route for serving the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta para obtener y guardar comentarios de usuarios
app.post('/api/comentarios', (req, res) => {
  // Aquí se guardarían los comentarios en la base de datos
  console.log(req.body);
  res.status(201).send('Comentario recibido');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});