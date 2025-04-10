const Login = require('../../use-cases/auth/login');

class AuthController {
  constructor(userRepository) {
    this.loginUseCase = new Login(userRepository); // Cambia 'login' por 'loginUseCase'
  }

  async login(req, res) {
    try {
      const { token } = await this.loginUseCase.execute(req.body); // Usa 'loginUseCase'
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;