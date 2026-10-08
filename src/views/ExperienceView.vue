<script setup>
import { experiences } from '../data/experiences'
</script>

<template>
  <section class="page container" data-reveal>
    <header class="page-header">
      <p class="page-kicker"><i class="fa-solid fa-briefcase" aria-hidden="true"></i> Experience</p>
      <h1>Experience</h1>
      <p>
        A focused timeline of my training and project work, showing how I build, learn, and improve
        across full-stack web development.
      </p>
    </header>

    <div class="section-card experience-page-card">
      <div class="timeline page-timeline">
        <article v-for="experience in experiences" :key="experience.period" class="timeline-item">
          <time>{{ experience.period }}</time>
          <div>
            <h3>{{ experience.organization }}</h3>
            <p class="timeline-role">{{ experience.role }}</p>
            <p class="muted-copy">{{ experience.description }}</p>
            <ul>
              <li v-for="point in experience.points" :key="point">{{ point }}</li>
            </ul>
            <div class="tag-list">
              <span v-for="technology in experience.technologies" :key="technology">{{ technology }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
