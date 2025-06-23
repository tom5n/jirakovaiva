import React, { useEffect } from 'react';

const posts = [
  {
    url: 'https://www.instagram.com/p/DJEiG6WsfoO/',
    img: 'https://www.instagram.com/p/DJEiG6WsfoO/media/?size=l',
  },
  {
    url: 'https://www.instagram.com/p/DIi1THZMXxE/',
    img: 'https://www.instagram.com/p/DIi1THZMXxE/media/?size=l',
  },
  {
    url: 'https://www.instagram.com/p/DFFqMUZspru/?img_index=1',
    img: 'https://www.instagram.com/p/DFFqMUZspru/media/?size=l',
  },
  {
    url: 'https://www.instagram.com/p/DJWA1maMYnV/',
    img: 'https://www.instagram.com/p/DJWA1maMYnV/media/?size=l',
  },
  {
    url: 'https://www.instagram.com/p/DJSAbelMqM2/?img_index=1',
    img: 'https://www.instagram.com/p/DJSAbelMqM2/media/?size=l',
  },
  {
    url: 'https://www.instagram.com/p/DJO_25Usar4/',
    img: 'https://www.instagram.com/p/DJO_25Usar4/media/?size=l',
  },
];

const InstagramFeed = () => {
  useEffect(() => {
    // Přidání Elfsight scriptu pouze jednou
    const scriptId = 'elfsight-platform-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="instagram" className="pt-24 pb-16 bg-white">
      <div className="container max-w-[90rem] mx-auto">
        <h2 className="section-title mx-auto reveal block text-[#21435F] text-center mb-16">
          Sledujte mě na Instagramu
        </h2>
        <div className="elfsight-app-6ef6f2fc-6599-43ff-86f0-03278cb3246a" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
};

export default InstagramFeed; 