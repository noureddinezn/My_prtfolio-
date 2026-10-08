import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'portfolio-theme'
const prefersDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches

export function useTheme() {
  const theme = ref('light')

  const applyTheme = (value) => {
    theme.value = value
    document.documentElement.dataset.theme = value
    localStorage.setItem(STORAGE_KEY, value)
  }

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    applyTheme(saved || (prefersDark() ? 'dark' : 'light'))
  })

  return { theme, toggleTheme }
}
