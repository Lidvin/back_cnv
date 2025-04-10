class Inscripcion {
    constructor({ convocatoriaId, nombre, email, estado = 'pendiente' }) {
      if (!convocatoriaId || !nombre || !email) {
        throw new Error('Datos inválidos para la inscripción');
      }
      this.convocatoriaId = convocatoriaId;
      this.nombre = nombre;
      this.email = email;
      this.estado = estado; // Nuevo campo: pendiente, aprobada, rechazada
      this.fechaInscripcion = new Date();
    }
  }
  
  module.exports = Inscripcion;