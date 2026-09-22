import { siteConfig } from '@/lib/site';

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export const organizationEntity = {
  '@type': 'Organization',
  '@id': organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: `${siteConfig.url}/`,
  email: siteConfig.contactEmail,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: siteConfig.contactEmail,
    availableLanguage: ['English'],
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  ...organizationEntity,
};

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
