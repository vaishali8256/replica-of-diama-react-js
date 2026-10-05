import './common.css'

// Centered Cinzel heading used by every home section ("EXPLORE CATEGORIES", etc.)
export default function SectionTitle({ children, as: Tag = 'h2', className = '' }) {
  return <Tag className={`section-title ${className}`}>{children}</Tag>
}
