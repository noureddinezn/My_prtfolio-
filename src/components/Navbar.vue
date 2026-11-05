<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const route = useRoute()
const isOpen = ref(false)
const isScrolled = ref(false)
const header = ref(null)
const updateScroll = () => { isScrolled.value = window.scrollY > 24 }
const onOutsideClick = (event) => {
  if (!header.value?.contains(event.target)) closeMenu()
}
const onEscape = (event) => { if (event.key === 'Escape') closeMenu() }
onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  document.addEventListener('pointerdown', onOutsideClick)
  document.addEventListener('keydown', onEscape)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  document.removeEventListener('pointerdown', onOutsideClick)
  document.removeEventListener('keydown', onEscape)
})

const links = [
  { label: 'Home', to: '/', icon: 'fa-solid fa-house' },
  { label: 'About Me', to: '/about', icon: 'fa-regular fa-user' },
  { label: 'Experience', to: '/experience', icon: 'fa-solid fa-briefcase' },
  { label: 'Projects', to: '/projects', icon: 'fa-solid fa-layer-group' },
  { label: 'Certifications', to: '/certifications', icon: 'fa-solid fa-award' },
  { label: 'Contact', to: '/contact', icon: 'fa-regular fa-envelope' },
]

const closeMenu = () => {
  isOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)
</script>

<template>
  <header ref="header" class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <nav class="navbar container" aria-label="Main navigation">
      <RouterLink class="brand" to="/" @click="closeMenu">
        Noureddine<span>.</span>
      </RouterLink>

      <div id="main-nav-links" class="nav-links" :class="{ 'is-open': isOpen }">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" @click="closeMenu">
          <i :class="[link.icon, 'nav-link-icon']" aria-hidden="true"></i>
          {{ link.label }}
        </RouterLink>

        <RouterLink class="mobile-menu-cta" to="/contact" @click="closeMenu">
          <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
          Contact Me
        </RouterLink>
      </div>

      <div class="nav-actions">
        <button class="theme-toggle" type="button" aria-label="Toggle color theme" @click="toggleTheme">
          <i v-if="theme === 'light'" class="fa-solid fa-moon" aria-hidden="true"></i>
          <i v-else class="fa-solid fa-sun" aria-hidden="true"></i>
        </button>

        <RouterLink class="btn btn-primary nav-cta" to="/contact" @click="closeMenu">
          <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
          Contact Me
        </RouterLink>

        <button
          class="menu-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-controls="main-nav-links"
          @keydown.esc="closeMenu"
          :aria-expanded="isOpen"
          @click="isOpen = !isOpen"
        >
          <i v-if="isOpen" class="fa-solid fa-xmark" aria-hidden="true"></i>
          <i v-else class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </header>
  <div class="navbar-spacer" aria-hidden="true"></div>
</template>

<style scoped>
.site-header { position: fixed; top: 12px; right: 0; left: 0; backdrop-filter: none; }
.navbar-spacer { height: 94px; }
.navbar { min-height: 82px; padding: 12px 24px; border-radius: 24px; background: rgba(255,255,255,.95); border-color: rgba(255,255,255,.85); box-shadow: 0 12px 32px rgba(30,91,166,.09); transition: background 220ms ease, box-shadow 220ms ease, border-color 220ms ease; backdrop-filter: blur(20px); }
.is-scrolled .navbar { background: rgba(240,248,255,.7); border-color: rgba(255,255,255,.65); box-shadow: 0 14px 38px rgba(30,91,166,.17); }
.brand { padding-right: 26px; border-right: 1px solid var(--color-border); font-size: clamp(1.5rem,2vw,1.9rem); letter-spacing: -.045em; }
.nav-links { gap: 5px; margin-inline: 18px; font-size: .92rem; }
.nav-links a { gap: 9px; padding: 12px 13px; border-radius: 16px; min-height: 46px; transition: background 180ms ease, color 180ms ease; }
.nav-link-icon { font-size: 1.15rem; width: 22px; text-align: center; }
.nav-links a::after { display: none; }
.nav-links a:hover { background: var(--color-primary-soft); }
.nav-links a.router-link-active { background: var(--color-primary-soft); color: var(--color-primary-dark); font-weight: 750; }
.nav-actions { gap: 18px; }
.theme-toggle { width: 46px; height: 46px; border: 0; background: var(--color-primary-soft); font-size: 1.15rem; }
.nav-cta { border-left: 1px solid var(--color-border); border-radius: 15px; min-height: 48px; padding: 0 20px; font-size: .94rem; }
:root[data-theme='dark'] .navbar { background: rgba(12,24,42,.95); border-color: var(--color-border); }
:root[data-theme='dark'] .is-scrolled .navbar { background: rgba(12,24,42,.74); }
:root[data-theme='dark'] .nav-links a.router-link-active { color: #90bdff; }
@media (max-width: 1280px) and (min-width: 1181px) {
  .navbar { padding-inline: 18px; }
  .brand { padding-right: 18px; }
  .nav-links { margin-inline: 10px; gap: 2px; font-size: .85rem; }
  .nav-links a { padding-inline: 9px; gap: 7px; }
  .nav-actions { gap: 12px; }
  .nav-cta { padding-inline: 14px; }
}
@media (max-width: 1180px) {
  .navbar-spacer { height: 82px; }
  .navbar { min-height: 70px; padding: 10px 16px; border-radius: 20px; }
  .brand { padding-right: 0; border: 0; }
  .nav-actions { gap: 10px; }
  .nav-cta { display: none; }
  .menu-toggle { display: inline-grid; width: 44px; height: 44px; }
  .theme-toggle { width: 44px; height: 44px; }
  .nav-links { position: absolute; top: calc(100% + 10px); left: 0; right: 0; z-index: 10; display: flex; flex-direction: column; align-items: stretch; margin: 0; padding: 12px; gap: 5px; border: 1px solid var(--color-border); border-radius: 20px; background: var(--color-surface-strong); box-shadow: 0 18px 40px var(--color-shadow); opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-8px); max-height: calc(100dvh - 110px); overflow-y: auto; transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease; }
  .nav-links.is-open { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); }
  .nav-links a { padding: 12px 16px; border-radius: 12px; }
  .nav-links .mobile-menu-cta { display: inline-flex; justify-content: center; margin-top: 6px; background: var(--color-primary); color: white; }
}
@media (max-width: 380px) {
  .navbar { padding-inline: 12px; }
  .brand { font-size: 1.35rem; }
  .nav-actions { gap: 6px; }
  .theme-toggle, .menu-toggle { width: 40px; height: 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .navbar, .nav-links, .nav-links a { transition: none; }
}
</style>
