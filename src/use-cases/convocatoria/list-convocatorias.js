class ListConvocatorias {
    constructor(convocatoriaRepository) {
      this.convocatoriaRepository = convocatoriaRepository;
    }
  
    async execute() {
      return await this.convocatoriaRepository.findAll();
    }
  }
  
  module.exports = ListConvocatorias;