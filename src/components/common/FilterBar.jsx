import { useEffect, useRef, useState } from 'react'
import './common.css'

const Chevron = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="m4 7 6 6 6-6" /></svg>
)

// Pill button that opens a floating panel; closes on outside click / Esc.
export function FilterDropdown({ label, active, title, wide, children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`fdrop${open ? ' fdrop--open' : ''}${active ? ' fdrop--active' : ''}`}>
      <button type="button" className="fdrop__btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{label}</span>
        <Chevron />
      </button>
      {open && (
        <div className={`fdrop__panel${wide ? ' fdrop__panel--wide' : ''}`}>
          {title && (
            <div className="fdrop__title">
              <span>{title}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button>
            </div>
          )}
          {typeof children === 'function' ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  )
}

export function ResetButton({ disabled, onClick }) {
  return (
    <button type="button" className="filterbar__reset" disabled={disabled} onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg>
      Reset Filters
    </button>
  )
}

// Min/max inputs + dual-handle slider. Values are numbers; clamped so min <= max.
export function PriceRange({ min, max, low, high, onChange }) {
  const setLow = (v) => onChange(Math.max(min, Math.min(Number(v) || min, high)), high)
  const setHigh = (v) => onChange(low, Math.min(max, Math.max(Number(v) || max, low)))
  const pct = (v) => ((v - min) / (max - min)) * 100
  return (
    <div className="prange">
      <div className="prange__inputs">
        <input type="number" value={low} min={min} max={high} onChange={(e) => setLow(e.target.value)} aria-label="Minimum price" />
        <span>-</span>
        <input type="number" value={high} min={low} max={max} onChange={(e) => setHigh(e.target.value)} aria-label="Maximum price" />
      </div>
      <div className="prange__slider" style={{ '--lo': `${pct(low)}%`, '--hi': `${pct(high)}%` }}>
        <input type="range" min={min} max={max} step={50} value={low} onChange={(e) => setLow(e.target.value)} aria-label="Minimum price slider" />
        <input type="range" min={min} max={max} step={50} value={high} onChange={(e) => setHigh(e.target.value)} aria-label="Maximum price slider" />
      </div>
    </div>
  )
}
