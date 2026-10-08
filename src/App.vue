<script setup>
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useScrollReveal } from './composables/useScrollReveal'

const route = useRoute()
const { reveal } = useScrollReveal()

watch(
  () => route.fullPath,
  () => {
    reveal()
    window.setTimeout(reveal, 220)
    window.setTimeout(reveal, 520)
  },
  { flush: 'post' },
)
</script>

<template>
  <Navbar />
  <main class="app-main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="route-fade" mode="out-in" @after-enter="reveal">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </main>
  <Footer />
</template>
