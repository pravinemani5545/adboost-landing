// Schema.org JSON-LD builders. Keep page frontmatter clean and consistent.
// All take an absolute `base` (from siteBase(Astro.site)).

const ORG_ID = (base: string) => `${base}/#org`;

export function organizationNode(base: string) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID(base),
    name: 'AdBoost Health',
    url: `${base}/`,
    logo: { '@type': 'ImageObject', url: `${base}/logos/adboost-mark.png` },
    email: 'hello@adboost.health',
    description: 'Growth marketing built exclusively for health, telehealth, GLP-1, supplement & wellness brands.',
    address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressCountry: 'CA' },
    areaServed: 'US',
    founder: [
      { '@type': 'Person', name: 'Amir Salihovic', sameAs: ['https://www.linkedin.com/in/amir-salihovic-7b2844157/'] },
      { '@type': 'Person', name: 'Pira Ahilan', sameAs: ['https://www.linkedin.com/in/piraahilan/'] },
    ],
    knowsAbout: ['health marketing', 'telehealth advertising', 'GLP-1 advertising compliance', 'paid media', 'CAC optimization'],
    // TODO: add LinkedIn company page URL to sameAs when confirmed
    sameAs: [] as string[],
  };
}

export function breadcrumb(base: string, items: { label: string; href?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${base}${it.href}` } : {}),
    })),
  };
}

export function faqPage(qa: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function serviceNode(base: string, opts: { name: string; description: string; path: string; area?: string }) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${base}${opts.path}`,
    serviceType: opts.name,
    provider: { '@id': ORG_ID(base) },
    areaServed: opts.area ?? 'US',
    audience: { '@type': 'Audience', audienceType: 'Health, telehealth, supplement and wellness brands' },
  };
}

export function definedTerm(base: string, opts: { term: string; description: string; path: string }) {
  return {
    '@type': 'DefinedTerm',
    name: opts.term,
    description: opts.description,
    url: `${base}${opts.path}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'AdBoost Health - Health & Performance Marketing Glossary',
      url: `${base}/glossary/`,
    },
  };
}

export function articleNode(base: string, opts: {
  headline: string; description: string; path: string; datePublished: string; dateModified?: string;
  author?: string; authorPath?: string; image?: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${base}${opts.path}`,
    mainEntityOfPage: `${base}${opts.path}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      '@type': 'Person',
      name: opts.author ?? 'Amir Salihovic',
      ...(opts.authorPath ? { url: `${base}${opts.authorPath}` } : {}),
    },
    publisher: { '@id': ORG_ID(base) },
    ...(opts.image ? { image: opts.image.startsWith('http') ? opts.image : `${base}${opts.image}` } : {}),
  };
}

export function datasetNode(base: string, opts: { name: string; description: string; path: string; dateModified: string }) {
  return {
    '@type': 'Dataset',
    name: opts.name,
    description: opts.description,
    url: `${base}${opts.path}`,
    creator: { '@id': ORG_ID(base) },
    dateModified: opts.dateModified,
    license: `${base}/`,
    isAccessibleForFree: true,
  };
}

export function personNode(base: string, opts: {
  name: string; jobTitle: string; path: string; bio: string; image?: string; sameAs?: string[];
}) {
  const frag = opts.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    '@type': 'Person',
    '@id': `${base}${opts.path}#${frag}`,
    name: opts.name,
    jobTitle: opts.jobTitle,
    url: `${base}${opts.path}`,
    description: opts.bio,
    worksFor: { '@id': ORG_ID(base) },
    ...(opts.image ? { image: `${base}${opts.image}` } : {}),
    ...(opts.sameAs && opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
  };
}
