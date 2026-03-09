// src/utils/giftSuggestions.js
// Gift suggestion database organized by event type and hobby
// This acts as our "AI gift generator"

const GIFT_DATABASE = {
  Birthday: {
    Gaming: [
      { name: 'Nintendo Switch OLED', price: 349, link: 'https://amazon.com', description: 'Portable gaming console with vibrant OLED display' },
      { name: 'PlayStation Gift Card $50', price: 50, link: 'https://amazon.com', description: 'Digital store credit for games and add-ons' },
      { name: 'Gaming Headset', price: 79, link: 'https://amazon.com', description: 'Wireless headset with surround sound' },
      { name: 'Xbox Game Pass 3-Month', price: 45, link: 'https://amazon.com', description: 'Access to hundreds of games' },
      { name: 'Gaming Mouse Pad XL', price: 25, link: 'https://amazon.com', description: 'Extended desk pad with stitched edges' },
      { name: 'Retro Arcade Mini Console', price: 60, link: 'https://amazon.com', description: 'Classic games in a compact cabinet' },
    ],
    Books: [
      { name: 'Kindle Paperwhite', price: 139, link: 'https://amazon.com', description: 'Waterproof e-reader with adjustable warm light' },
      { name: 'Book of the Month Subscription', price: 49, link: 'https://bookofthemonth.com', description: '3-month curated book subscription' },
      { name: 'Bookshelf Organizer', price: 35, link: 'https://amazon.com', description: 'Stylish wooden desktop book stand' },
      { name: 'Reading Light Clip-On', price: 18, link: 'https://amazon.com', description: 'Rechargeable amber LED book light' },
      { name: 'Bookmarks Set (Magnetic)', price: 12, link: 'https://amazon.com', description: 'Set of 12 cute magnetic bookmarks' },
      { name: 'Book Lovers Mug', price: 16, link: 'https://amazon.com', description: 'Ceramic mug with literary quotes' },
    ],
    Tech: [
      { name: 'AirPods Pro', price: 249, link: 'https://apple.com', description: 'Noise cancelling wireless earbuds' },
      { name: 'Smart Watch', price: 199, link: 'https://amazon.com', description: 'Fitness tracker with heart rate monitor' },
      { name: 'Portable Charger 20000mAh', price: 39, link: 'https://amazon.com', description: 'Fast charging power bank' },
      { name: 'Wireless Charging Pad', price: 29, link: 'https://amazon.com', description: 'Sleek 15W fast wireless charger' },
      { name: 'USB-C Hub 7-in-1', price: 45, link: 'https://amazon.com', description: 'HDMI, USB, SD card multi-adapter' },
      { name: 'Smart LED Strip Lights', price: 22, link: 'https://amazon.com', description: 'App-controlled RGB room lights' },
    ],
    Cooking: [
      { name: 'Air Fryer', price: 89, link: 'https://amazon.com', description: 'Compact digital air fryer for healthy meals' },
      { name: "Chef's Knife Set", price: 65, link: 'https://amazon.com', description: 'Professional 5-piece stainless steel set' },
      { name: 'Recipe Book: World Cuisines', price: 28, link: 'https://amazon.com', description: '200+ recipes from around the globe' },
      { name: 'Spice Rack Organizer', price: 32, link: 'https://amazon.com', description: 'Rotating 20-jar spice carousel' },
      { name: 'Cast Iron Skillet', price: 35, link: 'https://amazon.com', description: 'Pre-seasoned 12-inch skillet' },
      { name: 'Kitchen Scale (Digital)', price: 15, link: 'https://amazon.com', description: 'Precision food scale for baking' },
    ],
    Fitness: [
      { name: 'Yoga Mat Premium', price: 45, link: 'https://amazon.com', description: 'Extra thick non-slip exercise mat' },
      { name: 'Resistance Bands Set', price: 29, link: 'https://amazon.com', description: '5 levels of resistance for home workouts' },
      { name: 'Shaker Bottle', price: 15, link: 'https://amazon.com', description: 'BPA-free protein shake mixer' },
      { name: 'Foam Roller', price: 24, link: 'https://amazon.com', description: 'Deep tissue muscle recovery roller' },
      { name: 'Jump Rope (Weighted)', price: 19, link: 'https://amazon.com', description: 'Speed rope for cardio training' },
      { name: 'Gym Bag (Duffel)', price: 38, link: 'https://amazon.com', description: 'Water-resistant with shoe compartment' },
    ],
    Travel: [
      { name: 'Carry-On Spinner Luggage', price: 120, link: 'https://amazon.com', description: 'Lightweight hardshell with TSA lock' },
      { name: 'Neck Pillow & Eye Mask Set', price: 25, link: 'https://amazon.com', description: 'Memory foam travel comfort kit' },
      { name: 'Packing Cubes (6-pack)', price: 22, link: 'https://amazon.com', description: 'Organize your suitcase efficiently' },
      { name: 'Travel Adapter Universal', price: 28, link: 'https://amazon.com', description: 'Works in 150+ countries with USB ports' },
      { name: 'Compression Socks', price: 16, link: 'https://amazon.com', description: 'Comfortable support for long flights' },
      { name: 'Waterproof Phone Pouch', price: 10, link: 'https://amazon.com', description: 'Touchscreen-friendly dry bag' },
    ],
  },
}

