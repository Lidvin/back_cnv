const RegisterInscripcion = require('../../use-cases/inscripcion/register-inscripcion');
const UpdateInscripcionState = require('../../use-cases/inscripcion/update-inscripcion-state');
const convocatoriaRepository = require('../../infrastructure/repositories/convocatoria-repository');
const inscripcionRepository = require('../../infrastructure/repositories/inscripcion-repository');

class InscripcionController {
  constructor(inscripcionRepo) { // Cambié el nombre para evitar confusión
    this.inscripcionRepository = inscripcionRepo; // Asignamos el parámetro recibido
    this.registerInscripcion = new RegisterInscripcion(inscripcionRepo);
    this.updateInscripcionState = new UpdateInscripcionState(inscripcionRepo, convocatoriaRepository);
  }

  async register(req, res) {
    try {
      const inscripcion = await this.registerInscripcion.execute(req.body);
      res.status(201).json(inscripcion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateState(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const userRole = req.userRole || 'coordinador'; // Simulado
      const inscripcion = await this.updateInscripcionState.execute({ id, estado, userRole });
      res.status(200).json(inscripcion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = InscripcionController;