<script setup lang="ts">
import { onMounted, ref } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!containerRef.value) return

  // 避免重复插入
  if (containerRef.value.dataset.loaded === 'true') return

  // 创建 atOptions 脚本
  const optionsScript = document.createElement('script')
  optionsScript.text = `
    atOptions = {
      'key' : 'da943ba3a88dac9b0d2782cd8cb04e45',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
  `
  containerRef.value.appendChild(optionsScript)

  // 创建 invoke.js 脚本
  const invokeScript = document.createElement('script')
  invokeScript.src = 'https://www.highperformanceformat.com/da943ba3a88dac9b0d2782cd8cb04e45/invoke.js'
  invokeScript.async = true
  containerRef.value.appendChild(invokeScript)

  containerRef.value.dataset.loaded = 'true'
})
</script>

<template>
  <div ref="containerRef" class="ad-banner-container" />
</template>

<style scoped>
.ad-banner-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
}
</style>
