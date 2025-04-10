const jwt = require('jsonwebtoken');

class Login {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== password) { // Simplificado, usa bcrypt en producción
      throw new Error('Credenciales inválidas');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
}

module.exports = Login;