import type { Transporter } from "nodemailer";
import { createTransport } from "nodemailer";
import { PASS_EMAIL_SENDER, USER_EMAIL_SENDER } from "../../constants/env";

// Creamos el transporter una sola vez
const transporter: Transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: USER_EMAIL_SENDER,
    pass: PASS_EMAIL_SENDER,
  },
});

/**
 * Envía un correo de "Olvidé mi contraseña"
 * @param toEmail Email del destinatario
 * @param resetLink Link para restablecer la contraseña
 */
export async function sendForgotPasswordEmail(
  toEmail: string,
  resetLink: string
): Promise<void> {
  const info = await transporter.sendMail({
    from: `"Soporte SpotParking" <${USER_EMAIL_SENDER}>`,
    to: toEmail,
    subject: "Olvidé mi contraseña",
    text: `Hola, para restablecer tu contraseña visita el siguiente enlace: ${resetLink}`,
    html: `
      <h3>Restablecer contraseña</h3>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Si no solicitaste esto, puedes ignorar este correo.</p>
    `,
  });

  console.log(`Correo enviado a ${toEmail}: ${info.messageId}`);
}
export async function sendWelcomeEmail(toEmail: string, userName: string): Promise<void> {
  const info = await transporter.sendMail({
    from: `"Soporte SpotParking" <${USER_EMAIL_SENDER}>`,
    to: toEmail,
    subject: "¡Bienvenido a SpotParking!",
    text: `Hola ${userName}, gracias por unirte a SpotParking. ¡Estamos felices de tenerte con nosotros!`,
    html: `
      <h2>Bienvenido a SpotParking, ${userName}!</h2>
      <p>Gracias por registrarte. Estamos encantados de que formes parte de nuestra comunidad.</p>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <br/>
      <p>Saludos,<br/>El equipo de SpotParking</p>
    `,
  });

  console.log(`Correo de bienvenida enviado a ${toEmail}: ${info.messageId}`);
}