<!-- eslint-disable vue/require-v-for-key -->
<script setup lang="ts">
import { data as posts } from './posts.data'

const formatDate = (raw: string): string => {
  const date = new Date(raw)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div>
    <section>
      <h1 class="flex items-center gap-2">动态</h1>
      <p>每月更新、公告及更多内容。</p>
      本网站由Web3村长翻译FMHY并维护更新——
      <a href="https://www.cunzhangblog.com" target="_blank" title="web3村长博客">
  
        https://cunzhangblog.com/
      </a>
       <p>FMHY全球站——<a href="https://fmhy.net/" target="_blank" title="web3村长博客">https://fmhy.net/
      </a>
      </p>
    </section>
    <template v-for="year in Object.keys(posts).reverse()" :key="year">
      <h2>{{ year }}</h2>
      <ul>
        <li v-for="post of posts[year]" :key="post.url">
          <article>
            <a :href="post.url" class="border-none">{{ post.title }}</a>
            -
            <dl class="m-0 inline">
              <dt class="sr-only">Published on</dt>
              <dd class="m-0 inline">
                <time :datetime="post.date" class="font-bold">
                  {{ formatDate(post.date) }}
                </time>
              </dd>
            </dl>
          </article>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.VPBadge {
  border: 1px solid transparent;
  border-radius: 8px;
  display: inline-flex;
  margin-left: 2px;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(-2px);
  align-items: center;
  gap: 0.2rem;
  padding-right: 10px;
  vertical-align: middle;
  color: var(--vp-badge-tip-text);
  background-color: transparent;
  border-color: var(--vp-custom-block-tip-outline);
}
</style>
