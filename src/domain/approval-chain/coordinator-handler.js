const ApprovalHandler = require('./approval-handler');

class CoordinatorHandler extends ApprovalHandler {
  async handle({ inscripcion, userRole }) {
    if (userRole !== 'coordinador') {
      throw new Error('Solo un coordinador puede iniciar la aprobación');
    }
    inscripcion.aprobaciones = inscripcion.aprobaciones || [];
    if (!inscripcion.aprobaciones.includes('coordinador')) {
      inscripcion.aprobaciones.push('coordinador');
    }
    return await super.handle({ inscripcion, userRole });
  }
}

module.exports = CoordinatorHandler;