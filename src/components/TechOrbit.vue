<script setup>
import profileImage from '../assets/images/profile.png'
import { technologies } from '../data/technologies'

const orbitTechnologies = technologies.filter((technology) => technology.showInOrbit !== false)
</script>

<template>
  <div class="orbit-wrap" aria-label="Technology orbit">
    <div class="orbit-ring"></div>
    <div class="profile-frame">
      <img :src="profileImage" alt="Noureddine Zouana" />
    </div>

    <div
      v-for="(tech, index) in orbitTechnologies"
      :key="tech.name"
      class="tech-node"
      :style="{
        '--angle': `${index * (360 / orbitTechnologies.length) - 90}deg`,
        '--tech-color': tech.color,
      }"
    >
      <span class="tech-badge">
        <i :class="tech.icon" aria-hidden="true"></i>
      </span>
      <strong>{{ tech.name }}</strong>
    </div>
  </div>
</template>
