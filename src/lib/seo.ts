export const SITE_URL = "https://www.weinsureflhomes.com";

export function seoHead(title: string, description: string, path: string) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const agencySchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${SITE_URL}/#agency`,
  name: "Pablo Taquechel · We Insure Miami",
  url: `${SITE_URL}/`,
  telephone: "+1-305-259-1910",
  email: "pablo.taquechel@weinsuregroup.com",
  image: `${SITE_URL}/pablo-headshot.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "10749 SW 104 Street",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33176",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Florida" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};
