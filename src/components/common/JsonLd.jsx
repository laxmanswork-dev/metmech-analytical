// Embeds schema.org structured data. `data` may be null, in which case nothing renders.
export default function JsonLd({ data }) {
  if (!data) return null
  // "<" is escaped so the JSON can never close the script element early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
