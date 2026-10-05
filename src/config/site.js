// Single source of truth for brand info, navigation and footer content.
// Edit here and the header, footer and SEO tags update everywhere.

export const SITE = {
  name: 'Diama',
  tagline: "Let's create your perfect Jewellery",
  description:
    'We believe every piece of Jewellery holds a story, making a cherished moment worth celebrating.',
  announcement: 'Free delivery on all orders!',
  email: 'info@diama.com.au',
  location: 'Australia',
  copyright: '© 2026 Diama. All Rights Reserved',
  credit: { label: 'tech.forever', url: 'https://techdotforever.creativefis.com/' },
  social: {
    facebook: 'https://www.facebook.com/share/1DKqo1CzUG',
    instagram: 'https://www.instagram.com/diama.au?igsh=a2I1Zzc5MW0wbWlz',
  },
  logos: {
    dark: '/logo/DIAMA-PNG.png',
    white: '/logo/DIAMA-white.png',
    footer: '/logo/Final-Logo.png',
  },
}

export const NAV_LINKS = [
  { label: 'Rings', to: '/products/rings' },
  { label: 'Earrings', to: '/products/earrings' },
  { label: 'Pendants', to: '/products/pendants' },
  { label: 'Bracelets & Bangles', to: '/products/bracelets' },
  { label: 'Custom Jewellery', to: '/custom-jewellery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Blogs', to: '/blogs' },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      { label: 'About Us', to: '/about' },
      { label: 'Blog', to: '/blogs' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Contact Us', to: '/contact-us' },
    ],
  },
  {
    title: 'Jewellery',
    links: [
      { label: 'Everyday Wear', to: '/products/rings' },
      { label: 'Engagement Rings', to: '/products/rings' },
      { label: 'Bracelets and Bangles', to: '/products/bracelets' },
      { label: 'Earrings', to: '/products/earrings' },
      { label: 'Pendants', to: '/products/pendants' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Terms Of Use', to: '/terms-of-use' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Warranty', to: '/warranty' },
      { label: 'Returns & Refunds', to: '/returns-and-refund-policy' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
]
