const express = require('express');
const InscripcionController = require('../controllers/inscripcion-controller');
const authMiddleware = require('../middleware/auth');
const inscripcionRepository = require('../../infrastructure/repositories/inscripcion-repository');

const router = express.Router();
const controller = new InscripcionController(inscripcionRepository);


router.post('/inscripciones', authMiddleware, controller.register.bind(controller));
router.patch('/inscripciones/:id/estado', authMiddleware, controller.updateState.bind(controller));

module.exports = router;