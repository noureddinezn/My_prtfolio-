<script setup>
import { computed, ref, watch } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'

import { projectFilters, filterProjects } from '../data/projectFilters'
import { useScrollReveal } from '../composables/useScrollReveal'

const activeFilter = ref('Web Apps')
const filteredProjects = computed(() => filterProjects(projects, activeFilter.value))
const { reveal } = useScrollReveal()
watch(filteredProjects, reveal, { flush: 'post' })
</script>

<template>
  <section class="page container" data-reveal>
    <header class="page-header">
      <p class="page-kicker"><i class="fa-regular fa-folder-open" aria-hidden="true"></i> Projects</p>
      <h1>Projects</h1>
      <p>
        A selection of practical projects built while learning and applying modern frontend and backend
        technologies.
      </p>
    </header>

    <div class="project-filters" aria-label="Filter projects by type">
      <button
        v-for="filter in projectFilters"
        :key="filter.label"
        type="button"
        class="project-filter"
        :class="{ 'is-active': activeFilter === filter.label }"
        @click="activeFilter = filter.label"
        :aria-pressed="activeFilter === filter.label"
      >
        <i :class="filter.icon" aria-hidden="true"></i>
        {{ filter.label }}
      </button>
    </div>

    <div class="projects-grid page-projects-grid" aria-live="polite" aria-atomic="false">
      <ProjectCard v-for="project in filteredProjects" :key="project.title" :project="project" />
    </div>
    <p v-if="!filteredProjects.length" class="project-empty" role="status">No projects in this category yet.</p>
  </section>
</template>

<style scoped>
.project-filters { grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 420px) { .project-filters { gap: 8px; } .project-filter { padding-inline: 8px; font-size: .8rem; } }
.project-empty { padding: 32px; border: 1px solid var(--color-border); border-radius: 16px; background: var(--color-surface); text-align: center; color: var(--color-muted); }
</style>
