export function extractDomain(url: string) {
  // Use a simple regex to extract the domain from the URL
  if (!url) return ''
  const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/)
  return match ? match[1] : ''
}
