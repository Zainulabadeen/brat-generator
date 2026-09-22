import { siteConfig } from '@/lib/site';

export const organizationId = `${siteConfig.url}/#organization`;

export const organizationEntity = {
  '@type': 'Organization',
  '@id': organizationId,
  name: siteConfig.name,
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
