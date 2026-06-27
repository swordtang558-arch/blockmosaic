// Injects a JSON-LD <script>. Server-rendered so structured data is in the
// initial HTML for crawlers. `data` is any Schema.org object from lib/jsonld.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
