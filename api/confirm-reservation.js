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
      to: email,
      subject: 'Vaše rezervace schůzky byla potvrzena',
      html: `
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>Rezervace schůzky byla potvrzena</title>
        </head>
        <body style="margin:0; padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; border-radius:16px; box-shadow:0 2px 8px #0001; overflow:hidden; outline:2px solid #21435F; outline-offset:0;">
                  <tr>
                    <td style="background:#FFF5F0; padding:24px 32px 12px 32px; text-align:center;">
                      <h2 style="color:#21435F; font-family:'Montserrat',Arial,sans-serif; margin:0; font-size:22px; white-space:nowrap; text-transform:uppercase;">
                        Rezervace schůzky byla <span style=\"font-weight:bold;\">POTVRZENA</span>
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#fff; padding:24px 32px 32px 32px; color:#333; font-family:Arial,sans-serif; font-size:16px;">
                      <div style="background:#FFE3D6; border-radius:8px; padding:16px; color:#21435F; font-size:16px; margin-bottom:24px;">
                        Vaše rezervace byla potvrzena. Těším se na setkání!<br>
                        V případě jakýchkoliv změn Vás budu kontaktovat na uvedený email nebo telefon.
                      </div>
                      <p style="margin:0 0 16px 0;"><strong>Jméno:</strong> <span style="color:#21435F;">${firstName} ${lastName}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Email:</strong> <span style="color:#21435F;">${email}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Telefon:</strong> <span style="color:#21435F;">${phone}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Datum schůzky:</strong> <span style="color:#21435F;">${date}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 24px 0;"><strong>Čas schůzky:</strong> <span style="color:#21435F;">${time}</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#FFD1C1; color:#21435F; text-align:center; font-size:14px; padding:16px 32px;">
                      Pokud potřebujete rezervaci změnit nebo zrušit, kontaktujte mě prosím odpovědí na tento email.
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