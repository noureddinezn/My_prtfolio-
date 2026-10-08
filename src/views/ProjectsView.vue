<script setup>
import { computed, ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'

const filters = ['All', 'Web Apps', 'APIs', 'Mobile', 'Games', 'Other']
const activeFilter = ref('All')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }

  return projects.filter((project) => project.type === activeFilter.value)
})

const filterIcons = {
  All: 'fa-solid fa-border-all',
  'Web Apps': 'fa-solid fa-desktop',
  APIs: 'fa-solid fa-server',
  Mobile: 'fa-solid fa-mobile-screen-button',
  Games: 'fa-solid fa-gamepad',
  Other: 'fa-solid fa-shapes',
}
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
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="project-filter"
        :class="{ 'is-active': activeFilter === filter }"
        @click="activeFilter = filter"
      >
        <i :class="filterIcons[filter]" aria-hidden="true"></i>
        {{ filter }}
      </button>
    </div>

    <div class="projects-grid page-projects-grid">
      <ProjectCard v-for="project in filteredProjects" :key="project.title" :project="project" />
    </div>
  </section>
</template>
