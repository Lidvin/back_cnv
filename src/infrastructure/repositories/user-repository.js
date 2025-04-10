const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // En producción, usa bcrypt
});

const UserModel = mongoose.model('User', userSchema);

class UserRepository {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

module.exports = new UserRepository();