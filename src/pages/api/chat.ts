import type { APIContext } from 'astro'
import { SITE, MENUS, EVENT_TYPES, TESTIMONIALS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a full-service catering company in ${SITE.location}.

IMPORTANT: This is a fictional demo business created by Upstate Web Co to showcase what a modern catering website can do. If asked, clarify this is a portfolio demonstration — not a real catering company.

=== MENU OPTIONS ===
${MENUS.map(m => `- ${m.name} (${m.type} style): ${m.price} — ${m.description}`).join('\n')}

=== EVENT TYPES WE CATER ===
${EVENT_TYPES.join(', ')}

=== SERVICE AREA & LOGISTICS ===
- Based in Greenville, SC. Serves Greenville, Spartanburg, Anderson, Clemson, and Asheville NC.
- Travel fee applies for venues more than 45 minutes from Greenville.
- All packages include setup, serving staff, and cleanup — clients don't lift a finger.
- Minimum guest counts: Classic Southern requires 50+ guests. Other menus start at 20 guests.
- All menus fully customizable. Dietary accommodations available on every menu: gluten-free, vegan, vegetarian, nut-free, dairy-free, and other allergies.

=== BOOKING & TIMELINE ===
- Most events: 2-4 weeks minimum lead time.
- Weddings: 3-6 months recommended to secure preferred date and menu tasting.
- Tastings available for events over 75 guests.
- Corporate clients can set up recurring event accounts.
- Holiday season (Nov-Dec) books fast — plan early.

=== PRICING OVERVIEW ===
- Budget-friendly: Taco & Nacho Bar from $28/person, Cocktail Reception from $25/person
- Mid-range: Classic Southern from $35/person, Brunch from $30/person
- Premium: Farm-to-Table from $55/person, Upscale Plated from $65/person
- Final pricing depends on guest count, menu customizations, venue distance, and service style.
- Custom quotes provided after completing the inquiry form.

=== WHAT CLIENTS SAY ===
${TESTIMONIALS.map(t => `"${t.quote}" — ${t.author} (${t.event})`).join('\n')}

=== CONTACT ===
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Location: ${SITE.location}
- Best way to start: Fill out the inquiry form on the website for a custom quote within 24 hours.

=== WHAT YOU CAN DO ===
- Answer questions about menus, pricing ranges, dietary accommodations, event types, service area, and booking timelines.
- Help visitors compare menu options and suggest the best fit for their event type and budget.
- Describe what's included in each menu package.

=== WHAT YOU CANNOT DO ===
- Process payments or accept deposits.
- Confirm availability for specific dates.
- Provide exact final pricing (depends on customizations and guest count).
- Make guarantees about menu items or seasonal availability.
- Book or schedule tastings — direct to the inquiry form.

TONE: Be warm, knowledgeable about food, and enthusiastic. Keep answers to 2-3 sentences. For specific quotes or date availability, direct to the inquiry form.

CART INTEGRATION:
When recommending specific menu packages, include [[ADD:Menu Name:Price]] after each recommendation so the user can add it to their cart directly. Example: "The Taco & Nacho Bar ($28/person) [[ADD:Taco & Nacho Bar:28]] is always a crowd-pleaser!"

BOOKING GUIDANCE:
If a user wants to book or get a quote, guide them conversationally:
- Ask about their event type, approximate guest count, date, and dietary needs
- Suggest menu options that fit their description
- Be proactive: "Would you like me to help you find the right menu?" or "I can walk you through our options — what kind of event are you planning?"`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message, history = [] } = await request.json() as { message?: string; history?: Array<{ role: string; content: string }> }
    if (!message) return Response.json({ reply: 'What can I help you with? Ask about menus, pricing, dietary options, event types, or how to book!' })
    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY
    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('budget') || lower.includes('afford'))
        return Response.json({ reply: `Our menus range from $25/person (cocktail reception) to $65/person (upscale plated). Most events land between $35-55/person depending on the menu and service style. Fill out the inquiry form with your guest count and preferences for a custom quote within 24 hours!` })
      if (lower.includes('bbq') || lower.includes('southern') || lower.includes('pulled pork') || lower.includes('mac and cheese') || lower.includes('comfort'))
        return Response.json({ reply: `Our Classic Southern menu starts at $35/person — slow-smoked pulled pork, mac and cheese, collard greens, cornbread, and banana pudding. It's our most-requested for outdoor events and casual celebrations. Requires a 50+ guest minimum.` })
      if (lower.includes('taco') || lower.includes('nacho') || lower.includes('mexican') || lower.includes('casual') || lower.includes('fun'))
        return Response.json({ reply: `The Taco & Nacho Bar is $28/person — 3 proteins, house-made salsas, all the fixings, chips and queso. It's interactive, fun, and always a crowd-pleaser. Great for birthdays, graduations, and casual corporate events!` })
      if (lower.includes('fancy') || lower.includes('plated') || lower.includes('upscale') || lower.includes('formal') || lower.includes('elegant') || lower.includes('salmon') || lower.includes('filet'))
        return Response.json({ reply: `Our Upscale Plated menu starts at $65/person — pan-seared salmon or filet, seasonal vegetables, artisan bread, and chef's choice dessert. Includes plated service with dedicated wait staff. Perfect for formal weddings and corporate galas.` })
      if (lower.includes('farm') || lower.includes('seasonal') || lower.includes('local') || lower.includes('organic'))
        return Response.json({ reply: `The Farm-to-Table menu starts at $55/person — built around what's in season from local farms, so it changes quarterly. Family-style service. Ask us what's available right now by filling out the inquiry form!` })
      if (lower.includes('brunch') || lower.includes('morning') || lower.includes('mimosa') || lower.includes('breakfast'))
        return Response.json({ reply: `Our Brunch menu starts at $30/person — biscuit bar, shrimp and grits, seasonal fruit, and a mimosa station. Perfect for morning weddings, bridal showers, and Sunday celebrations!` })
      if (lower.includes('cocktail') || lower.includes('appetizer') || lower.includes('hors d') || lower.includes('reception'))
        return Response.json({ reply: `The Cocktail Reception starts at $25/person — passed hors d'oeuvres, charcuterie displays, crostini, and mini desserts. Elegant and social, great for networking events, cocktail hours, and gallery openings.` })
      if (lower.includes('gluten') || lower.includes('vegan') || lower.includes('allerg') || lower.includes('diet') || lower.includes('vegetarian') || lower.includes('nut') || lower.includes('dairy'))
        return Response.json({ reply: `Every menu can be adapted for dietary needs — gluten-free, vegan, vegetarian, nut-free, dairy-free, you name it. Just note it in the inquiry form and we'll build the menu around your guests' needs. No extra charge for substitutions.` })
      if (lower.includes('wedding'))
        return Response.json({ reply: `We love weddings! Most couples choose our Farm-to-Table ($55/person) or Upscale Plated ($65/person) menus. We recommend booking 3-6 months out. Tastings are available for events over 75 guests. Setup, serving, and cleanup are all included.` })
      if (lower.includes('corporate') || lower.includes('office') || lower.includes('company') || lower.includes('business'))
        return Response.json({ reply: `We cater corporate events of all sizes — quarterly dinners, team lunches, holiday parties, and galas. Corporate clients can set up recurring event accounts. Our Cocktail Reception and Taco Bar are popular choices for office events.` })
      if (lower.includes('birthday') || lower.includes('anniversary') || lower.includes('party') || lower.includes('graduation'))
        return Response.json({ reply: `Birthday parties, anniversaries, and graduations are some of our favorite events! The Taco & Nacho Bar ($28/person) and Classic Southern ($35/person) are big hits for celebrations. Fill out the inquiry form and we'll suggest the perfect menu for your group.` })
      if (lower.includes('how far') || lower.includes('advance') || lower.includes('book') || lower.includes('when') || lower.includes('schedule'))
        return Response.json({ reply: `For most events, 2-4 weeks minimum. For weddings, we recommend 3-6 months. Holiday season (Nov-Dec) books fast, so plan early. The sooner you reach out, the more flexibility we have with menus and dates.` })
      if (lower.includes('where') || lower.includes('area') || lower.includes('travel') || lower.includes('deliver') || lower.includes('location'))
        return Response.json({ reply: `We're based in Greenville, SC and serve the entire Upstate — Greenville, Spartanburg, Anderson, Clemson, plus Asheville, NC. Travel fee applies for venues more than 45 minutes from Greenville.` })
      if (lower.includes('tasting') || lower.includes('taste') || lower.includes('try') || lower.includes('sample'))
        return Response.json({ reply: `Tastings are available for events over 75 guests. It's a great way to finalize your menu choices. Fill out the inquiry form with your details and we'll set one up for you!` })
      if (lower.includes('include') || lower.includes('setup') || lower.includes('staff') || lower.includes('clean') || lower.includes('serve'))
        return Response.json({ reply: `All packages include full setup, serving staff, and cleanup — you and your guests don't lift a finger. We handle everything from table setup to the last dish washed.` })
      if (lower.includes('minimum') || lower.includes('small') || lower.includes('guest count') || lower.includes('how many'))
        return Response.json({ reply: `Most menus start at 20 guests minimum. The Classic Southern has a 50+ guest minimum due to the smoking process. For intimate gatherings under 20, the Cocktail Reception is a great fit!` })
      if (lower.includes('demo') || lower.includes('real') || lower.includes('fake') || lower.includes('portfolio') || lower.includes('upstate'))
        return Response.json({ reply: `Great question! This is a fictional demo business created by Upstate Web Co to showcase what a modern catering website can do. The menus, pricing, and details are illustrative — but the website technology is very real!` })
      return Response.json({ reply: `I can help with menu options, pricing, dietary accommodations, booking timelines, event types, or our service area. For a custom quote, fill out the inquiry form — we respond within 24 hours!` })
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [...history.slice(-20).map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })), { role: 'user' as const, content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'Not sure about that — fill out the inquiry form and we\'ll help!' })
  } catch { return Response.json({ reply: 'Something went wrong. Email us at ' + SITE.email }) }
}
