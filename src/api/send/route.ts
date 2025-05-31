import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Kontaktní formulář <info@jirakovaiva.cz>',
      to: 'info@jirakovaiva.cz',
      subject: 'Nová zpráva z kontaktního formuláře',
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno a příjmení:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 