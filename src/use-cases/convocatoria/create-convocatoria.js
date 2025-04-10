const Convocatoria = require('../../domain/entities/convocatoria');

class CreateConvocatoria {
  constructor(convocatoriaRepository) {
    this.convocatoriaRepository = convocatoriaRepository;
  }

  async execute(data) {
    const convocatoria = new Convocatoria(data);
    return await this.convocatoriaRepository.save(convocatoria);
  }
}

module.exports = CreateConvocatoria;