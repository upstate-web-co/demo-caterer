export const SITE = {
  name: 'Copper Elm Catering',
  tagline: 'From our kitchen to your celebration',
  url: 'https://copperelmcatering.com',
  email: 'events@copperelmcatering.com',
  phone: '(864) 555-6183',
  location: 'Greenville, SC',
} as const

export const MENUS = [
  { name: 'Classic Southern', price: 'From $35/person', description: 'Slow-smoked pulled pork, mac and cheese, collard greens, cornbread, banana pudding. 50+ guest minimum.', type: 'Buffet' },
  { name: 'Upscale Plated', price: 'From $65/person', description: 'Pan-seared salmon or filet, seasonal vegetables, artisan bread, chef\'s choice dessert. Plated service with staff.', type: 'Plated' },
  { name: 'Taco & Nacho Bar', price: 'From $28/person', description: '3 proteins, house-made salsas, all the fixings, chips and queso. Interactive, fun, and crowd-pleasing.', type: 'Station' },
  { name: 'Farm-to-Table', price: 'From $55/person', description: 'Seasonal menu built around local farms. Changes quarterly. Ask us what\'s in season right now.', type: 'Family Style' },
  { name: 'Cocktail Reception', price: 'From $25/person', description: 'Passed hors d\'oeuvres, charcuterie displays, crostini, mini desserts. Elegant and social.', type: 'Passed' },
  { name: 'Brunch', price: 'From $30/person', description: 'Biscuit bar, shrimp and grits, seasonal fruit, mimosa station. Perfect for morning weddings and showers.', type: 'Buffet' },
]

export const EVENT_TYPES = ['Wedding', 'Corporate', 'Rehearsal Dinner', 'Birthday / Anniversary', 'Holiday Party', 'Nonprofit Gala', 'Graduation', 'Other']

export const TESTIMONIALS = [
  { quote: 'Copper Elm catered our 200-person wedding and every single guest raved about the food. The shrimp and grits station was the highlight of the night.', author: 'Emily & Ryan', event: 'Wedding, 200 guests, The Grandview Estate' },
  { quote: 'We\'ve used them for 3 corporate events now. They handle everything — setup, serving, cleanup. Our team just shows up and eats.', author: 'Morgan P.', event: 'Corporate quarterly dinners, 80 guests' },
  { quote: 'The farm-to-table menu was incredible. They worked with our venue to create something truly special and seasonal.', author: 'Jen W.', event: 'Anniversary party, 60 guests' },
]
