<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { socials } from '../data/socials'
import { contactEmail, profileUrl, gmailComposeUrl } from '../data/contact'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const draftNotice = ref('')
const copyNotice = ref('')
const body = computed(() => `Name: ${name.value.trim()}\nReply email: ${email.value.trim()}\n\n${message.value.trim()}`)
const github = socials.find((social) => social.name === 'GitHub')
const linkedin = socials.find((social) => social.name === 'LinkedIn')

function openDraft() {
  draftNotice.value = 'Gmail opens in a new tab. Review your draft, then click Send.'
}

async function copyProfile() {
  try {
    await navigator.clipboard.writeText(profileUrl)
    copyNotice.value = 'Profile link copied.'
  } catch {
    copyNotice.value = 'You can select and copy the profile link above.'
  }
}
</script>

<template>
  <section class="page container contact-page contact-redesign" data-reveal>
    <header class="page-header contact-heading">
      <p class="page-kicker"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Contact</p>
      <h1>Let's Get in <span>Touch</span></h1>
      <p>I'm open to new opportunities, collaborations, or just a friendly chat about technology and projects.</p>
    </header>

    <div class="contact-workspace">
      <section class="section-card message-panel" aria-labelledby="message-heading">
        <h2 id="message-heading"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Send Me a Message</h2>
        <form action="https://mail.google.com/mail/" method="get" target="_blank" rel="noopener noreferrer" @submit="openDraft">
          <input type="hidden" name="view" value="cm" />
          <input type="hidden" name="fs" value="1" />
          <input type="hidden" name="to" :value="contactEmail" />
          <input type="hidden" name="body" :value="body" />

          <div class="contact-field-pair">
            <div class="contact-field">
              <label for="contact-name">Your Name</label>
              <div class="contact-input-wrap">
                <i class="fa-regular fa-user" aria-hidden="true"></i>
                <input id="contact-name" v-model="name" type="text" autocomplete="name" maxlength="100" placeholder="Enter your name" required />
              </div>
            </div>
            <div class="contact-field">
              <label for="contact-email">Your Email</label>
              <div class="contact-input-wrap">
                <i class="fa-regular fa-envelope" aria-hidden="true"></i>
                <input id="contact-email" v-model="email" type="email" autocomplete="email" maxlength="254" placeholder="Enter your email" required />
              </div>
            </div>
          </div>

          <div class="contact-field">
            <label for="contact-subject">Subject</label>
            <div class="contact-input-wrap">
              <i class="fa-solid fa-tag" aria-hidden="true"></i>
              <input id="contact-subject" v-model="subject" name="su" type="text" maxlength="180" placeholder="Enter a subject" required />
            </div>
          </div>

          <div class="contact-field">
            <label for="contact-message">Your Message</label>
            <div class="contact-input-wrap contact-textarea-wrap">
              <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
              <textarea id="contact-message" v-model="message" maxlength="4000" rows="5" placeholder="Write your message here..." required></textarea>
            </div>
          </div>

          <button class="btn btn-primary contact-send-button" type="submit"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send with Gmail</button>
          <p class="contact-form-hint">Opens Gmail with your message ready to review and send to {{ contactEmail }}.</p>
          <p v-if="draftNotice" class="contact-feedback" role="status">{{ draftNotice }}</p>
        </form>
      </section>

      <section class="section-card contact-qr-panel" aria-labelledby="contact-qr-heading">
        <div class="contact-qr-heading">
          <span class="contact-qr-icon"><i class="fa-solid fa-qrcode" aria-hidden="true"></i></span>
          <div>
            <h2 id="contact-qr-heading">My QR Profile</h2>
            <p>Scan the QR code to view my complete profile.</p>
          </div>
        </div>

        <div class="contact-qr-showcase">
          <a class="contact-qr-image" :href="profileUrl" target="_blank" rel="noopener noreferrer" aria-label="Open Noureddine Zouana's QR Profile">
            <img src="/images/qr/noureddine-profile.svg" width="224" height="224" alt="Scan to visit Noureddine Zouana's profile on qrprofile.live" />
          </a>
          <ul class="contact-profile-links">
            <li><a :href="profileUrl" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-user" aria-hidden="true"></i> My Profile</a></li>
            <li><RouterLink to="/projects"><i class="fa-solid fa-code" aria-hidden="true"></i> My Projects</RouterLink></li>
            <li><RouterLink to="/certifications"><i class="fa-solid fa-award" aria-hidden="true"></i> My Certifications</RouterLink></li>
            <li><a :href="profileUrl" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-link" aria-hidden="true"></i> All My Links</a></li>
          </ul>
        </div>

        <div class="contact-profile-address">
          <i class="fa-solid fa-link" aria-hidden="true"></i>
          <a :href="profileUrl" target="_blank" rel="noopener noreferrer">qrprofile.live/p/noureddine-zouana</a>
          <button type="button" aria-label="Copy profile link" @click="copyProfile"><i class="fa-regular fa-copy" aria-hidden="true"></i></button>
        </div>
        <p v-if="copyNotice" class="contact-feedback" role="status">{{ copyNotice }}</p>
        <a class="btn btn-primary contact-open-profile" :href="profileUrl" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Open My Profile</a>
      </section>
    </div>

    <div class="contact-channel-grid">
      <a class="section-card contact-channel" :href="gmailComposeUrl" target="_blank" rel="noopener noreferrer">
        <span><i class="fa-solid fa-envelope" aria-hidden="true"></i></span>
        <div><strong>Email</strong><small>{{ contactEmail }}</small></div>
      </a>
      <a class="section-card contact-channel" :href="github.url" target="_blank" rel="noopener noreferrer">
        <span><i class="fa-brands fa-github" aria-hidden="true"></i></span>
        <div><strong>GitHub</strong><small>{{ github.label }}</small></div>
      </a>
      <a class="section-card contact-channel" :href="linkedin.url" target="_blank" rel="noopener noreferrer">
        <span><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></span>
        <div><strong>LinkedIn</strong><small>linkedin.com/in/noureddine-zouana</small></div>
      </a>
      <div class="section-card contact-channel">
        <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i></span>
        <div><strong>Location</strong><small>Safi, Morocco</small></div>
      </div>
    </div>
  </section>
</template>