// Copy Birthday gifts to other events (in a real app, each would be unique)
const otherEvents = ['Wedding', 'Baby Shower', 'Christmas', 'Other']
otherEvents.forEach(event => {
  GIFT_DATABASE[event] = { ...GIFT_DATABASE.Birthday }
})

// Add some event-specific gifts
GIFT_DATABASE.Wedding.Tech = [
  { name: 'Smart Home Speaker', price: 99, link: 'https://amazon.com', description: 'Voice-controlled assistant for your new home' },
  { name: 'Robot Vacuum', price: 249, link: 'https://amazon.com', description: 'Self-charging automatic floor cleaner' },
  { name: 'Digital Photo Frame', price: 89, link: 'https://amazon.com', description: 'WiFi frame that displays shared photos' },
  { name: 'Smart Thermostat', price: 129, link: 'https://amazon.com', description: 'Energy-saving programmable thermostat' },
  { name: 'Espresso Machine', price: 199, link: 'https://amazon.com', description: 'Compact home barista machine' },
  { name: 'Streaming Device', price: 49, link: 'https://amazon.com', description: '4K streaming stick for movie nights' },
]

GIFT_DATABASE.Christmas.Gaming = [
  { name: 'Steam Gift Card $100', price: 100, link: 'https://store.steampowered.com', description: 'PC gaming store credit' },
  { name: 'Gaming Chair', price: 189, link: 'https://amazon.com', description: 'Ergonomic chair with lumbar support' },
  { name: 'VR Headset', price: 299, link: 'https://amazon.com', description: 'Standalone virtual reality headset' },
  { name: 'LED Desk Light Bar', price: 45, link: 'https://amazon.com', description: 'Monitor-mounted ambient lighting' },
  { name: 'Controller Stand & Charger', price: 25, link: 'https://amazon.com', description: 'Dual charging dock display stand' },
  { name: 'Gaming Keyboard (Mechanical)', price: 79, link: 'https://amazon.com', description: 'RGB backlit with tactile switches' },
]

// Generate suggestions: picks 3 random gifts based on event + hobbies
export function generateSuggestions(eventType, hobbies) {
  const eventGifts = GIFT_DATABASE[eventType] || GIFT_DATABASE.Birthday
  let pool = []

  // Collect gifts from all selected hobbies
  if (hobbies && hobbies.length > 0) {
    hobbies.forEach(hobby => {
      if (eventGifts[hobby]) {
        pool = [...pool, ...eventGifts[hobby]]
      }
    })
  }

  // If no hobbies selected or no matches, use Tech as default
  if (pool.length === 0) {
    pool = eventGifts.Tech || eventGifts.Gaming || []
  }

  // Shuffle and pick 3
  const shuffled = pool.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}