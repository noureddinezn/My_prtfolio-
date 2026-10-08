<script setup>
import { socials } from '../data/socials'
</script>

<template>
  <section class="page container contact-page" data-reveal>
    <header class="page-header">
      <p class="page-kicker"><i class="fa-regular fa-envelope" aria-hidden="true"></i> Contact</p>
      <h1>Let's Build Something Together</h1>
      <p>
        I'm open to internships, junior developer roles, collaborations, and useful project ideas. Choose
        the channel that works best for you and I will be happy to connect.
      </p>
    </header>

    <div class="contact-page-layout">
      <div class="section-card contact-main-card">
        <span class="contact-icon"><i class="fa-regular fa-envelope" aria-hidden="true"></i></span>
        <h2>Ready to talk?</h2>
        <p>
          Send me a message about your project, opportunity, or question. I care about clear
          communication, thoughtful implementation, and building things that actually help people.
        </p>
        <a class="btn btn-primary" href="mailto:noureddine@example.com">
          Contact Me <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </div>

      <div class="contact-options">
        <a
          v-for="social in socials"
          :key="social.name"
          class="section-card contact-option"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i :class="social.icon" aria-hidden="true"></i>
          <span>
            <strong>{{ social.name }}</strong>
            {{ social.label }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
