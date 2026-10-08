<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProjectMockup from '../components/ProjectMockup.vue'
import { projects } from '../data/projects'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
const fallbackStack = computed(() =>
  (project.value?.tags || []).map((tag) => ({
    name: tag,
    category: 'Technology',
    icon: 'fa-solid fa-code',
    color: '#4285f4',
  })),
)
const stack = computed(() => project.value?.stack || fallbackStack.value)
const gallery = computed(() => project.value?.gallery || [])
</script>

<template>
  <section v-if="project" class="page project-detail-page container" data-reveal>
    <RouterLink class="back-link" to="/projects">
      <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
      Back to Projects
    </RouterLink>

    <section class="project-hero">
      <div class="project-hero-copy">
        <h1>{{ project.title }}</h1>
        <p class="project-detail-category">{{ project.category }}</p>
        <p class="project-detail-description">{{ project.description }}</p>

        <div class="tag-list">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>

        <div class="card-actions">
          <a v-if="project.demoUrl" class="btn btn-primary" :href="project.demoUrl" target="_blank" rel="noopener noreferrer">
            Live Demo <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
          <a v-if="project.githubUrl" class="btn btn-secondary" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github" aria-hidden="true"></i>
            GitHub
          </a>
        </div>
      </div>

      <div class="project-hero-visual">
        <ProjectMockup variant="dashboard" title="Dashboard" />
      </div>
    </section>

    <section class="project-detail-stats">
      <article>
        <i class="fa-regular fa-images" aria-hidden="true"></i>
        <strong>{{ gallery.length || 1 }}</strong>
        <span>Screenshots</span>
      </article>
      <article v-for="item in stack.slice(0, 4)" :key="item.name">
        <i :class="item.icon" aria-hidden="true" :style="{ color: item.color }"></i>
        <strong>{{ item.name }}</strong>
        <span>{{ item.category }}</span>
      </article>
    </section>

    <div class="project-detail-layout">
      <article class="section-card project-detail-panel project-overview-panel">
        <h2><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Project Overview</h2>
        <p>{{ project.overview }}</p>
      </article>

      <aside class="section-card project-detail-panel project-features-panel">
        <h2><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Key Features</h2>
        <ul>
          <li v-for="feature in project.features" :key="feature">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            {{ feature }}
          </li>
        </ul>
      </aside>

      <article class="section-card project-detail-panel project-stack-panel">
        <h2><i class="fa-solid fa-code" aria-hidden="true"></i> Technologies Used</h2>
        <div class="project-stack-list">
          <span v-for="item in stack" :key="item.name" :style="{ '--stack-color': item.color }">
            <i :class="item.icon" aria-hidden="true"></i>
            <b>{{ item.name }}</b>
            <small>{{ item.category }}</small>
          </span>
        </div>
      </article>
    </div>

    <section v-if="gallery.length" class="section-card project-gallery-panel">
      <div class="section-heading compact">
        <h2><i class="fa-regular fa-image" aria-hidden="true"></i> Project Gallery</h2>
        <span class="gallery-count"><i class="fa-regular fa-images" aria-hidden="true"></i> Screenshots</span>
      </div>

      <div class="project-gallery-grid">
        <article v-for="item in gallery" :key="item.title" class="gallery-item">
          <ProjectMockup :variant="item.variant" :title="item.title" compact />
          <strong>{{ item.title }}</strong>
        </article>
      </div>
    </section>
  </section>

  <section v-else class="page container" data-reveal>
    <header class="page-header">
      <p class="page-kicker"><i class="fa-regular fa-folder-open" aria-hidden="true"></i> Project</p>
      <h1>Project not found</h1>
      <p>The project you are looking for is not available.</p>
      <RouterLink class="btn btn-primary" to="/projects">Back to Projects</RouterLink>
    </header>
  </section>
</template>
