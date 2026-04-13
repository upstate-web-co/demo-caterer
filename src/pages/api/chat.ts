import type { APIContext } from 'astro'
import { SITE, MENUS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a full-service catering company in ${SITE.location}.

MENUS:
${MENUS.map(m => `- ${m.name} (${m.type}): ${m.price} — ${m.description}`).join('\n')}

DETAILS:
- Serves Greenville, Spartanburg, Anderson, Clemson, Asheville. Travel fee for 45+ min.
- All menus customizable. Dietary accommodations (GF, vegan, allergies) on every menu.
- Setup + serving staff + cleanup included in all packages.
- Book 2-4 weeks minimum. Weddings: 3-6 months recommended.
- Tastings available for events over 75 guests.
- Contact: ${SITE.email}, ${SITE.phone}

RULES: Be warm, knowledgeable about food, enthusiastic. 2-3 sentences. For specific quotes, direct to the inquiry form.`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message } = await request.json()
    if (!message) return Response.json({ reply: 'What can I help you with? Ask about menus, pricing, dietary options, or how to book!' })
    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY
    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('budget')) return Response.json({ reply: `Our menus range from $25/person (cocktail reception) to $65/person (upscale plated). Most events land between $35-55/person. Fill out the inquiry form for a custom quote based on your guest count and menu preferences!` })
      if (lower.includes('bbq') || lower.includes('southern') || lower.includes('pulled pork')) return Response.json({ reply: `Our Classic Southern menu starts at $35/person — slow-smoked pulled pork, mac and cheese, collard greens, cornbread, and banana pudding. It's our most-requested for outdoor events and casual celebrations!` })
      if (lower.includes('gluten') || lower.includes('vegan') || lower.includes('allerg') || lower.includes('diet')) return Response.json({ reply: `Every menu can be adapted for dietary needs — gluten-free, vegan, nut-free, you name it. Just note it in the inquiry form and we'll build the menu around your guests' needs.` })
      if (lower.includes('wedding')) return Response.json({ reply: `We love weddings! Most couples choose our Farm-to-Table ($55/person) or Upscale Plated ($65/person) menus. We recommend booking 3-6 months out. Tastings available for events over 75 guests.` })
      if (lower.includes('how far') || lower.includes('advance') || lower.includes('book')) return Response.json({ reply: `For most events, 2-4 weeks minimum. For weddings, we recommend 3-6 months. The sooner you reach out, the more flexibility we have with menus and dates.` })
      return Response.json({ reply: `I can help with menu options, pricing, dietary accommodations, or booking timelines. For a custom quote, fill out the inquiry form — we respond within 24 hours!` })
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'Not sure — fill out the inquiry form and we\'ll help!' })
  } catch { return Response.json({ reply: 'Something went wrong. Email us at ' + SITE.email }) }
}
