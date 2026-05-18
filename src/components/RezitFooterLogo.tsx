const RezitFooterLogo = () => (
  <a
    href="https://www.rezit.cz"
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-block"
    aria-label="Rezit – rezit.cz"
  >
    <span className="relative inline-block">
      <img
        src="/images/rezit/rezitsignature1light.webp"
        alt="Rezit"
        className="h-7 md:h-8 w-auto block transition-opacity duration-300 group-hover:opacity-0"
      />
      <img
        src="/images/rezit/rezitsignature2light.webp"
        alt=""
        aria-hidden
        className="h-7 md:h-8 w-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  </a>
);

export default RezitFooterLogo;
