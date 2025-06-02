import { Resend } from 'resend';

export const config = {
  api: {
    bodyParser: true,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const { firstName, lastName, email, phone, date, time } = body;

    const response = await resend.emails.send({
      from: 'Rezervace <info@jirakovaiva.cz>',
      to: 'jirakovaiva@seznam.cz',
      subject: 'Nová rezervace schůzky čeká na schválení',
      html: `
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>Nová rezervace schůzky</title>
        </head>
        <body style="margin:0; padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; border-radius:16px; box-shadow:0 2px 8px #0001; overflow:hidden; outline:2px solid #21435F; outline-offset:0;">
                  <tr>
                    <td style="background:#FFF5F0; padding:24px 32px 12px 32px; text-align:center;">
                      <h2 style="color:#21435F; font-family:'Montserrat',Arial,sans-serif; margin:0; font-size:22px; white-space:nowrap; text-transform:uppercase;">Nová rezervace schůzky</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#fff; padding:24px 32px 32px 32px; color:#333; font-family:Arial,sans-serif; font-size:16px;">
                      <p style="margin:0 0 16px 0;"><strong>Jméno:</strong> <span style="color:#21435F;">${firstName} ${lastName}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Email:</strong> <span style="color:#21435F;">${email}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Telefon:</strong> <span style="color:#21435F;">${phone}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Datum schůzky:</strong> <span style="color:#21435F;">${date}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 24px 0;"><strong>Čas schůzky:</strong> <span style="color:#21435F;">${time}</span></p>
                      <a href="https://www.jirakovaiva.cz/admin" style="background:#21435F; color:#fff; text-decoration:none; padding:16px 0; border-radius:8px; font-size:16px; font-family:'Montserrat',Arial,sans-serif; display:block; width:100%; text-align:center; margin:32px 0 0 0; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">OTEVŘÍT ADMINISTRACI</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#FFD1C1; color:#21435F; text-align:center; font-size:14px; padding:16px 32px;">
                      Tato rezervace čeká na vaše schválení v administraci.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Něco se pokazilo při odesílání emailu' });
  }
} 