<script setup>
import { computed } from 'vue'
import CertificateCard from '../components/CertificateCard.vue'
import { certificates } from '../data/certificates'

const certificationCountLabel = computed(() => `${certificates.length} Certifications`)
</script>

<template>
  <section class="page certifications-page container" data-reveal>
    <header class="page-header">
      <p class="page-kicker"><i class="fa-solid fa-award" aria-hidden="true"></i> Certifications</p>
      <h1>Certifications</h1>
      <p>
        Continuous learning through courses, certifications and professional training.
      </p>
      <div class="certifications-summary">
        <span>{{ certificationCountLabel }}</span>
      </div>
    </header>

    <div class="certificates-grid page-certificates-grid">
      <CertificateCard
        v-for="certificate in certificates"
        :key="certificate.id"
        :certificate="certificate"
      />
    </div>
  </section>
</template>
