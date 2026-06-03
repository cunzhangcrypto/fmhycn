/**
 * Copyright (c) 2025 taskylizard. Apache License 2.0.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { DefaultTheme } from 'vitepress'

// @unocss-include

export const meta = {
  name: 'freemediaheckyeah',
  description: '全球最大的免费开源资源、工具与超级索引导航站！',
  hostname: 'https://fmhy.net',
  keywords: ['stream', 'movies', 'gaming', 'reading', 'anime'],
  build: {
    api: true,
    nsfw: true
  }
}

export const excluded = [
  'readme.md',
  'single-page',
  'single-page.md',
  'feedback.md',
  'index.md',
  'sandbox.md',
  'startpage.md'
]

const safeEnv = (key: string) =>
  typeof process !== 'undefined' ? process.env?.[key] : undefined

if (safeEnv('FMHY_BUILD_NSFW') === 'false') {
  meta.build.nsfw = false
}
if (safeEnv('FMHY_BUILD_API') === 'false') {
  meta.build.api = false
}

const formatCommitRef = (commitRef: string) =>
  `<a href="https://github.com/fmhy/edit/commit/${commitRef}">${commitRef.slice(0, 8)}</a>`

const cfStart = safeEnv('CF_PAGES_COMMIT_SHA')
const commitStart = safeEnv('COMMIT_REF')

export const commitRef =
  safeEnv('CF_PAGES') && cfStart
    ? formatCommitRef(cfStart)
    : commitStart
      ? formatCommitRef(commitStart)
      : 'dev'

export const feedback = `<a href="/feedback" class="feedback-footer">意见反馈 ❤</a>`

export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: 'https://github.com/fmhy/edit' },
  { icon: 'discord', link: 'https://github.com/fmhy/FMHY/wiki/FMHY-Discord' },
  {
    icon: 'reddit',
    link: 'https://reddit.com/r/FREEMEDIAHECKYEAH'
  },
  { icon: 'telegram', link: 'https://t.me/cunzhangcrypto' }
]

export const nav: DefaultTheme.NavItem[] = [
  { text: '🌐 FMHY英文', link: 'https://fmhy.net/' },
  { text: '📖 Web3村长', link: 'https://www.cunzhangblog.com/' },
  {text: '❓ 常见问题 FAQ', link: '/other/FAQ' }
    
]

export const sidebar: DefaultTheme.Sidebar | DefaultTheme.NavItemWithLink[] = [
  {
    text: '<span class="i-twemoji:books"></span> 新手指南',
    link: '/beginners-guide'
  },
  {
    text: '<span class="i-twemoji:newspaper"></span> 网站动态',
    link: '/posts'
  },
  {
    text: '<span class="i-twemoji:light-bulb"></span> 参与贡献',
    link: '/other/contributing'
  },
  {
    text: '资源百科 (Wiki)',
    collapsed: false,
    items: [
      {
        text: '<span class="i-twemoji:name-badge"></span> 广告拦截 / 隐私防护',
        link: '/privacy'
      },
      {
        text: '<span class="i-twemoji:robot"></span> 人工智能 AI',
        link: '/ai'
      },
      {
        text: '<span class="i-twemoji:television"></span> 电影 / 电视 / 动漫',
        link: '/video'
      },
      {
        text: '<span class="i-twemoji:musical-note"></span> 音乐 / 播客 / 电台',
        link: '/audio'
      },
      {
        text: '<span class="i-twemoji:video-game"></span> 游戏娱乐 / 模拟器',
        link: '/gaming'
      },
      {
        text: '<span class="i-twemoji:green-book"></span> 图书 / 漫画 / 漫刊',
        link: '/reading'
      },
      {
        text: '<span class="i-twemoji:floppy-disk"></span> 下载工具 / 资源下载',
        link: '/downloading'
      },
      {
        text: '<span class="i-twemoji:cyclone"></span> BT 种子 / P2P P2S',
        link: '/torrenting'
      },
      {
        text: '<span class="i-twemoji:brain"></span> 教育学习 / 学术研究',
        link: '/educational'
      },
      {
        text: '<span class="i-twemoji:mobile-phone"></span> 安卓 Android / iOS',
        link: '/mobile'
      },
      {
        text: '<span class="i-twemoji:penguin"></span> Linux 系统 / macOS',
        link: '/linux-macos'
      },
      {
        text: '<span class="i-twemoji:globe-showing-asia-australia"></span> 小语种资源 (非英语)',
        link: '/non-english'
      },
      {
        text: '<span class="i-twemoji:file-folder"></span> 杂项 / 综合资源',
        link: '/misc'
      }
    ]
  },
  {
    text: '实用工具箱 (Tools)',
    collapsed: false,
    items: [
      {
        text: '<span class="i-twemoji:laptop"></span> 系统增强工具',
        link: '/system-tools'
      },
      {
        text: '<span class="i-twemoji:card-file-box"></span> 文件处理工具',
        link: '/file-tools'
      },
      {
        text: '<span class="i-twemoji:paperclip"></span> 网络在线工具',
        link: '/internet-tools'
      },
      {
        text: '<span class="i-twemoji:left-speech-bubble"></span> 社交媒体工具',
        link: '/social-media-tools'
      },
      {
        text: '<span class="i-twemoji:memo"></span> 文本/文档工具',
        link: '/text-tools'
      },
      {
        text: '<span class="i-twemoji:alien-monster"></span> 游戏辅助工具',
        link: '/gaming-tools'
      },
      {
        text: '<span class="i-twemoji:camera"></span> 图像处理工具',
        link: '/image-tools'
      },
      {
        text: '<span class="i-twemoji:videocassette"></span> 视频剪辑工具',
        link: '/video-tools'
      },
      {
        text: '<span class="i-twemoji:speaker-high-volume"></span> 音频/声乐工具',
        link: '/audio#audio-tools'
      },
      {
        text: '<span class="i-twemoji:red-apple"></span> 教育/教学辅助工具',
        link: '/educational#educational-tools'
      },
      {
        text: '<span class="i-twemoji:man-technologist"></span> 研发/开发者工具',
        link: '/developer-tools'
      }
    ]
  },
  {
    text: '村长私藏',
    collapsed: false,
    items: [
      
      {
        text: '<span class="i-twemoji:globe-with-meridians"></span> 代理IP/环境',
        link: '/globe-with-meridians'
      },
      {
        text: '<span class="i-twemoji:credit-card"></span> 走资/U卡',
        link: '/creditcard'
      },
      {
        text: '<span class="i-twemoji:currency-exchange"></span> Web3交易所',
        link: '/currency-exchange'
      },
      {
        text: '<span class="i-twemoji:open-file-folder"></span> 网盘资源',
        link: '/wangpan'
      }
    ]
  },
{
    text: '更多板块',
    collapsed: true,
    items: [
      
      {
        text: '<span class="i-twemoji:warning"></span> 危险/不安全站点警告',
        link: '/unsafe'
      },
      {
        text: '<span class="i-twemoji:package"></span> 存储/网盘工具',
        link: '/storage'
      }
    ]
  }
]