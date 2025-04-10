const EmailService = require('../../infrastructure/notifications/email-service');
const CoordinatorHandler = require('../../domain/approval-chain/coordinator-handler');
const AdminHandler = require('../../domain/approval-chain/admin-handler');
const mongoose = require('mongoose');

class UpdateInscripcionState {
  constructor(inscripcionRepository, convocatoriaRepository) {
    this.inscripcionRepository = inscripcionRepository;
    this.convocatoriaRepository = convocatoriaRepository;
    this.emailService = EmailService;
    this.coordinatorHandler = new CoordinatorHandler();
    this.adminHandler = new AdminHandler();
    this.coordinatorHandler.setNext(this.adminHandler);
  }

  async execute({ id, estado, userRole }) {
   
    if (!['aprobada', 'rechazada'].includes(estado)) {
      throw new Error('Estado inválido. Use "aprobada" o "rechazada"');
    }
    const inscripcion = await this.inscripcionRepository.findById(id);
    if (!inscripcion) {
      throw new Error('Inscripción no encontrada');
    }

    if (estado === 'aprobada') {
      const convocatoria = await this.convocatoriaRepository.findById(inscripcion.convocatoriaId);
      const aprobadas = await this.inscripcionRepository.countAprobadas(convocatoria._id);
      if (aprobadas >= convocatoria.cupos) {
        throw new Error('No hay cupos disponibles');
      }
      await this.coordinatorHandler.handle({ inscripcion, userRole });
    } else {
      inscripcion.estado = 'rechazada';
    }

    const updatedInscripcion = await this.inscripcionRepository.update(inscripcion);

    const subject = `Estado de tu inscripción: ${updatedInscripcion.estado}`;
    const text = `Hola ${inscripcion.nombre}, tu inscripción ha sido ${updatedInscripcion.estado}.`;
    await this.emailService.sendNotification(inscripcion.email, subject, text);

    return updatedInscripcion;
  }
}

module.exports = UpdateInscripcionState;