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

    const { name, email, subject, message } = body;

    const response = await resend.emails.send({
      from: 'Kontaktní formulář <info@jirakovaiva.cz>',
      to: 'info@jirakovaiva.cz',
      subject: subject ? `Nová zpráva z kontaktního formuláře - ${subject}` : 'Nová zpráva z kontaktního formuláře',
      html: `
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>Nová zpráva z kontaktního formuláře</title>
        </head>
        <body style="margin:0; padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; border-radius:16px; box-shadow:0 2px 8px #0001; overflow:hidden; outline:2px solid #21435F; outline-offset:0;">
                  <tr>
                    <td style="background:#FFF5F0; padding:24px 32px 12px 32px; text-align:center;">
                      <h2 style="color:#21435F; font-family:'Montserrat',Arial,sans-serif; margin:0; font-size:22px; white-space:nowrap;">Nová zpráva z kontaktního formuláře</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#fff; padding:24px 32px 32px 32px; color:#333; font-family:Arial,sans-serif; font-size:16px;">
                      <p style="margin:0 0 16px 0;"><strong>Jméno a příjmení:</strong> ${name}</p>
                      <p style="margin:0 0 16px 0;"><strong>Email:</strong> ${email}</p>
                      ${subject ? `<p style='margin:0 0 16px 0;'><strong>Předmět:</strong> ${subject}</p>` : ''}
                      <p style="margin:0 0 8px 0;"><strong>Zpráva:</strong></p>
                      <div style="background:#FFE3D6; border-radius:8px; padding:16px; color:#21435F; font-size:16px;">
                        ${message}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#FFD1C1; color:#21435F; text-align:center; font-size:13px; padding:12px 32px;">
                      <em>Tento email byl odeslán z webu www.jirakovaiva.cz</em>
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