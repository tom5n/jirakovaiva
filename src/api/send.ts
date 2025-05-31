import { resend } from '@/lib/resend';

export async function sendEmail(data: { name: string; email: string; phone: string; message: string }) {
  try {
    const response = await resend.emails.send({
      from: 'Kontaktní formulář <info@jirakovaiva.cz>',
      to: 'info@jirakovaiva.cz',
      subject: 'Nová zpráva z kontaktního formuláře',
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno a příjmení:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return response;
  } catch (error) {
    throw error;
  }
} 