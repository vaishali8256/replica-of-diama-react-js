// Content for the home page sections. Change copy / images / links here.

export const HERO = {
  video: '/hero/hero.mp4',
  poster: '/logo/DIAMA-PNG.png',
  title: 'Your Search Ends Here',
  text: 'Discover gifts to celebrate every kind of love - romantic, friendship, or just because.',
  buttons: [
    { label: 'Shop Now', to: '/products' },
    { label: 'About Us', to: '/about' },
  ],
}

// `size: 'large'` tiles span 2x2 in the grid.
export const CATEGORIES = [
  { label: 'Engagement Rings', image: '/category/ring1.png', to: '/products/rings', size: 'large' },
  { label: 'Earrings', image: '/category/earrings.png', to: '/products/earrings' },
  { label: 'Bracelet & Bangles', image: '/category/bracelate.png', to: '/products/bracelets', position: 'bottom' },
  { label: 'Pendant', image: '/category/pendant.png', to: '/products/pendants' },
  { label: 'Everyday Wear', image: '/category/band.png', to: '/products/rings', position: 'bottom' },
]

export const SHAPES = [
  { title: 'Oval', image: '/diamond 1/Oval.png', ring: '/diamond 1/oval ring.webp' },
  { title: 'Round', image: '/diamond 1/round.png', ring: '/diamond 1/round ring.png' },
  { title: 'Emerald', image: '/diamond 1/Emerald.png', ring: '/diamond 1/Emerald ring.png' },
  { title: 'Marquise', image: '/diamond 1/marquise.png', ring: '/diamond 1/marquise ring.png' },
  { title: 'Radiant', image: '/diamond 1/Radiant.png', ring: '/diamond 1/Radiant ring.png' },
  { title: 'Pear', image: '/diamond 1/pear.png', ring: '/diamond 1/pear ring.png' },
  { title: 'Elongated Cushion', image: '/diamond 1/Elongated Cushion.png', ring: '/diamond 1/Elongated Cushion ring.png' },
  { title: 'Cushion', image: '/diamond 1/cushion.png', ring: '/diamond 1/cushion ring.png' },
  { title: 'Princess', image: '/diamond 1/Princess.png', ring: '/diamond 1/Princess ring.png' },
  { title: 'Asscher', image: '/diamond 1/asscher.png', ring: '/diamond 1/asscher ring.png' },
]

// Hotspots on the Signature Collection image. `style` positions each dot (percentages).
export const SIGNATURE = {
  image: '/Signature Collection/23.png',
  hotspots: [
    { key: 'earrings', label: 'Diamond Earrings', description: 'Expertly crafted by skilled artisans with fine detailing.', style: { top: '28%', left: '45%' } },
    { key: 'rings', label: 'Diamond Ring', description: 'Premium quality gold for long-lasting shine.', style: { bottom: '30%', left: '11%' } },
    { key: 'bracelets', label: 'Diamond Bracelet', description: 'Premium quality gold for long-lasting shine.', style: { bottom: '15%', left: '44%' } },
    { key: 'pendants', label: 'Diamond Pendant', description: 'Elegant pendants perfect for any occasion.', style: { top: '60%', left: '55%' } },
  ],
}

