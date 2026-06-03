<script setup lang="ts">
import type { FeedbackType } from '../../types/Feedback'
import { useRouter } from 'vitepress'
import { computed, reactive, ref } from 'vue'
import { feedbackOptions, getFeedbackOption } from '../../types/Feedback'

const props = defineProps<{
  heading?: string
}>()

const prompts = [
  '畅所欲言！',
  '给我们留点反馈吧！',
  `我们洗耳恭听 🐰`,
  '告诉我们 FMHY 还缺什么',
  '你的想法对我们很重要 💡',
  '反馈是礼物 🎁',
  '你怎么看？',
  '感谢你的支持 🙏',
  '帮助我们改进 FMHY 🤝',
  '我们需要你的帮助 👋',
  '你的反馈非常宝贵 💯',
  '那么……你怎么看？',
  "我想你什么都不用说也可以 😉",
  '畅所欲言吧 💣',
  "我们一直在寻找改进的方法！",
  '你的反馈非常宝贵，能帮助我们改进 FMHY。',
  '外星人在看着你 👽',
  'tasky 到此一游 👀',
  '互联网上充满了垃圾 😱'
]

function getPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)]
}

const messages = {
  suggestion: [
    "很高兴你想分享你的想法！",
    '废话少说，直接告诉我们你的想法！',
    "我们会认真阅读你的想法，并将其整合到我们的 Wiki 中。",
    "你好！很高兴你想分享你的想法！"
  ],
  appreciation: [
    '感谢你的支持！',
    "我们一直在寻找改进的方法！。",
    '你的反馈非常宝贵，能帮助我们改进 FMHY。'
  ],
  other: [
    "我们一直在寻找改进的方法！",
    '你的反馈非常宝贵，能帮助我们改进 FMHY。'
  ]
}

function getMessage(type: FeedbackType['type']) {
  return messages[type][Math.floor(Math.random() * messages[type].length)]
}

const loading = ref<boolean>(false)
const error = ref<unknown>(null)
const success = ref<boolean>(false)

const isDisabled = computed(() => {
  return (
    !feedback.message.length ||
    feedback.message.length < 5 ||
    feedback.message.length > 1000
  )
})

const router = useRouter()

const feedback = reactive<{
  message: string
  page: string
  type?: FeedbackType['type']
}>({
  page: router.route.path,
  message: ''
})

const selectedOption = ref(feedbackOptions[0])

function selectType(type: FeedbackType['type']) {
  feedback.type = type
  selectedOption.value = getFeedbackOption(type)!
}

