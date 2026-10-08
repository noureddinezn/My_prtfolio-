<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="project-card" data-reveal>
    <RouterLink class="project-preview" :class="`is-${project.accent}`" :to="`/projects/${project.slug}`">
      <img v-if="project.screenshot" :src="project.screenshot" :alt="`${project.title} screenshot`" />
      <template v-else>
        <div class="preview-sidebar"></div>
        <div class="preview-main">
        <span></span>
        <div class="preview-bars">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div class="preview-tiles">
          <b></b>
          <b></b>
          <b></b>
        </div>
      </div>
      </template>
    </RouterLink>

    <div class="project-content">
      <h3>{{ project.title }}</h3>
      <p class="project-category">{{ project.category }}</p>
      <p class="project-description">{{ project.description }}</p>

      <div class="tag-list">
        <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
      </div>

      <div class="card-actions">
        <RouterLink class="btn btn-primary btn-small" :to="`/projects/${project.slug}`">
          View Project <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </RouterLink>
        <a class="btn btn-secondary btn-small" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
          GitHub
        </a>
      </div>
    </div>
  </article>
</template>
