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

    const { name, surname, email, phone, street, zip, city, message } = body;

    // Odeslání emailu
    await resend.emails.send({
      from: 'Registrace <info@jirakovaiva.cz>',
      to: 'jirakovaiva@seznam.cz',
      subject: 'Nová registrace klienta',
      html: `
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>Nová registrace klienta</title>
        </head>
        <body style="margin:0; padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; border-radius:16px; box-shadow:0 2px 8px #0001; overflow:hidden; outline:2px solid #21435F; outline-offset:0;">
                  <tr>
                    <td style="background:#FFF5F0; padding:24px 32px 12px 32px; text-align:center;">
                      <h2 style="color:#21435F; font-family:'Montserrat',Arial,sans-serif; margin:0; font-size:22px; white-space:nowrap; text-transform:uppercase;">
                        NOVÁ REGISTRACE KLIENTA
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#fff; padding:24px 32px 32px 32px; color:#333; font-family:Arial,sans-serif; font-size:16px;">
                      <div style="background:#FFE3D6; border-radius:8px; padding:16px; color:#21435F; font-size:16px; margin-bottom:24px;">
                        Nový klient se chce registrovat do FARMASI. Níže jsou vyplněné údaje:
                      </div>
                      <p style="margin:0 0 16px 0;"><strong>Jméno:</strong> <span style="color:#21435F;">${name}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Příjmení:</strong> <span style="color:#21435F;">${surname}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>E-mail:</strong> <span style="color:#21435F;">${email}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Telefon:</strong> <span style="color:#21435F;">${phone}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Ulice:</strong> <span style="color:#21435F;">${street}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>PSČ:</strong> <span style="color:#21435F;">${zip}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 16px 0;"><strong>Město:</strong> <span style="color:#21435F;">${city}</span></p>
                      <hr style="border:none; border-top:1px solid #FFD1C1; margin:12px 0;">
                      <p style="margin:0 0 8px 0;"><strong>Zpráva:</strong></p>
                      <div style="background:#FFE3D6; border-radius:8px; padding:16px; color:#21435F; font-size:16px;">
                        ${message || ''}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#FFD1C1; color:#21435F; text-align:center; font-size:14px; padding:16px 32px;">
                      Tato registrace byla odeslána z webu www.jirakovaiva.cz
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Něco se pokazilo při zpracování registrace' });
  }
} 