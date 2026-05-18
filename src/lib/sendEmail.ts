import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReservationEmail({
  to,
  type,
  duvod = '',
}: {
  to: string;
  type: 'approved' | 'rejected';
  duvod?: string;
}) {
  // Načti šablonu
  const templatePath = path.join(
    process.cwd(),
    'src',
    'emails',
    type === 'approved'
      ? 'approved_reservation.txt'
      : 'rejected_reservation.txt'
  );
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Nahraď {{duvod}} pokud je potřeba
  if (type === 'rejected') {
    template = template.replace('{{duvod}}', duvod || '');
  }

  // Odděl předmět a tělo
  const [subjectLine, ...bodyLines] = template.split('\n');
  const subject = subjectLine.replace('Předmět: ', '').trim();
  const text = bodyLines.join('\n').trim();

  // Odeslání emailu
  await resend.emails.send({
    from: 'info@jirakovaiva.cz',
    to,
    subject,
    text,
  });
} 