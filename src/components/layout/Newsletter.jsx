import { useState } from 'react'
import './layout.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return setMsg('Please enter a valid email address.')
    // TODO: connect to your newsletter API here.
    setMsg('Thanks for subscribing!')
    setEmail('')
  }

  return (
    <div className="newsletter">
      <div className="newsletter__card">
        <h3>Subscribe to our newsletter</h3>
        <p>Stay updated with our latest Jewellery collections, exclusive offers, and special events.</p>
        <form onSubmit={onSubmit} className="newsletter__form">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
          <button type="submit">Subscribe</button>
        </form>
        {msg && <p className="newsletter__msg">{msg}</p>}
      </div>
    </div>
  )
}
