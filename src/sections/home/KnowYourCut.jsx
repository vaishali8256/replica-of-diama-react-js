import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../../components/common/SectionTitle'
import { CUT_GUIDE } from '../../config/home'
import './knowYourCut.css'

// Orbit radius per viewport width (matches the original design)
const orbitRadius = () => {
  const w = window.innerWidth
  return w <= 360 ? 80 : w <= 480 ? 105 : w <= 768 ? 150 : w <= 991 ? 215 : w <= 1024 ? 200 : 215
}

export default function KnowYourCut() {
  const [index, setIndex] = useState(0)
  const slides = useRef([])

  // Place each circular thumbnail on the orbit; the active one sits at the left (180deg).
  useEffect(() => {
    const place = () => {
      const r = orbitRadius()
      const n = slides.current.length
      slides.current.forEach((el, i) => {
        if (!el) return
        let s = i - index
        if (s < 0) s += n
        const a = ((180 + (360 / n) * s) * Math.PI) / 180
        el.style.transform = `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px))`
      })
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [index])

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % CUT_GUIDE.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="container section bg-white cut-wrapper">
      <SectionTitle>Know your Cut</SectionTitle>
      <div className="cut">
        <h1 className="cut__t cut__t--left-des">WHAT IS YOUR</h1>
        <h1 className="cut__t cut__t--left">ST</h1>
        <h1 className="cut__t cut__t--right">NE</h1>
        <h1 className="cut__t cut__t--right-des">SHAPE?</h1>

        <div className="cut__content">
          {CUT_GUIDE.map((c, i) => (
            <div key={i} className={`cut__slide ${i === index ? 'is-active' : ''}`}>
              <h2 className="cut__name">{c.name}</h2>
              <p className="cut__desc">{c.description}</p>
              <div className="cut__features">
                <div><span>Best For:</span> <strong>{c.bestFor}</strong></div>
                <div><span>Brilliance:</span> <strong>{c.brilliance}</strong></div>
              </div>
              <div className="cut__tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>

        <div className="cut__shank" />
        <div className="cut__white-ring" />
        <div className="cut__orbit">
          {CUT_GUIDE.map((c, i) => (
            <div key={i} ref={(el) => (slides.current[i] = el)} className="cut__thumb" onClick={() => setIndex(i)}>
              <img src={c.image} alt={`${c.name} ring shape`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
