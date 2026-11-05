<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { experiencePage, experienceTechnologyIcons } from '../data/experiences'

const props = defineProps({ experience: { type: Object, required: true } })
const detail = computed(() => props.experience.timeline)
const points = computed(() => props.experience.points.filter((point) => point?.trim()))
const logoAvailable = ref(false)
const projectAvailable = ref(false)
const reportAvailable = ref(false)
const controller = new AbortController()

async function assetAvailable(src, mimePrefix) {
  if (!src) return false
  try {
    const response = await fetch(src, { method: 'HEAD', signal: controller.signal })
    // Vite's SPA fallback returns HTML for missing files; it is never a real asset.
    return response.ok && (response.headers.get('content-type') || '').toLowerCase().startsWith(mimePrefix)
  } catch {
    return false
  }
}

onMounted(async () => {
  const [logo, project, report] = await Promise.all([
    assetAvailable(detail.value.logo?.src, 'image/'),
    assetAvailable(detail.value.project?.image, 'image/'),
    assetAvailable(detail.value.report?.src, 'application/pdf'),
  ])
  logoAvailable.value = logo
  projectAvailable.value = project
  reportAvailable.value = report
})
onUnmounted(() => controller.abort())
</script>

<template>
  <li class="experience-event" :class="{ 'is-featured': detail.featured }">
    <span class="experience-marker" aria-hidden="true"></span>

    <div class="experience-date">
      <p class="experience-period">
        <template v-if="detail.start"><time :datetime="detail.start">{{ detail.period.split(' – ')[0] }}</time><span aria-hidden="true"> – </span><time :datetime="detail.end">{{ detail.period.split(' – ')[1] }}</time></template>
        <template v-else>{{ detail.period }}</template>
      </p>
      <span class="experience-kind">{{ detail.duration || detail.category }}</span>
      <small v-if="detail.duration">{{ detail.category }}</small>
    </div>

    <article class="experience-card" :aria-labelledby="`experience-${experience.id}`">
      <div class="experience-card-main">
        <header class="experience-card-header">
          <div class="experience-identity" :class="{ 'has-logo': logoAvailable }">
            <img v-if="logoAvailable" :src="detail.logo.src" :alt="detail.logo.alt" width="80" height="64" @error="logoAvailable = false" />
            <i v-else :class="detail.icon" aria-hidden="true"></i>
          </div>
          <div class="experience-titles">
            <p class="experience-eyebrow">{{ detail.identityLabel }}</p>
            <h2 :id="`experience-${experience.id}`">{{ experience.organization }}</h2>
            <p class="experience-role">{{ experience.role }}</p>
          </div>
        </header>

        <p class="experience-description">{{ experience.description }}</p>
        <section v-if="points.length" class="experience-responsibilities" :aria-labelledby="`scope-${experience.id}`">
          <h3 :id="`scope-${experience.id}`">{{ detail.sectionTitle }}</h3>
          <ul>
            <li v-for="point in points" :key="point"><i class="fa-solid fa-check" aria-hidden="true"></i><span>{{ point }}</span></li>
          </ul>
        </section>

        <ul class="experience-technologies" :aria-label="experiencePage.technologiesLabel">
          <li v-for="technology in detail.technologies" :key="technology">
            <i :class="experienceTechnologyIcons[technology] || 'fa-solid fa-code'" aria-hidden="true"></i>{{ technology }}
          </li>
        </ul>

        <div v-if="detail.report || detail.action" class="experience-actions">
          <template v-if="detail.report">
            <a v-if="reportAvailable" class="btn btn-primary experience-action" :href="detail.report.src" target="_blank" rel="noopener noreferrer"><i class="fa-regular fa-file-pdf" aria-hidden="true"></i>{{ detail.report.label }}<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
            <template v-else>
              <button class="btn experience-action experience-report-unavailable" type="button" disabled :aria-describedby="`report-note-${experience.id}`"><i class="fa-regular fa-file-pdf" aria-hidden="true"></i>{{ detail.report.label }}</button>
              <p :id="`report-note-${experience.id}`" class="experience-asset-note">{{ detail.report.unavailableLabel }}</p>
            </template>
          </template>
          <RouterLink v-if="detail.action" class="btn btn-secondary experience-action" :to="detail.action.to">{{ detail.action.label }}<i :class="detail.action.icon" aria-hidden="true"></i></RouterLink>
        </div>
      </div>

      <aside v-if="detail.project" class="experience-project" :aria-label="detail.project.label">
        <p class="experience-project-label">{{ detail.project.label }}</p>
        <a v-if="projectAvailable" class="experience-project-image" :href="detail.project.image" target="_blank" rel="noopener noreferrer">
          <img :src="detail.project.image" :alt="detail.project.alt" width="640" height="400" @error="projectAvailable = false" />
        </a>
        <div v-else class="experience-project-placeholder">
          <i :class="detail.project.icon" aria-hidden="true"></i>
          <span>{{ detail.project.unavailableLabel }}</span>
        </div>
        <h3>{{ detail.project.title }}</h3>
        <p>{{ detail.project.description }}</p>
      </aside>
    </article>
  </li>
