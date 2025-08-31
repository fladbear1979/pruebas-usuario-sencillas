// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static('public')); // Static files served from 'public' directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost/pruebas_usuario', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Exit the process with failure
  });

// Route for serving the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Send the main HTML file
});

// Route to receive and save user comments
app.post('/api/comentarios', (req, res) => {
  // Check if the request body is JSON
  if (typeof req.body !== 'object') {
    return res.status(400).send('Entrada inválida'); // Respond with an error for invalid JSON
  }
  // Check if comment is present in the request body
  if (!req.body.comment) {
    return res.status(400).send('Comentario es requerido'); // Respond with an error if the comment is missing
  }
  // Log the received comment for debugging purposes
  console.log(req.body); // Log the received comment
  res.status(201).send('Comentario recibido'); // Respond with confirmation
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Log server startup
});