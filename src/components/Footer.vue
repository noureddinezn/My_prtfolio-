<script setup>
import { RouterLink } from 'vue-router'
import { socials } from '../data/socials'
import { technologies } from '../data/technologies'
import { profileUrl } from '../data/contact'

const year = new Date().getFullYear()
const links = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Contact', to: '/contact' },
]
const stack = ['Vue.js', 'React', 'Laravel', 'JavaScript', 'PostgreSQL', 'Docker', 'Git', 'CI/CD']
  .map((name) => technologies.find((item) => item.name === name))
const footerSocials = socials.filter((social) => social.url)

function backToTop() {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
</script>

<template>
  <footer class="portfolio-footer">
    <svg class="footer-waves" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="footer-wave-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1262d9" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#071730" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="footer-wave-line">
          <stop offset="0%" stop-color="#4194ff" />
          <stop offset="38%" stop-color="#174595" stop-opacity="0.2" />
          <stop offset="73%" stop-color="#174595" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#4194ff" />
        </linearGradient>
      </defs>
      <path d="M0 75 C170 -20 265 155 450 105 S650 45 810 115 S1010 50 1130 100 S1320 -10 1440 38 V220 H0Z" fill="url(#footer-wave-fill)" />
      <path d="M0 75 C170 -20 265 155 450 105 S650 45 810 115 S1010 50 1130 100 S1320 -10 1440 38" fill="none" stroke="url(#footer-wave-line)" stroke-width="2" />
    </svg>

    <div class="portfolio-footer-inner container">
      <div class="portfolio-footer-grid">
        <section class="footer-intro" aria-label="About Noureddine">
          <RouterLink class="portfolio-footer-brand" to="/">Noureddine<span>.</span></RouterLink>
          <p>Full Stack Developer passionate about building modern, scalable and user-friendly web applications.</p>
          <div class="portfolio-footer-socials" aria-label="Social links">
            <a v-for="social in footerSocials" :key="social.name" :href="social.url" :aria-label="social.name" :title="social.name" target="_blank" rel="noopener noreferrer">
              <i :class="social.icon" aria-hidden="true"></i>
            </a>
          </div>
        </section>

        <nav class="footer-link-column" aria-label="Footer navigation">
          <h2><i class="fa-solid fa-link" aria-hidden="true"></i> Quick Links</h2>
          <ul>
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <section class="footer-tech-column" aria-labelledby="footer-tech-heading">
          <h2 id="footer-tech-heading"><i class="fa-solid fa-code" aria-hidden="true"></i> Technologies</h2>
          <div class="footer-tech-list">
            <span v-for="tech in stack" :key="tech.name">
              <i :class="tech.icon" :style="{ color: tech.color }" aria-hidden="true"></i>{{ tech.name }}
            </span>
          </div>
        </section>

        <section class="footer-connect" aria-labelledby="footer-connect-heading">
          <h2 id="footer-connect-heading"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Let's Connect</h2>
          <p class="footer-scan-label">Scan my <strong>QR Profile</strong></p>
          <div class="footer-profile-card">
            <a class="footer-qr-link" :href="profileUrl" target="_blank" rel="noopener noreferrer" aria-label="Open Noureddine Zouana's QR Profile">
              <img src="/images/qr/noureddine-profile.svg" width="144" height="144" alt="QR code for Noureddine Zouana's profile on qrprofile.live" />
            </a>
            <div class="footer-profile-copy">
              <p>View my complete profile, projects and social links.</p>
              <a class="footer-contact-button footer-profile-button" :href="profileUrl" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Open Profile
              </a>
            </div>
          </div>
        </section>
      </div>

      <div class="portfolio-footer-bottom">
        <p>© {{ year }} Noureddine Zouana. All rights reserved.</p>
        <p class="footer-built"><i class="fa-solid fa-code" aria-hidden="true"></i> Built with Vue.js <i class="fa-solid fa-heart" aria-hidden="true"></i> and passion</p>
        <button class="footer-top-button" type="button" @click="backToTop">Back to Top <span><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></span></button>
      </div>
    </div>
  </footer>
</template>
