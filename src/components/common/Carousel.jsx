import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import Icon from './Icon'
import './common.css'

// Reusable Swiper wrapper. Pass any list + a render function.
// `breakpoints` follows Swiper's format, e.g. { 640: { slidesPerView: 2 } }.
export default function Carousel({
  items,
  renderItem,
  breakpoints,
  spaceBetween = 12,
  autoplay = 3000,
  arrows = true,
  className = '',
}) {
  const id = `c${Math.random().toString(36).slice(2, 8)}`
  return (
    <div className={`carousel ${className}`}>
      {arrows && (
        <>
          <button className={`carousel__arrow carousel__arrow--prev ${id}-prev`} aria-label="Previous"><Icon name="chevronLeft" size={18} /></button>
          <button className={`carousel__arrow carousel__arrow--next ${id}-next`} aria-label="Next"><Icon name="chevronRight" size={18} /></button>
        </>
      )}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={spaceBetween}
        loop={items.length > 4}
        autoplay={autoplay ? { delay: autoplay, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        navigation={arrows ? { prevEl: `.${id}-prev`, nextEl: `.${id}-next` } : false}
        breakpoints={breakpoints}
      >
        {items.map((item, i) => (
          <SwiperSlide key={item.id || item.slug || i}>{renderItem(item, i)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
