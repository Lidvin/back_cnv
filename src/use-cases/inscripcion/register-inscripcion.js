const Inscripcion = require('../../domain/entities/inscripcion');

class RegisterInscripcion {
  constructor(inscripcionRepository) {
    this.inscripcionRepository = inscripcionRepository;
  }

  async execute(data) {
    const inscripcion = new Inscripcion(data);
    return await this.inscripcionRepository.save(inscripcion);
  }
}

module.exports = RegisterInscripcion;