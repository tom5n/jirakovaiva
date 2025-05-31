import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  children?: React.ReactNode;
}

export default function SeoHead({
  title = 'Ivana Jiráková – Kosmetika, FARMASI, rezervace a registrace',
  description = 'Objednejte se na kosmetiku, registrujte se do FARMASI nebo mě kontaktujte. Moderní salon, osobní přístup a exkluzivní benefity.',
  url = 'https://www.jirakovaiva.cz/',
  image = 'https://www.jirakovaiva.cz/og-image.jpg',
  children,
}: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="kosmetika, FARMASI, registrace, rezervace, Ivana Jiráková, salon, péče o pleť, slevy, benefity" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="cs_CZ" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#21435F" />
      <html lang="cs" />
      {/* Strukturovaná data (příklad pro firmu) */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "name": "Ivana Jiráková",
          "url": "https://www.jirakovaiva.cz/",
          "logo": "https://www.jirakovaiva.cz/logo.png",
          "image": "https://www.jirakovaiva.cz/og-image.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Praha",
            "addressCountry": "CZ"
          },
          "description": "Objednejte se na kosmetiku, registrujte se do FARMASI nebo mě kontaktujte. Moderní salon, osobní přístup a exkluzivní benefity.",
          "telephone": "+420 123 456 789"
        }
      `}</script>
      <meta name="google-site-verification" content="TVUJ_GOOGLE_OVEROVACI_KOD" />
      {children}
    </Helmet>
  );
} 