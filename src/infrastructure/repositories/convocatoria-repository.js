const mongoose = require('mongoose');

const convocatoriaSchema = new mongoose.Schema({
  titulo: String,
  fechaInicio: Date,
  fechaFin: Date,
  modalidad: String,
  cupos: Number,
});

const ConvocatoriaModel = mongoose.model('Convocatoria', convocatoriaSchema);

class ConvocatoriaRepository {
  async save(convocatoria) {
    const newConvocatoria = new ConvocatoriaModel(convocatoria);
    return await newConvocatoria.save();
  }

  async findAll() {
    return await ConvocatoriaModel.find();
  }

  async findById(id) {
    return await ConvocatoriaModel.findById(id);
  }
}

module.exports = new ConvocatoriaRepository();