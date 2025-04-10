class Convocatoria {
    constructor({ titulo, fechaInicio, fechaFin, modalidad, cupos }) {
      if (!titulo || !fechaInicio || !fechaFin || cupos <= 0) {
        throw new Error('Datos inválidos para la convocatoria');
      }
      this.titulo = titulo;
      this.fechaInicio = new Date(fechaInicio);
      this.fechaFin = new Date(fechaFin);
      this.modalidad = modalidad;
      this.cupos = cupos;
    }
  }
  
  module.exports = Convocatoria;