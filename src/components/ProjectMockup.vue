<script setup>
defineProps({
  variant: {
    type: String,
    default: 'dashboard',
  },
  title: {
    type: String,
    default: 'Project screenshot',
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="project-mockup" :class="[`is-${variant}`, { 'is-compact': compact }]" role="img" :aria-label="title">
    <aside class="mock-sidebar">
      <strong>EasyColoc</strong>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </aside>
    <main class="mock-screen">
      <header class="mock-toolbar">
        <b>{{ title }}</b>
        <i></i>
      </header>
      <section class="mock-stats">
        <span><strong>1,250 DH</strong><small>Total</small></span>
        <span><strong>+120 DH</strong><small>Balance</small></span>
        <span><strong>200 DH</strong><small>Pending</small></span>
      </section>
      <div class="mock-content">
        <div class="mock-chart">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <ul class="mock-list">
          <li><span></span><b></b></li>
          <li><span></span><b></b></li>
          <li><span></span><b></b></li>
          <li><span></span><b></b></li>
        </ul>
      </div>
    </main>
  </div>
</template>
