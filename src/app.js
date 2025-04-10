require('dotenv').config(); // Cargar variables de entorno primero
console.log('MONGO_URI:', process.env.MONGO_URI); // Depuración

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const convocatoriaRoutes = require('./interfaces/routes/convocatoria-routes');
const authRoutes = require('./interfaces/routes/auth-routes');
const inscripcionRoutes = require('./interfaces/routes/inscripcion-routes');

const app = express();
app.use(express.json());

// Conexión a MongoDB sin opciones obsoletas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api', authRoutes);
app.use('/api', convocatoriaRoutes);
app.use('/api', inscripcionRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});