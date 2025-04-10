const CreateConvocatoria = require('../../use-cases/convocatoria/create-convocatoria');
const ListConvocatorias = require('../../use-cases/convocatoria/list-convocatorias');

class ConvocatoriaController {
  constructor(convocatoriaRepository) {
    this.createConvocatoria = new CreateConvocatoria(convocatoriaRepository);
    this.listConvocatorias = new ListConvocatorias(convocatoriaRepository);
  }

  async create(req, res) {
    try {
      const convocatoria = await this.createConvocatoria.execute(req.body);
      res.status(201).json(convocatoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const convocatorias = await this.listConvocatorias.execute();
      res.status(200).json(convocatorias);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ConvocatoriaController;