interface JsonLdProps {
  locale: string;
}

export function JsonLd({ locale }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PaintingContractor",
    name: "Eco Pintura",
    description:
      locale === "es"
        ? "Pintura ecológica profesional sin COV para hogares y negocios."
        : "Professional zero-VOC eco-friendly painting for homes and businesses.",
    url: "https://{{DOMAIN}}",
    telephone: "{{PHONE}}",
    email: "{{EMAIL}}",
    address: {
      "@type": "PostalAddress",
      streetAddress: "{{ADDRESS}}",
      addressLocality: "{{CITY}}",
      addressCountry: "ES",
    },
    areaServed: "{{SERVICE_AREA}}",
    sameAs: ["{{SOCIAL_INSTAGRAM}}", "{{SOCIAL_FACEBOOK}}", "{{SOCIAL_LINKEDIN}}"],
    priceRange: "$$",
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
