type JsonLdNode = Record<string, unknown>;
type JsonLdProps = { data: JsonLdNode | JsonLdNode[] };

function stripContext(node: JsonLdNode): JsonLdNode {
  const { ['@context']: _context, ...rest } = node;
  return rest;
}

export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? {
        '@context': 'https://schema.org',
        '@graph': data.map(stripContext),
      }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  );
}
