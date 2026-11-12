<script setup>
import { computed, ref } from 'vue'
import { technologies } from '../data/technologies'

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools']
const activeCategory = ref('All')

const filteredTechnologies = computed(() => {
  if (activeCategory.value === 'All') {
    return technologies
  }

  return technologies.filter((technology) => technology.category === activeCategory.value)
})

const categoryIcons = {
  All: 'fa-solid fa-border-all',
  Frontend: 'fa-solid fa-desktop',
  Backend: 'fa-solid fa-server',
  Database: 'fa-solid fa-database',
  DevOps: 'fa-solid fa-gears',
  Tools: 'fa-solid fa-wrench',
}
</script>

<template>
  <section class="page container about-page" data-reveal>
    <header class="page-header">
      <p class="page-kicker"><i class="fa-regular fa-user" aria-hidden="true"></i> About Me</p>
      <h1>Building clean, practical web experiences with a full-stack mindset.</h1>
      <p>
        I'm Noureddine Zouana, a passionate Full Stack Developer from Safi, Morocco. I enjoy learning
        new technologies, turning ideas into real projects, and creating applications that feel clear,
        efficient, and pleasant to use.
      </p>
    </header>

    <div class="about-layout">
      <article class="section-card about-story">
        <h2>Professional Introduction</h2>
        <p>
          My work is focused on modern web development with Vue.js, React, Laravel, APIs, relational
          databases, Docker, and deployment workflows. I like solving real problems, organizing code
          clearly, and improving each project through iteration.
        </p>
        <p>
          I am currently open to internships, junior roles, and collaboration opportunities where I can
          keep growing while contributing to useful products.
        </p>
      </article>

      <aside class="section-card info-panel">
        <h2>Personal Information</h2>
        <ul class="bio-list">
          <li><i class="fa-regular fa-calendar" aria-hidden="true"></i> <span>Age: 22</span></li>
          <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i> <span>From: Safi, Morocco</span></li>
          <li><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> <span>Education: YouCode (2025- en_cours)</span></li>
          <li><i class="fa-solid fa-briefcase" aria-hidden="true"></i> <span>Status: Available for Internship / Job</span></li>
        </ul>
      </aside>
    </div>

    <section class="section-card skills-panel">
      <div class="section-heading compact skills-showcase-heading">
        <div>
          <h2><i class="fa-solid fa-code" aria-hidden="true"></i> Main Technologies & Skills</h2>
          <p>Technologies and tools I use to build modern, scalable web applications.</p>
        </div>
        <span class="skills-count">{{ technologies.length }} Technologies</span>
      </div>

      <div class="skill-filters" aria-label="Filter technologies by category">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="skill-filter"
          :class="{ 'is-active': activeCategory === category }"
          :aria-pressed="activeCategory === category"
          @click="activeCategory = category"
        >
          <i :class="categoryIcons[category]" aria-hidden="true"></i>
          {{ category }}
        </button>
      </div>

      <div class="skills-grid">
        <article
          v-for="technology in filteredTechnologies"
          :key="technology.name"
          class="skill-card"
          :style="{ '--skill-color': technology.color }"
        >
          <div class="skill-card-top">
            <span class="skill-icon">
              <i :class="technology.icon" aria-hidden="true"></i>
            </span>
            <h3>{{ technology.name }}</h3>
          </div>
          <p>{{ technology.description }}</p>
          <span class="skill-category">{{ technology.category }}</span>
        </article>
      </div>
    </section>
  </section>
</template>
