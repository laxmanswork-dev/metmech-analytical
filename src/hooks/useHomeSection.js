import { useEffect, useState } from 'react'

// Which of the given home-page sections the visitor is reading, for the
// navigation's current item: the last one whose top has passed 40% of the way
// down the screen, or null above the first. Only watches while `enabled`.
export function useHomeSection(ids, enabled) {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    if (!enabled) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      const passed = ids.filter((id) => {
        const element = document.getElementById(id)
        return element && element.getBoundingClientRect().top <= line
      })
      setCurrent(passed.at(-1) ?? null)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, enabled])

  return enabled ? current : null
}
