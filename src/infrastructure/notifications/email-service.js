const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Usa el servicio que prefieras (Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Tu email
        pass: process.env.EMAIL_PASS, // Contraseña o App Password si usas Gmail
      },
    });
  }

  async sendNotification(to, subject, text) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();