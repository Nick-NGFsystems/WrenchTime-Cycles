export type NgfSiteContent = Record<string, string>

function getDomain() {
  return process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'
}

export async function getNgfContent(): Promise<NgfSiteContent> {
  try {
    const url = `${process.env.NGF_APP_URL || 'https://app.ngfsystems.com'}/api/public/content?domain=${encodeURIComponent(getDomain().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, ''))}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return {}

    const data = (await res.json()) as { content?: NgfSiteContent }
    return data.content ?? {}
  } catch {
    return {}
  }
}