<script setup>
import { RouterLink } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import ProjectCard from '../components/ProjectCard.vue'
import CertificateCard from '../components/CertificateCard.vue'
import { projects } from '../data/projects'
import { experiences } from '../data/experiences'
import { certificates } from '../data/certificates'

const featuredProjects = projects.slice(0, 3)
const latestExperience = experiences[0]
const featuredCertificates = certificates.slice(0, 2)
</script>

<template>
  <div class="page-stack">
    <HeroSection />

    <section class="section-block container preview-section">
      <div class="section-heading">
        <h2><i class="fa-regular fa-folder-open" aria-hidden="true"></i> Featured Projects</h2>
        <RouterLink to="/projects">
          View All Projects <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </div>

      <div class="projects-grid preview-grid">
        <ProjectCard v-for="project in featuredProjects" :key="project.title" :project="project" />
      </div>
    </section>

    <section class="home-preview-row container">
      <article class="section-card preview-panel" data-reveal>
        <div class="section-heading compact">
          <h2><i class="fa-solid fa-briefcase" aria-hidden="true"></i> Latest Experience</h2>
          <RouterLink to="/experience">
            View Experience <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
        </div>
        <time>{{ latestExperience.period }}</time>
        <h3>{{ latestExperience.organization }}</h3>
        <p>{{ latestExperience.role }}</p>
        <p class="muted-copy">{{ latestExperience.description }}</p>
        <div class="tag-list">
          <span v-for="technology in latestExperience.technologies" :key="technology">{{ technology }}</span>
        </div>
      </article>

      <section class="section-card preview-panel" data-reveal>
        <div class="section-heading compact">
          <h2><i class="fa-solid fa-award" aria-hidden="true"></i> Featured Certifications</h2>
          <RouterLink to="/certifications">
            View All Certifications <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </RouterLink>
        </div>
        <div class="certificates-grid">
          <CertificateCard
            v-for="certificate in featuredCertificates"
            :key="certificate.title"
            :certificate="certificate"
          />
        </div>
      </section>
    </section>
  </div>
</template>
