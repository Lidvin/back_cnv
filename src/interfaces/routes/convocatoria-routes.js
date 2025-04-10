const express = require('express');
const ConvocatoriaController = require('../controllers/convocatoria-controller');
const authMiddleware = require('../middleware/auth');
const convocatoriaRepository = require('../../infrastructure/repositories/convocatoria-repository');

const router = express.Router();
const controller = new ConvocatoriaController(convocatoriaRepository);

router.post('/convocatorias', authMiddleware, controller.create.bind(controller));
router.get('/convocatorias', authMiddleware, controller.list.bind(controller));

module.exports = router;