export const CUT_GUIDE = [
  { name: 'Oval', image: '/Ring Slider/1.png', description: 'The oval cut is a brilliant-cut diamond that combines the classic beauty of a round brilliant with an elongated, while its elongated silhouette creates the illusion of longer, more slender fingers. The oval shape offers a unique and modern alternative to traditional round diamonds.', bestFor: 'Elegant Style', brilliance: 'Maximum', tags: ['Elegant', 'Flattering'] },
  { name: 'Pear', image: '/Ring Slider/1 (2).png', description: 'The pear-shaped diamond, also known as the teardrop cut, combines the elegance of a round brilliant with the unique silhouette of a marquise. This vintage-inspired cut features soft rounded corners on one end and a pointed tip on the other, creating a romantic and distinctive appearance that flatters the finger beautifully.', bestFor: 'Romantic Style', brilliance: 'High', tags: ['Elegant', 'Unique'] },
  { name: 'Cushion Square', image: '/Ring Slider/1 (3).png', description: 'The cushion square cut, also known as the antique cushion, features a square or rectangular shape with rounded corners and large, open facets that create a soft, romantic glow. This elegant step-cut design showcases exceptional clarity and sophistication, making it perfect for those who appreciate vintage charm combined with modern brilliance.', bestFor: 'Modern Style', brilliance: 'Excellent', tags: ['Contemporary', 'Sophisticated'] },
  { name: 'Princess', image: '/Ring Slider/1 (4).png', description: 'The princess cut is a brilliant-cut square diamond that combines the fire and sparkle of a round brilliant with a modern, geometric shape. This contemporary cut features sharp corners and exceptional brilliance, making it a popular choice for those who want maximum sparkle in a bold, modern design that stands out beautifully in any setting.', bestFor: 'Bold Style', brilliance: 'Maximum', tags: ['Bold', 'Modern'] },
  { name: 'Oval', image: '/Ring Slider/1 (6).png', description: 'The oval cut is a brilliant-cut diamond that combines the classic beauty of a round brilliant with an elongated, while its elongated silhouette creates the illusion of longer, more slender fingers. The oval shape offers a unique and modern alternative to traditional round diamonds.', bestFor: 'Elegant Style', brilliance: 'Maximum', tags: ['Elegant', 'Flattering'] },
  { name: 'Round', image: '/Ring Slider/1 (7).png', description: 'The round cut diamond is the most popular and timeless diamond shape, known for its exceptional brilliance and fire. Featuring a perfectly symmetrical circular design with multiple facets, this cut maximizes light reflection to create unmatched sparkle. Its classic appearance makes it versatile for all Jewellery styles, from traditional to modern settings.', bestFor: 'Classic Style', brilliance: 'Excellent', tags: ['Timeless', 'Brilliant', 'Classic'] },
  { name: 'Emerald', image: '/Ring Slider/1 (8).png', description: 'The emerald cut is a sophisticated step-cut diamond characterized by its rectangular shape and cropped corners. emphasizing clarity and color. The emerald cut offers a refined, understated elegance that appeals to those who appreciate classic sophistication and timeless beauty in their Jewellery.', bestFor: 'Classic Style', brilliance: 'High', tags: ['Classic', 'Refined'] },
  { name: 'Marquise', image: '/Ring Slider/1 (9).png', description: "The marquise cut, boat-shaped silhouette with pointed ends that create a distinctive and elegant appearance.  The marquise cut's unique shape makes it a perfect choice for those seeking a romantic, vintage-inspired design that symbolizes love and devotion.", bestFor: 'Romantic Style', brilliance: 'Maximum', tags: ['Romantic', 'Symbolic'] },
  { name: 'Radiant Square', image: '/Ring Slider/1 (10).png', description: 'The radiant square cut is a brilliant-cut diamond that combines the elegant shape of an emerald cut with the fire and sparkle of a round brilliant. The radiant cut offers a perfect balance between classic elegance and modern brilliance, making it ideal for contemporary and unique Jewellery designs.', bestFor: 'Modern Style', brilliance: 'Excellent', tags: ['Modern', 'Unique'] },
  { name: 'Cushion', image: '/Ring Slider/1 (11).png', description: "The cushion cut, also known as the pillow cut,romantic appearance. This brilliant-cut diamond combines vintage charm with modern sparkle. The cushion cut's unique combination of classic elegance and contemporary appeal makes it a popular choice for those seeking timeless beauty with a touch of modern sophistication.", bestFor: 'Modern Style', brilliance: 'Excellent', tags: ['Modern', 'Unique'] },
]

export const DESIGN_RING = {
  image: '/diamondsection/plan.png',
  mobileImage: '/diamondsection/mobile.png',
  icon: '/diamondsection/ring.svg',
  title: 'Design your Ring',
  text: "Design your ring your way. Start with a ring setting and then add the perfect center stone - or vice versa. It's really up to you!",
  button: { label: 'Custom Jewellery', to: '/custom-jewellery' },
}

export const FEATURED_TABS = [
  { key: 'rings', label: 'Rings' },
  { key: 'earrings', label: 'Earrings' },
  { key: 'pendants', label: 'Pendants' },
  { key: 'bracelets', label: 'Bracelets & Bangles' },
]
