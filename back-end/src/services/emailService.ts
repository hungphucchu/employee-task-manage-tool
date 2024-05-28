// src/mailer.ts
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private static transporter: Transporter;

  constructor() {
    if (!EmailService.transporter) {
      EmailService.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Verify the connection configuration
      EmailService.transporter.verify((error, success) => {
        if (error) {
          console.error('Error configuring the transporter:', error);
        } else {
          console.log('Mailer is ready to send emails');
        }
      });
    }
  }

  public async sendEmail(options: MailOptions) {
    try {
      const info = await EmailService.transporter.sendMail(options);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
