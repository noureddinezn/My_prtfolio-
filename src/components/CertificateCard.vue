<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  certificate: {
    type: Object,
    required: true,
  },
})

const imageFailed = ref(false)

const hasCredential = computed(() => Boolean(props.certificate.credentialUrl))
const shouldShowImage = computed(() => Boolean(props.certificate.image) && !imageFailed.value)
const certificateDate = computed(() => props.certificate.date || props.certificate.year)
const skills = computed(() => props.certificate.skills || [])
const imageAlt = computed(() => {
  const provider = props.certificate.organization ? ` from ${props.certificate.organization}` : ''
  return `${props.certificate.title} certificate${provider}`
})

watch(
  () => props.certificate.image,
  () => {
    imageFailed.value = false
  },
)

const handleImageError = () => {
  imageFailed.value = true
}
</script>

<template>
  <article class="certificate-card" data-reveal>
    <a
      v-if="hasCredential && shouldShowImage"
      class="certificate-image is-clickable"
      :href="certificate.credentialUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`Open ${certificate.title} certificate`"
    >
      <img
        :src="certificate.image"
        :alt="imageAlt"
        loading="lazy"
        @error="handleImageError"
      />
      <span class="certificate-image-overlay" aria-hidden="true">
        View Certificate
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </span>
    </a>

    <div v-else class="certificate-image" :class="{ 'has-fallback': !shouldShowImage }">
      <img
        v-if="shouldShowImage"
        :src="certificate.image"
        :alt="imageAlt"
        loading="lazy"
        @error="handleImageError"
      />
      <div v-else class="certificate-fallback">
        <i class="fa-solid fa-award" aria-hidden="true"></i>
        <span>Certificate preview unavailable</span>
      </div>
    </div>

    <div class="certificate-info">
      <div class="certificate-heading">
        <h3>{{ certificate.title }}</h3>
        <div v-if="certificate.organization || certificateDate" class="certificate-issued">
          <span v-if="certificate.organization">{{ certificate.organization }}</span>
          <span v-if="certificateDate">
            <i class="fa-regular fa-calendar" aria-hidden="true"></i>
            {{ certificateDate }}
          </span>
        </div>
      </div>

      <p v-if="certificate.description" class="certificate-description">
        {{ certificate.description }}
      </p>

      <div v-if="skills.length" class="certificate-skills" aria-label="Certification skills">
        <span v-for="skill in skills" :key="skill">{{ skill }}</span>
      </div>

      <div v-if="hasCredential" class="certificate-actions">
        <a
          class="certificate-link"
          :href="certificate.credentialUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Certificate
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </article>
</template>
