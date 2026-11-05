<script setup>
import ExperienceCard from '../components/ExperienceCard.vue'
import { experiencePage, timelineExperiences } from '../data/experiences'
</script>

<template>
  <section class="page container experience-view" data-reveal>
    <header class="page-header experience-heading">
      <p class="page-kicker"><i class="fa-solid fa-briefcase" aria-hidden="true"></i> {{ experiencePage.kicker }}</p>
      <h1>{{ experiencePage.title }}</h1>
      <p>{{ experiencePage.description }}</p>
    </header>

    <ol class="experience-timeline" :aria-label="experiencePage.timelineLabel">
      <ExperienceCard v-for="experience in timelineExperiences" :key="experience.id" :experience="experience" />
    </ol>
  </section>
</template>

<style scoped>
.experience-view { padding-bottom: 36px; }
.experience-heading { margin-bottom: 36px; }
.experience-heading h1 { font-size: clamp(2.6rem, 4.5vw, 3.8rem); line-height: 1.1; }
.experience-heading > p:last-child { max-width: 850px; }
.experience-timeline { position: relative; display: grid; margin: 0; padding: 0; list-style: none; gap: 26px; }
.experience-timeline::before { position: absolute; top: 31px; bottom: 34px; left: 10px; width: 2px; background: linear-gradient(180deg, #4285f4 0%, #4285f4 75%, var(--color-border) 100%); content: ''; }
@media (max-width: 760px) {
  .experience-heading { margin-bottom: 28px; }
  .experience-timeline { gap: 24px; }
}
</style>
