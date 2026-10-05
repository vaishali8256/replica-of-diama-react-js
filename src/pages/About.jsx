import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import { ABOUT as A } from '../config/pages'
import './pages.css'

export default function About() {
  return (
    <>
      <PageHeader title={A.title} />
      <section className="container section about">
        <img src={A.image} alt="Diama craftsmanship" className="about__img" />
        <div className="about__text">
          <h2>{A.intro.heading}</h2>
          <p>{A.intro.text}</p>
          <p>{A.curation}</p>
          <Button to={A.cta.to} variant="solid">{A.cta.label}</Button>
        </div>
      </section>
      <section className="container section about__blocks">
        {A.blocks.map((b) => (
          <div key={b.heading} className="about__block">
            <h3>{b.heading}</h3>
            <p>{b.text}</p>
            {b.bullets && <ul>{b.bullets.map((x) => <li key={x}>• {x}</li>)}</ul>}
          </div>
        ))}
      </section>
      <section className="stats">
        {A.stats.map((s) => (
          <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
        ))}
      </section>
    </>
  )
}
