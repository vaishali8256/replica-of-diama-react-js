import { useEffect, useRef, useState } from 'react'
import Button from '../../components/common/Button'
import { HERO } from '../../config/home'
import './home.css'

export default function Hero() {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v || failed) return
    v.muted = true
    v.play().catch(() => {})
  }, [failed])

  return (
    <section className="hero">
      <div className="hero__media">
        {failed ? (
          <img src={HERO.poster} alt="Diama fine jewellery" />
        ) : (
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="auto"
            poster={HERO.poster} src={HERO.video}
            onError={() => setFailed(true)}
          />
        )}
        <div className="hero__shade" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">{HERO.title}</h1>
        <p className="hero__text">{HERO.text}</p>
        <div className="hero__buttons">
          {HERO.buttons.map((b) => (
            <Button key={b.label} to={b.to} variant="outline-light">{b.label}</Button>
          ))}
        </div>
      </div>
    </section>
  )
}
