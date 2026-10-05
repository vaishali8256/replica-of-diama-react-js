import { Link } from 'react-router-dom'
import './common.css'

// One button for the whole site. variant: solid | outline | outline-light | pill
export default function Button({ to, href, variant = 'solid', className = '', children, ...rest }) {
  const cls = `btn btn--${variant} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}
