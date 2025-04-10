const ApprovalHandler = require('./approval-handler');

class AdminHandler extends ApprovalHandler {
  async handle({ inscripcion, userRole }) {
    if (userRole !== 'administrador') {
      throw new Error('Solo un administrador puede finalizar la aprobación');
    }
    inscripcion.aprobaciones = inscripcion.aprobaciones || [];
    if (!inscripcion.aprobaciones.includes('administrador')) {
      inscripcion.aprobaciones.push('administrador');
    }
    if (inscripcion.aprobaciones.length === 2) { // Ambos aprobaron
      inscripcion.estado = 'aprobada';
    }
    return inscripcion;
  }
}

module.exports = AdminHandler;