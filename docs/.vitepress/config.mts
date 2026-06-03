import { fileURLToPath } from 'node:url'
import consola from 'consola'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import OptimizeExclude from 'vite-plugin-optimize-exclude'
import { VitePWA } from 'vite-plugin-pwa'
import Terminal from 'vite-plugin-terminal'
import { defineConfig } from 'vitepress'
import {
  commitRef,
  feedback,
  meta,
  nav,
  search,
  sidebar,
  socialLinks
} from './constants'
import { generateFeed, generateImages, generateMeta } from './hooks'
import { defs, emojiRender, movePlugin } from './markdown/emoji'
import { headersPlugin } from './markdown/headers'
import { toggleStarredPlugin } from './markdown/toggleStarred'
import { transformsPlugin } from './transformer'
import { replaceNoteLink } from './utils/markdown'

// @unocss-include

const baseUrl = process.env.GITHUB_ACTIONS ? '/edit' : '/'
export default defineConfig({
  title: 'FMHY中文/村长AI工具箱', // 汉化网站标题
  description: meta.description,
  titleTemplate: 'FMHY中文站&村长AI工具箱',
  lang: 'zh-CN', // 更改为中文语境
  lastUpdated: false,
  cleanUrls: true,
  appearance: true,
  base: baseUrl,
  srcExclude: ['README.md', 'public/single-page.md', 'single-page'],
  ignoreDeadLinks: true,
  sitemap: {
    hostname: meta.hostname
  },
  head: [
    ['meta', { name: 'theme-color', content: '#7bc5e4' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }], // 更改为中文区域
    ['link', { rel: 'icon', href: '/test.png' }],
    [
      'link',
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'FMHY RSS Feed',
        href: '/feed.rss'
      }
    ],
    // PWA
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'icon', href: '/pwa_icon.png', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/pwa_icon.png' }],
    ['link', { rel: 'mask-icon', href: '/pwa_icon.png', color: '#000000ff' }],
    ['meta', { name: 'keywords', content: meta.keywords.join(' ') }],
    [
      'link',
      { rel: 'apple-touch-icon', href: '/pwa_icon.png', sizes: '192x192' }
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
    ],
    // Bing site verification
    [
      'meta',
      {
        name: 'msvalidate.01',
        content: 'F3028112EF6F929B562F4B18E58E3691'
      }
    ],
    // Google site verification
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'XCq-ZTw6VJPQ7gVNEOl8u0JRqfadK7WcsJ0H598Wv9E'
      }
    ],
    // Redirect to main site if embedded in iframe
    [
      'script',
      {},
      `
        (function() {
          if (window.self !== window.top) {
              window.top.location = window.location.href;
          }
        })();
        `
    ],
    // Apply the saved theme synchronously before the page paints
    [
      'script',
      {},
      `
        (function() {
          try {
            var d = document.documentElement;
            var mode = localStorage.getItem('vitepress-display-mode');
            var amoled = localStorage.getItem('vitepress-amoled-enabled') === 'true';
            var themeName = localStorage.getItem('vitepress-theme-name');
            var varsJson = localStorage.getItem('vitepress-theme-vars');

            if (!mode) {
              mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            if (mode === 'dark') {
              d.classList.add('dark');
              d.classList.remove('light');
            } else {
              d.classList.add('light');
              d.classList.remove('dark');
            }

            if (mode === 'dark' && amoled) d.classList.add('amoled');
            else d.classList.remove('amoled');

            if (themeName === 'monochrome') d.classList.add('monochrome');
            else d.classList.remove('monochrome');

            if (varsJson) {
              var vars = JSON.parse(varsJson);
              for (var k in vars) {
                if (Object.prototype.hasOwnProperty.call(vars, k) && k.indexOf('--vp-') === 0) {
                  d.style.setProperty(k, vars[k]);
                }
              }
            }
          } catch (e) {}
        })();
        `
    ]
  ],
  transformHead: async (context) => generateMeta(context, meta.hostname),
  buildEnd: async (context) => {
    try {
      await generateImages(context)
      await generateFeed(context)
    } finally {
      consola.success('Success!')
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },

    resolve: {
      alias: [
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/ThemeDropdown.vue', import.meta.url)
          )
        },
        {
          find: /^.*VPLocalSearchBox\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPLocalSearchBox.vue', import.meta.url)
          )
        },
        {
          find: /^.*VPNav\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNav.vue', import.meta.url)
          )
        }
      ]
    },
    optimizeDeps: { exclude: ['workbox-window'] },
    plugins: [
      OptimizeExclude(),
      Terminal({
        console: 'terminal',
        output: ['console', 'terminal']
      }),
      UnoCSS({
        configFile: fileURLToPath(
          new URL('../../unocss.config.ts', import.meta.url)
        )
      }),
      AutoImport({
        dts: '../.cache/imports.d.ts',
        imports: ['vue', 'vitepress'],
        vueTemplate: true,
        biomelintrc: {
          enabled: true,
          filepath: './.cache/imports.json'
        }
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        manifest: {
          name: 'FMHY - 免费开源资源导航站', // 汉化应用全称
          short_name: 'FMHY中文站', // 汉化应用简称
          description: '互联网上规模最大的免费资源、工具与索引库！', // 汉化描述
          theme_color: '#000000ff',
          background_color: '#000000ff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/fmhy.ico',
              sizes: '16x16',
              type: 'image/x-icon'
            },
            {
              src: '/pwa_icon.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/pwa_icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      }),
      transformsPlugin(),
      {
        name: 'custom:adjust-order',
        configResolved(c) {
          movePlugin(
            c.plugins as any,
            'vitepress',
            'before',
            'unocss:transformers:pre'
          )
          movePlugin(
            c.plugins as any,
            'custom:transform-content',
            'before',
            'vitepress'
          )
        }
      }
    ],
    build: {
      chunkSizeWarningLimit: Number.POSITIVE_INFINITY
    }
  },
  markdown: {
    emoji: { defs },
    config(md) {
      md.use(emojiRender)
      md.use(toggleStarredPlugin)
      meta.build.api && md.use(headersPlugin)
      replaceNoteLink(md)
    }
  },
  themeConfig: {
    // 保持原来的引用，但强行混入中文搜索 UI 的文本翻译，不破坏底层原有的 search 配置
    search: {
      ...search,
      options: {
        ...search?.options,
        miniSearch: {
          options: {
            // 额外注入中文分词，让你的中文网站改完后能搜得出来中文
            tokenize: (string) => string.match(/[\d\w.-]+|[\u4e00-\u9fa5]/g) || []
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true
          }
        },
        translations: {
          button: { buttonText: '搜索本站', buttonAriaLabel: '搜索本站' },
          modal: {
            searchIfEmptyLabel: '未找到相关工具',
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    footer: {
  copyright:
    `© ${new Date().getFullYear()} 本站数据源自开源项目 <a href="https://github.com/fmhy/edit" target="_blank" rel="noreferrer">FMHY</a> | 由 <a href="https://www.cunzhangblog.com" target="_blank" rel="noreferrer"><b>WEB3村长</b></a> 独立汉化并持续同步维护` +
    `<br/><span style="font-size: 0.85em; opacity: 0.8;">免责声明：本站仅作为互联网开源工具与自由资源索引，纯粹提供本地化技术交流，不存储、不托管任何实质性有版权的文件或媒体资源。<b>若站内收录的某些索引链接侵犯了您的合法权益，请联系 <a href="https://www.cunzhangblog.com/about" target="_blank">WEB3村长</a> 予以核实并删除。</b></span>`
      },
   
    outline: {
      label: '本页目录' // 汉化右侧小目录标题
    },
    docFooter: {
      prev: '上一页', // 汉化上一页按钮
      next: '下一页'  // 汉化下一页按钮
    },
    logo: {
      src: '/fmhy.ico',
      alt: 'FMHY Logo'
    },
    nav,
    sidebar,
    socialLinks
  }
})