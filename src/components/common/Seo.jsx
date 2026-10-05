import { useEffect } from 'react'
import { SITE } from '../../config/site'

// Sets document title per page without extra dependencies.
export default function Seo({ title }) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : SITE.name
  }, [title])
  return null
}