async function handleSubmit() {
  loading.value = true
  error.value = null

  const body: FeedbackType = {
    message: feedback.message,
    type: feedback.type!,
    page: feedback.page,
    ...(props.heading && { heading: props.heading })
  }

  try {
    const response = await fetch('https://api.fmhy.net/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    if (!response.ok || data.error) {
      error.value = data.message || data.error || '反馈发送失败'
      return
    }
    if (data.status === 'ok') {
      success.value = true
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const isCardShown = ref<boolean>(false)
const helpfulText = props.heading
  ? '你觉得这个板块怎么样？'
  : '你觉得这个页面怎么样？'
const helpfulDescription = props.heading
  ? '请告诉我们这个板块有多大帮助。'
  : '请告诉我们这个页面有多大帮助。'

const prompt = computed(() => getPrompt())
const message = computed(() => getMessage(feedback.type!))
const toggleCard = () => (isCardShown.value = !isCardShown.value)
const resetFeedback = () => {
  feedback.type = undefined
  error.value = null
}
</script>

<template>
  <template v-if="props.heading">
    <button
      class="bg-$vp-c-default-soft text-primary border-$vp-c-default-soft hover:border-primary ml-3 inline-flex h-7 items-center justify-center whitespace-nowrap rounded-md border-2 border-solid px-1.5 py-3.5 text-sm font-medium transition-all duration-300 sm:h-6"
      @click="toggleCard()"
    >
      <span
        :class="isCardShown === false ? `i-lucide:mail` : `i-lucide:mail-x`"
      />
    </button>
  </template>
  <template v-else>
    <div
      class="mt-2 p-4 border-2 border-solid bg-$vp-c-bg-alt border-$vp-c-divider rounded-xl col-span-3 transition-colors duration-250"
    >
      <div class="flex items-start md:items-center gap-3">
        <div class="pt-1 md:pt-0">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center bg-$vp-c-brand-3"
          >
            <span
              :class="
                isCardShown === false
                  ? `i-lucide:mail w-6 h-6 text-white`
                  : `i-lucide:mail-x w-6 h-6 text-white`
              "
            />
          </div>
        </div>
        <div
          class="flex-grow flex items-start md:items-center gap-3 flex-col md:flex-row"
        >
          <div class="flex-grow">
            <div class="font-semibold text-$vp-c-text-1">有反馈？</div>
            <div class="text-sm text-$vp-c-text-2">
              我们很想知道你对这个页面的看法。
            </div>
          </div>
          <div>
            <button
              class="bg-[#25262B] inline-block text-center rounded-full px-4 py-2.5 text-sm font-medium border-2 border-solid text-white border-$vp-c-divider"
              @click="toggleCard()"
            >
              分享反馈
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <Transition name="fade" mode="out-in">
    <div
      v-if="isCardShown"
      class="border-$vp-c-divider bg-$vp-c-bg-alt b-rd-4 m-[2rem 0] mt-4 border-2 border-solid p-6"
    >
      <Transition name="fade" mode="out-in">
        <div v-if="!feedback.type">
          <p class="heading">
            {{ helpfulText }}
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in feedbackOptions"
              :key="item.value"
              class="bg-[#25262B] border-$vp-c-default-soft hover:border-primary mt-2 select-none rounded border-2 border-solid font-bold transition-all duration-250 rounded-lg text-[14px] text-white font-500 leading-normal m-0 px-3 py-1.5 text-center align-middle whitespace-nowrap"
              @click="selectType(item.value)"
            >
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
        <div v-else-if="feedback.type && !success">
          <div>
            <p class="desc">{{ helpfulDescription }} - {{ prompt }}</p>
            <span>{{ getFeedbackOption(feedback.type)?.label }}</span>
          </div>
          <p class="heading" v-text="message"></p>
          <div v-if="feedback.type === 'suggestion'" class="mb-2 text-sm">
            <p>
              提交反馈前，请先阅读
              <a href="/other/contributing">贡献指南</a>
              ！
            </p>
          </div>
          <div
            v-if="error"
            class="error-msg mb-4 p-3 rounded-lg bg-red-900/20 border border-red-500/50 text-red-300 text-xs"
          >
            <span class="font-bold">错误：</span>
            {{
              typeof error === 'string'
                ? error
                : (error as any).message ||
                  '反馈发送失败，请重试。'
            }}
          </div>
          <textarea
            v-model="feedback.message"
            autofocus
            class="bg-$vp-c-bg-alt text-$vp-c-text-2 w-full h-[100px] border border-$vp-c-divider rounded px-3 py-1.5 border-$vp-c-divider bg-$vp-c-bg-alt b-rd-4 border-2 border-solid"
            placeholder="好棒的 Wiki！"
            @input="error = null"
          />
          <p class="desc mb-2">
            如果你想收到回复，或者我们需要更多信息，请留下你的 Discord 用户名，否则加入我们的
            <a
              class="text-primary text-underline font-semibold"
              href="https://github.com/fmhy/FMHY/wiki/FMHY-Discord"
            >
              Discord。
            </a>
          </p>
          <div class="flex flex-row gap-2">
            <button
              class="bg-$vp-c-default-soft text-primary border-$vp-c-default-soft inline-flex h-7 items-center justify-center whitespace-nowrap rounded-md border-2 border-solid px-1.5 py-3.5 text-sm font-medium transition-all duration-300 sm:h-6"
              @click="resetFeedback()"
            >
              <span class="i-lucide:panel-left-close">关闭</span>
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isDisabled || loading"
              :style="
                isDisabled || loading
                  ? {}
                  : {
                      'background-color': 'var(--vp-button-brand-bg)',
                      'border-color': 'var(--vp-button-brand-border)',
                      color: 'var(--vp-button-brand-text)'
                    }
              "
              @click="handleSubmit()"
            >
              {{ loading ? '发送中...' : '发送反馈 📩' }}
            </button>
          </div>
        </div>
        <div v-else>
          <p class="heading">感谢你的反馈！</p>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped lang="css">
.btn {
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  transition:
    border-color 0.25s,
    background-color 0.25s;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding: 0.375rem 0.75rem;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
}

.btn:hover {
  border-color: var(--vp-c-brand);
}

.btn-primary {
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  border-color: var(--vp-button-brand-border);
}

.btn-primary:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}

.heading {
  font-size: 1.2rem;
  font-weight: 700;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
