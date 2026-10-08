<script setup>
import { RouterLink } from 'vue-router'
import TechOrbit from './TechOrbit.vue'

const stats = [
  { value: '5+', label: 'Projects' },
  { value: '2+', label: 'Years Learning' },
  { value: '10+', label: 'Technologies' },
  { value: '100%', label: 'Motivation' },
]
</script>

<template>
  <section class="hero container" data-reveal>
    <div class="hero-copy">
      <p class="intro-pill"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> Hello, I'm</p>
      <h1>Noureddine <span>Zouana</span></h1>
      <h2>Full Stack Developer</h2>
      <p class="hero-description">
        I build modern, scalable and user-friendly web applications. I enjoy turning ideas into real
        projects using clean code and modern technologies.
      </p>

      <div class="hero-actions">
        <RouterLink class="btn btn-primary" to="/contact">
          <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
          Contact Me
        </RouterLink>
        <a class="btn btn-secondary" href="/CvNoureddinezouana.pdf" download>
          <i class="fa-solid fa-download" aria-hidden="true"></i>
          Download CV
        </a>
      </div>

      <dl class="stats-grid">
        <div v-for="stat in stats" :key="stat.label">
          <dt>{{ stat.value }}</dt>
          <dd>{{ stat.label }}</dd>
        </div>
      </dl>
    </div>

    <TechOrbit />
  </section>
</template>
