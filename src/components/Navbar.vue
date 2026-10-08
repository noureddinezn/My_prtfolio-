<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const route = useRoute()
const isOpen = ref(false)

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Contact', to: '/contact' },
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
  <header class="site-header">
    <nav class="navbar container" aria-label="Main navigation">
      <RouterLink class="brand" to="/" @click="closeMenu">
        Noureddine<span>.</span>
      </RouterLink>

      <div class="nav-links" :class="{ 'is-open': isOpen }">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" @click="closeMenu">
          <i v-if="link.to === '/'" class="fa-solid fa-house nav-link-icon" aria-hidden="true"></i>
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
          :aria-expanded="isOpen"
          @click="isOpen = !isOpen"
        >
          <i v-if="isOpen" class="fa-solid fa-xmark" aria-hidden="true"></i>
          <i v-else class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </header>
</template>
