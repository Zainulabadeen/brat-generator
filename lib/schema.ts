import { siteConfig } from '@/lib/site';

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;
export const logoId = `${siteConfig.url}/#logo`;

export const organizationRef = { '@id': organizationId } as const;
export const websiteRef = { '@id': websiteId } as const;

export const organizationEntity = {
  '@type': 'Organization',
  '@id': organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: `${siteConfig.url}/`,
  email: siteConfig.contactEmail,
  logo: {
    '@type': 'ImageObject',
    '@id': logoId,
    url: `${siteConfig.url}/icon-512.png`,
    contentUrl: `${siteConfig.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: { '@id': logoId },
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

export const websiteEntity = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteConfig.name,
  alternateName: [siteConfig.shortName, 'bratgeneratorpro.net'],
  url: `${siteConfig.url}/`,
  description: siteConfig.description,
  inLanguage: 'en-GB',
  publisher: organizationRef,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  ...websiteEntity,
};

export function breadcrumbId(pageUrl: string) {
  return `${pageUrl}#breadcrumb`;
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const pageUrl = items.at(-1)?.url || `${siteConfig.url}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(pageUrl),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type WebPageSchemaInput = {
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  url: string;
  name: string;
  description?: string | null;
  dateModified?: string;
  about?: { '@id': string };
  mainEntity?: { '@id': string };
  primaryImageUrl?: string;
  includeBreadcrumb?: boolean;
};

export function webPageSchema({
  type = 'WebPage',
  url,
  name,
  description,
  dateModified,
  about,
  mainEntity,
  primaryImageUrl = `${siteConfig.url}/og-image.png`,
  includeBreadcrumb = true,
}: WebPageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: 'en-GB',
    isPartOf: websiteRef,
    ...(includeBreadcrumb ? { breadcrumb: { '@id': breadcrumbId(url) } } : {}),
    ...(about ? { about } : {}),
    ...(mainEntity ? { mainEntity } : {}),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: primaryImageUrl,
    },
    ...(dateModified ? { dateModified } : {}),
  };
}

export function faqPageSchema(items: ReadonlyArray<readonly [string, string]>, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: `${pageUrl}#faq`,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${pageUrl}#webpage` },
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

type SoftwareApplicationSchemaInput = {
  id: string;
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
  browserRequirements: string;
  featureList?: string[];
};

export function softwareApplicationSchema({
  id,
  name,
  url,
  description,
  applicationCategory,
  browserRequirements,
  featureList = [],
}: SoftwareApplicationSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': id,
    name,
    url,
    applicationCategory,
    operatingSystem: 'Any',
    browserRequirements,
    description,
    provider: organizationRef,
    isAccessibleForFree: true,
    inLanguage: 'en-GB',
    image: `${siteConfig.url}/og-image.png`,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    ...(featureList.length ? { featureList } : {}),
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
    },
  };
}


type ImageObjectSchemaInput = {
  pageUrl: string;
  idSuffix: string;
  url: string;
  caption: string;
  description?: string;
  width?: number;
  height?: number;
};

export function imageObjectSchema({
  pageUrl,
  idSuffix,
  url,
  caption,
  description,
  width,
  height,
}: ImageObjectSchemaInput) {
  const absoluteUrl = url.startsWith('http') ? url : `${siteConfig.url}${url.startsWith('/') ? '' : '/'}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${pageUrl}#${idSuffix}`,
    url: absoluteUrl,
    contentUrl: absoluteUrl,
    caption,
    ...(description ? { description } : {}),
    inLanguage: 'en-GB',
    representativeOfPage: false,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
}
