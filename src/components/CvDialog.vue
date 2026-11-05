<script setup>
import { ref } from 'vue'
import { cv } from '../data/cv'

const dialog = ref(null)
const open = () => dialog.value?.showModal()
const close = () => dialog.value?.close()
const closeOnBackdrop = (event) => {
  if (event.target !== dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
}
defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="cv-dialog" aria-labelledby="cv-heading" aria-describedby="cv-description" @click="closeOnBackdrop">
      <button class="cv-close" type="button" aria-label="Close CV options" autofocus @click="close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      <header class="cv-header">
        <span class="cv-heading-icon"><i class="fa-regular fa-file-lines" aria-hidden="true"></i></span>
        <h2 id="cv-heading">{{ cv.title }}</h2>
      </header>
      <p id="cv-description" class="cv-description">{{ cv.description }}</p>
      <div class="cv-content">
        <div class="cv-illustration" aria-hidden="true">
          <div class="cv-paper"><strong>CV</strong><span></span><span></span><span></span><span></span></div>
          <span class="cv-download-icon"><i class="fa-solid fa-download"></i></span>
        </div>
        <ul class="cv-details">
          <li><span><i class="fa-solid fa-user" aria-hidden="true"></i></span>{{ cv.name }}</li>
          <li><span><i class="fa-solid fa-briefcase" aria-hidden="true"></i></span>{{ cv.role }}</li>
          <li><span><i class="fa-regular fa-file-pdf" aria-hidden="true"></i></span>{{ cv.format }}</li>
        </ul>
      </div>
      <div class="cv-actions">
        <a class="btn btn-secondary" :href="cv.source" target="_blank" rel="noopener noreferrer"><i class="fa-regular fa-eye" aria-hidden="true"></i>View CV<span class="sr-only"> (opens in a new tab)</span></a>
        <a class="btn btn-primary" :href="cv.file" :download="cv.filename"><i class="fa-solid fa-download" aria-hidden="true"></i>Download CV</a>
      </div>
      <svg class="cv-wave" viewBox="0 0 700 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 15 C140 -20 200 100 370 50 S570 10 700 65 V70 H0Z" fill="currentColor" /></svg>
    </dialog>
  </Teleport>
</template>

<style scoped>
.cv-dialog { position: fixed; inset: 0; width: min(700px, calc(100% - 32px)); max-height: calc(100dvh - 32px); margin: auto; padding: 38px 42px 64px; overflow-y: auto; border: 1px solid var(--color-border); border-radius: 28px; color: var(--color-text); background: var(--color-surface-strong); background-image: linear-gradient(135deg, transparent, var(--color-primary-soft)); box-shadow: 0 30px 90px rgba(0,20,60,.3); }
.cv-dialog::backdrop { background: rgba(8,24,49,.55); backdrop-filter: blur(6px); }
.cv-close { position: absolute; top: 18px; right: 18px; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: transparent; color: var(--color-muted); font-size: 1.4rem; cursor: pointer; }
.cv-close:hover { background: var(--color-primary-soft); color: var(--color-primary); }
.cv-header { display: flex; align-items: center; justify-content: center; gap: 14px; padding-right: 12px; }
.cv-header h2 { margin: 0; font-size: clamp(1.4rem, 3vw, 2rem); line-height: 1.3; letter-spacing: -.03em; }
.cv-heading-icon { display: grid; place-items: center; flex-shrink: 0; width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-soft); color: var(--color-primary); font-size: 1.8rem; }
.cv-description { margin: 18px auto 32px; max-width: 530px; text-align: center; color: var(--color-muted); line-height: 1.75; }
.cv-content { display: grid; grid-template-columns: 1fr 1.25fr; align-items: center; gap: 32px; margin-block: 12px 38px; }
.cv-illustration { position: relative; width: 170px; margin: 0 auto; padding: 10px 0; }
.cv-paper { display: grid; gap: 14px; padding: 24px 20px 32px; border: 2px solid rgba(66,133,244,.25); border-radius: 14px 40px 14px 14px; background: linear-gradient(145deg, var(--color-surface-strong), var(--color-primary-soft)); box-shadow: 0 18px 26px rgba(66,133,244,.18); }
.cv-paper strong { width: fit-content; padding: 3px 12px; margin-bottom: 2px; border-radius: 5px; color: white; background: #4285f4; font-size: 1.4rem; }
.cv-paper > span { height: 9px; border-radius: 8px; background: rgba(66,133,244,.3); }
.cv-paper > span:nth-last-child(2) { width: 72%; }
.cv-paper > span:last-child { width: 48%; }
.cv-download-icon { position: absolute; right: -12px; bottom: -3px; display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; color: white; background: #4285f4; font-size: 1.5rem; box-shadow: 0 8px 20px rgba(66,133,244,.25); }
.cv-details { display: grid; gap: 16px; margin: 0; padding: 0; list-style: none; }
.cv-details li { display: flex; align-items: center; gap: 12px; font-size: .98rem; line-height: 1.5; }
.cv-details li > span { display: grid; place-items: center; flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%; color: var(--color-primary); background: var(--color-primary-soft); }
.cv-actions { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.cv-actions .btn { min-height: 52px; border-radius: 13px; }
.cv-wave { position: absolute; bottom: 0; left: 0; width: 100%; height: 45px; color: rgba(66,133,244,.18); pointer-events: none; }
@media(max-width: 560px) {
  .cv-dialog { padding: 48px 22px 50px; border-radius: 22px; }
  .cv-header { gap: 10px; padding: 0; }
  .cv-heading-icon { width: 40px; height: 40px; font-size: 1.4rem; }
  .cv-description { font-size: .9rem; margin-bottom: 20px; }
  .cv-content { grid-template-columns: 1fr; gap: 28px; margin-bottom: 26px; }
  .cv-illustration { width: 130px; }
  .cv-paper { padding: 16px; gap: 10px; }
  .cv-download-icon { width: 44px; height: 44px; font-size: 1.2rem; }
  .cv-details { gap: 10px; width: fit-content; margin-inline: auto; }
  .cv-details li { font-size: .9rem; }
  .cv-details li > span { width: 34px; height: 34px; }
  .cv-actions { gap: 10px; }
  .cv-actions .btn { padding-inline: 10px; font-size: .85rem; }
}
@media(max-width: 350px) { .cv-actions { grid-template-columns: 1fr; } }
</style>
