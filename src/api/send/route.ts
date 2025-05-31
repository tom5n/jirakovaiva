import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const response = await resend.emails.send({
      from: 'Kontaktní formulář <info@jirakovaiva.cz>',
      to: 'info@jirakovaiva.cz',
      subject: subject ? `Nová zpráva z kontaktního formuláře - ${subject}` : 'Nová zpráva z kontaktního formuláře',
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno a příjmení:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Předmět:</strong> ${subject}</p>` : ''}
        <p><strong>Zpráva:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Něco se pokazilo při odesílání emailu' },
      { status: 500 }
    );
  }
} 