</template>

<style scoped>
.experience-event { position: relative; display: grid; grid-template-columns: 174px minmax(0, 1fr); align-items: start; gap: 28px; padding-left: 42px; min-width: 0; }
.experience-marker { position: absolute; z-index: 1; left: 2px; top: 25px; width: 18px; height: 18px; border: 4px solid var(--color-bg); border-radius: 50%; background: #4285f4; box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.24); }
.is-featured .experience-marker { box-shadow: 0 0 0 5px rgba(66, 133, 244, 0.13); }
.experience-date { display: grid; padding-top: 23px; gap: 10px; }
.experience-period { margin: 0; color: var(--color-text); font-size: 0.95rem; font-weight: 800; line-height: 1.65; }
.experience-kind { width: fit-content; max-width: 100%; padding: 5px 11px; border: 1px solid var(--color-border); border-radius: 999px; color: var(--color-primary-dark); background: var(--color-primary-soft); font-size: 0.76rem; font-weight: 700; line-height: 1.5; }
.experience-date small { color: var(--color-muted); font-size: 0.8rem; }
.experience-card { display: grid; min-width: 0; padding: 28px; border: 1px solid var(--color-border); border-radius: 20px; background: var(--color-surface); box-shadow: 0 10px 30px rgba(30, 91, 166, 0.055); transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease; }
.experience-card:hover { border-color: rgba(66, 133, 244, 0.5); box-shadow: 0 16px 35px rgba(30, 91, 166, 0.11); transform: translateY(-2px); }
.is-featured .experience-card { grid-template-columns: minmax(0, 1fr) 280px; gap: 28px; border-top: 3px solid #4285f4; background: linear-gradient(135deg, rgba(66, 133, 244, 0.05), transparent 55%), var(--color-surface); }
.experience-card-main { min-width: 0; }
.experience-card-header { display: flex; align-items: center; gap: 18px; margin-bottom: 20px; }
.experience-identity { display: grid; flex: 0 0 auto; width: 72px; height: 66px; border: 1px solid var(--color-border); border-radius: 14px; place-items: center; background: var(--color-primary-soft); color: var(--color-primary); font-size: 1.8rem; }
.experience-identity.has-logo { background: #fff; padding: 6px; }
.experience-identity img { display: block; width: 100%; height: auto; object-fit: contain; }
.experience-titles { min-width: 0; }
.experience-eyebrow { margin: 0 0 5px; color: var(--color-muted); font-size: 0.68rem; font-weight: 750; line-height: 1.5; letter-spacing: 0.09em; text-transform: uppercase; }
.experience-titles h2 { margin: 0; color: var(--color-text); font-size: clamp(1.25rem, 2vw, 1.6rem); font-weight: 800; line-height: 1.25; letter-spacing: -0.02em; }
.experience-role { margin: 6px 0 0; color: var(--color-primary-dark); font-weight: 750; font-size: 0.95rem; line-height: 1.5; }
.experience-description { margin: 0; color: var(--color-muted); font-size: 0.95rem; line-height: 1.8; }
.experience-responsibilities { margin-top: 22px; }
.experience-responsibilities h3 { margin: 0 0 12px; color: var(--color-text); font-size: 0.85rem; font-weight: 750; line-height: 1.5; }
.experience-responsibilities ul { display: grid; margin: 0; padding: 0; list-style: none; gap: 10px; }
.experience-responsibilities li { display: flex; align-items: flex-start; gap: 10px; color: var(--color-muted); font-size: 0.88rem; line-height: 1.7; }
.experience-responsibilities li > i { flex: 0 0 auto; margin-top: 6px; color: #4285f4; font-size: 0.75rem; }
.experience-technologies { display: flex; flex-wrap: wrap; margin: 22px 0 0; padding: 0; list-style: none; gap: 8px; }
.experience-technologies li { display: inline-flex; align-items: center; min-height: 32px; padding: 5px 10px; border: 1px solid var(--color-border); border-radius: 999px; background: var(--color-primary-soft); color: var(--color-text); font-size: 0.75rem; font-weight: 650; line-height: 1.4; gap: 7px; }
.experience-technologies i { color: var(--color-primary); font-size: 0.95rem; }
.experience-actions { display: flex; flex-direction: column; align-items: flex-start; margin-top: 24px; gap: 9px; }
.experience-action { min-height: 44px; font-size: 0.83rem; padding: 10px 15px; line-height: 1.5; }
.experience-report-unavailable { border: 1px solid var(--color-border); background: var(--color-primary-soft); color: var(--color-muted); box-shadow: none; cursor: not-allowed; }
.experience-report-unavailable:hover { transform: none; }
.experience-asset-note { margin: 0; color: var(--color-muted); font-size: 0.75rem; line-height: 1.6; }
.experience-project { align-self: start; min-width: 0; margin-top: 3px; padding: 18px; border: 1px solid var(--color-border); border-radius: 16px; background: var(--color-primary-soft); }
.experience-project-label { margin: 0 0 14px; color: var(--color-muted); font-size: 0.68rem; font-weight: 750; text-transform: uppercase; letter-spacing: 0.1em; }
.experience-project-image { display: block; overflow: hidden; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-surface-strong); }
.experience-project-image img { display: block; width: 100%; height: auto; }
.experience-project-placeholder { display: grid; aspect-ratio: 16 / 11; padding: 20px; border: 1px dashed var(--color-border); border-radius: 10px; align-content: center; justify-items: center; text-align: center; background: var(--color-surface); gap: 14px; }
.experience-project-placeholder > i { color: var(--color-primary); font-size: 2rem; }
.experience-project-placeholder > span { max-width: 180px; color: var(--color-muted); font-size: 0.76rem; line-height: 1.7; }
.experience-project h3 { margin: 18px 0 8px; color: var(--color-text); font-size: 1rem; line-height: 1.4; }
.experience-project > p:last-child { margin: 0; color: var(--color-muted); font-size: 0.8rem; line-height: 1.7; }
:root[data-theme='dark'] .experience-role,
:root[data-theme='dark'] .experience-kind { color: #90bdff; }
@media (max-width: 1180px) {
  .experience-event { grid-template-columns: 150px minmax(0, 1fr); gap: 20px; }
  .is-featured .experience-card { grid-template-columns: minmax(0, 1fr); }
  .experience-project { display: grid; grid-template-columns: minmax(130px, 0.7fr) minmax(0, 1fr); align-items: center; column-gap: 20px; }
  .experience-project-label { grid-column: 1 / -1; }
  .experience-project-placeholder, .experience-project-image { grid-column: 1; grid-row: 2 / 4; }
  .experience-project h3 { margin-top: 0; }
}
@media (max-width: 760px) {
  .experience-event { grid-template-columns: minmax(0, 1fr); gap: 14px; padding-left: 35px; }
  .experience-date { padding-top: 0; grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .experience-marker { top: 7px; }
  .experience-card { padding: 22px; border-radius: 17px; }
  .experience-card-header { gap: 14px; }
  .experience-identity { width: 58px; height: 58px; font-size: 1.4rem; }
  .experience-project { display: block; }
  .experience-project h3 { margin-top: 16px; }
}
@media (max-width: 420px) {
  .experience-card { padding: 18px; }
  .experience-card-header { align-items: flex-start; flex-direction: column; }
  .experience-action { width: 100%; white-space: normal; }
  .experience-technologies li { padding-inline: 8px; font-size: 0.72rem; }
}
@media (prefers-reduced-motion: reduce) {
  .experience-card { transition: none; }
  .experience-card:hover { transform: none; }
}
</style>
