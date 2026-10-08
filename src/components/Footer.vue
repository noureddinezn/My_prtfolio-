<script setup>
import { RouterLink } from 'vue-router'
import { socials } from '../data/socials'
</script>

<template>
  <footer class="footer container">
    <div>
      <RouterLink class="brand footer-brand" to="/">Noureddine<span>.</span></RouterLink>
      <p>Full Stack Developer</p>
    </div>

    <div class="footer-socials">
      <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noreferrer">
        <i :class="social.icon" aria-hidden="true"></i>
        {{ social.name }}
      </a>
    </div>

    <p class="footer-note">Let's connect and build something amazing !</p>
    <RouterLink class="scroll-top" to="/" aria-label="Go to home">
      <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
    </RouterLink>
  </footer>
</template>
