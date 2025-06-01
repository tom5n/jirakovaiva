import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  children?: React.ReactNode;
}

export default function SeoHead({
  title = 'Ivana Jiráková | Podnikatelka & Mentorka',
  description = 'Jmenuji se Ivana Jiráková – jsem podnikatelka, mentorka a průvodkyně na cestě k finanční svobodě. Podnikám v oblasti přímého prodeje, kde působím jako TOP 1.',
  url = 'https://www.jirakovaiva.cz/',
  image = 'https://www.jirakovaiva.cz/og-image.jpg',
  children,
}: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Ivana Jiráková, Jiráková, podnikatelka, mentorka, finanční svoboda, přímý prodej, TOP 1, osobní rozvoj, podnikání, finanční nezávislost, osobní růst, business mentor, podnikatelské poradenství, FARMASI, FARMASI podnikání, FARMASI business, FARMASI mentoring, FARMASI poradenství, FARMASI registrace, FARMASI ambasadorka, přímý prodej poradenství" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:site_name" content="Ivana Jiráková" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jirakova_iva" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#21435F" />
      
      {/* Language */}
      <html lang="cs" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Ivana Jiráková",
          "url": "https://www.jirakovaiva.cz/",
          "logo": "https://www.jirakovaiva.cz/logo.png",
          "image": "https://www.jirakovaiva.cz/og-image.jpg",
          "jobTitle": "Podnikatelka & Mentorka",
          "description": "Jmenuji se Ivana Jiráková – jsem podnikatelka, mentorka a průvodkyně na cestě k finanční svobodě. Podnikám v oblasti přímého prodeje, kde působím jako TOP 1.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Praha",
            "addressCountry": "CZ"
          },
          "sameAs": [
            "https://www.instagram.com/jirakova_iva",
            "https://www.facebook.com/jirakovaiva",
            "https://www.linkedin.com/in/jirakovaiva"
          ],
          "knowsAbout": [
            "Podnikání",
            "FARMASI business",
            "Finanční svoboda",
            "Osobní rozvoj",
            "Mentoring",
            "Business strategie",
            "FARMASI poradenství",
            "Přímý prodej",
            "TOP 1 v oboru"
          ],
          "award": "TOP 1 v přímém prodeji"
        }
      `}</script>
      <meta name="google-site-verification" content="TVUJ_GOOGLE_OVEROVACI_KOD" />
      {children}
    </Helmet>
  );
} 