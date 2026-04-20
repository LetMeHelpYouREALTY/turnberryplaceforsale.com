/**
 * Serialize JSON-LD for safe embedding in `<script type="application/ld+json">`.
 * Escapes U+2028 / U+2029 so the string cannot break script parsing in HTML.
 */
export function serializeJsonLd(data: unknown, pretty = false): string {
  const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
  return json.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
}
