const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema({
  convocatoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Convocatoria', required: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  estado: { type: String, default: 'pendiente' },
  aprobaciones: [{ type: String }],
  fechaInscripcion: { type: Date, default: Date.now },
});

const InscripcionModel = mongoose.model('Inscripcion', inscripcionSchema);

class InscripcionRepository {
  async save(inscripcion) {
    const newInscripcion = new InscripcionModel(inscripcion);
    return await newInscripcion.save();
  }

  async findById(id) {
    return await InscripcionModel.findById(id);
  }

  async update(inscripcion) {
    return await InscripcionModel.findByIdAndUpdate(
      inscripcion._id,
      { estado: inscripcion.estado, aprobaciones: inscripcion.aprobaciones },
      { new: true }
    );
  }

  async countAprobadas(convocatoriaId) {
    return await InscripcionModel.countDocuments({ convocatoriaId, estado: 'aprobada' });
  }
}

module.exports = new InscripcionRepository();