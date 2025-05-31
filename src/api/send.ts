import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendEmail(data: { name: string; email: string; subject: string; message: string }) {
  try {
    const response = await resend.emails.send({
      from: 'Kontaktní formulář <info@jirakovaiva.cz>',
      to: 'info@jirakovaiva.cz',
      subject: data.subject ? `Nová zpráva z kontaktního formuláře - ${data.subject}` : 'Nová zpráva z kontaktního formuláře',
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno a příjmení:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.subject ? `<p><strong>Předmět:</strong> ${data.subject}</p>` : ''}
        <p><strong>Zpráva:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 