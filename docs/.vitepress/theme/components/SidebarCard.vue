<script setup lang="ts">
import Field from './CardField.vue'
import ColorPicker from './ColorPicker.vue'
import InputField from './InputField.vue'
import ThemeSelector from './ThemeSelector.vue'
import ToggleIndexes from './ToggleIndexes.vue'
import ToggleStarred from './ToggleStarred.vue'
</script>

<template>
  <div
    class="bg-$vp-c-bg hover:bg-$vp-c-bg/40 border-$vp-c-default-soft hover:border-primary transition-border relative z-0 rounded-lg border-2 border-solid p-5 duration-500"
  >
<div class="mb-5 p-3 rounded-xl border border-solid border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 transition-all">
  <div class="flex items-center gap-2 text-xs font-bold text-amber-500 mb-1">
    <span class="i-twemoji:wrapped-gift"></span> 黄金赞助商推荐
  </div>
  <a href="https://geonix.com/?partner_link=hr7qyBUuqy" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between no-underline hover:no-underline group">
    <div class="flex flex-col gap-0.5">
      <span class="text-sm font-bold text-$vp-c-text-1 group-hover:text-amber-500 transition-colors">
        本站由 <span class="text-amber-500 font-extrabold">Geonix</span> 赞助
      </span>
      <span class="text-xs text-$vp-c-text-2">
        机房/住宅ip跨境首选，安全稳定
      </span>
    </div>
    <span class="i-carbon:arrow-up-right text-amber-500 font-bold text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></span>
  </a>
</div>

<div class="align-center mb-3 flex justify-between">
  <div class="text-$vp-c-text-1 lh-relaxed text-sm font-bold">
    Emoji 图例
  </div>
</div>
<Field icon="i-twemoji-globe-with-meridians">索引</Field>
<Field icon="i-twemoji-repeat-button">章节链接</Field>
<Field icon="i-twemoji-star">社区推荐</Field>
    <div class="align-center mb-4 mt-4 flex justify-between">
      <div class="text-$vp-c-text-1 lh-relaxed text-sm font-bold">Options</div>
    </div>
    <InputField id="toggle-starred" label="切换星标">
      <template #display>
        <ToggleStarred />
      </template>
    </InputField>
    <InputField id="toggle-indexes" label="切换索引">
      <template #display>
        <ToggleIndexes />
      </template>
    </InputField>

    <div class="mt-4">
      <ColorPicker />
    </div>

    <div class="mt-6 pt-6 border-t border-$vp-c-divider">
      <ThemeSelector />
    </div>
  </div>
</template>
