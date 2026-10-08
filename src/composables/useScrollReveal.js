import { nextTick, onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer

  const reveal = () => {
    nextTick(() => {
      const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)')
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('is-visible')
          return
        }

        observer?.observe(element)
      })
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    reveal()
    window.setTimeout(reveal, 220)
  })

  onUnmounted(() => observer?.disconnect())

  return { reveal }
}
