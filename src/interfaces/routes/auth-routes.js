const express = require('express');
const AuthController = require('../controllers/auth-controller');
const userRepository = require('../../infrastructure/repositories/user-repository');

const router = express.Router();
const controller = new AuthController(userRepository);

router.post('/login', controller.login.bind(controller));

module.exports = router;