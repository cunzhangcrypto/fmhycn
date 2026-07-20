<script setup lang="ts">
import { onMounted, ref } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return
  if (containerRef.value.dataset.loaded === 'true') return

  const script = document.createElement('script')
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.src =
    'https://pl30443546.effectivecpmnetwork.com/c597ef79dbf5a90f64aee8cd80f5534a/invoke.js'
  containerRef.value.appendChild(script)

  containerRef.value.dataset.loaded = 'true'
})
</script>

<template>
  <div ref="containerRef" class="native-banner-container">
    <div id="container-c597ef79dbf5a90f64aee8cd80f5534a" />
  </div>
</template>

<style scoped>
.native-banner-container {
  display: flex;
  justify-content: center;
  margin-top: 48px;
  padding: 16px 0;
  width: 100%;
}
</style>
