import { meta } from '../constants'

/**
 *  Copyright (c) 2025 taskylizard. Apache License 2.0.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
interface Header {
  [file: string]: { title: string; description: string }
}

export const headers: Header = {
  'privacy.md': {
    title: '广告拦截 / 隐私',
    description: '广告拦截、隐私、VPN、代理、杀毒软件'
  },
  'ai.md': {
    title: '人工智能',
    description: '聊天机器人、文本生成器、图像生成器、聊天机器人工具'
  },
  'mobile.md': {
    title: 'Android / iOS',
    description: '应用、越狱、Android 模拟器'
  },
  'audio.md': {
    title: '音乐 / 播客 / 广播',
    description: '音频流媒体、音频下载、音频 BT 下载'
  },
  'beginners-guide.md': {
    title: '新手指南',
    description: '新手指南 + 常见问题'
  },
  'downloading.md': {
    title: '下载',
    description: '下载站点、软件站点、开放目录'
  },
  'educational.md': {
    title: '教育',
    description: '课程、纪录片、学习资源'
  },
  'gaming.md': {
    title: '游戏 / 模拟',
    description: '下载游戏、ROM、游戏工具'
  },
  'linux-macos.md': {
    title: 'Linux / macOS',
    description: '应用、软件站点、游戏'
  },
  'misc.md': {
    title: '杂项',
    description: '扩展、索引、新闻、健康、美食、趣味'
  },
  'nsfwpiracy.md': {
    title: 'NSFW',
    description: 'NSFW 索引、流媒体、下载'
  },
  'non-english.md': {
    title: '非英语资源',
    description: '国际免费站点'
  },
  'reading.md': {
    title: '书籍 / 漫画 / 日本漫画',
    description: '书籍、漫画、杂志、报纸'
  },
  'gaming-tools.md': {
    title: '游戏工具',
    description: '游戏优化、游戏启动器、多人游戏'
  },
  'developer-tools.md': {
    title: '开发者工具',
    description: 'Git、托管、应用开发、软件开发'
  },
  'image-tools.md': {
    title: '图像工具',
    description: '图像编辑器、生成器、压缩'
  },
  'audio-tools.md': {
    title: '音频工具',
    description: '音频播放器、音频编辑器、音频下载器'
  },
  'system-tools.md': {
    title: '系统工具',
    description: '系统工具、硬件工具、Windows 镜像、自定义'
  },
  'file-tools.md': {
    title: '文件工具',
    description: '下载管理器、文件托管、文件压缩'
  },
  'video-tools.md': {
    title: '视频工具',
    description: '视频播放器、视频编辑器、直播、动画'
  },
  'text-tools.md': {
    title: '文本工具',
    description: '文本编辑器、文本粘贴站、字体、翻译工具'
  },
  'internet-tools.md': {
    title: '互联网工具',
    description: '浏览器、扩展、搜索引擎'
  },
  'social-media-tools.md': {
    title: '社交媒体工具',
    description: 'Discord 工具、Reddit 工具、YouTube 工具'
  },
  'storage.md': {
    title: '存储',
    description: '因内容过多无法放入主页面的板块'
  },
  'torrenting.md': {
    title: 'BT 下载',
    description: 'BT 客户端、BT 站点、Tracker'
  },
  'video.md': {
    title: '电影 / 电视剧 / 动漫',
    description: '视频流媒体、视频下载、视频 BT 下载'
  },
  'base64.md': {
    title: 'Base64',
    description: 'Base64 存储'
  },
  'unsafe.md': {
    title: '不安全站点',
    description: '应避免访问的不安全/有害站点。'
  },
  'recently-removed.md': {
    title: '最近移除的站点',
    description: '最近从 Wiki 中移除的站点列表'
  },
  'networkdisks.md': {
    title: '软件站点 / 开放目录',
    description: '软件站点、开源软件、免费软件、开放目录'
  }
} as const

export const excluded = [
  'readme.md',
  'single-page',
  'feedback.md',
  'index.md',
  'sandbox.md',
  'startpage.md'
]

export function getHeader(id: string) {
  const title =
    '<div class="space-y-2 not-prose"><h1 class="text-4xl font-extrabold tracking-tight text-primary underline lg:text-5xl lg:leading-[3.5rem]">'

  const description = '<p class="text-black dark:text-text-2">'

  const feedback = meta.build.api ? '<Feedback />' : ''

  const data = headers[id]
  let header = '---\n'
  header += `title: "${data.title}"\n`
  header += `description: ${data.description}\n`
  header += '---\n'
  header += `${title}${data.title}</h1>\n`
  header += `${description}${data.description}</p></div>\n\n${feedback}\n\n`
  return header
}