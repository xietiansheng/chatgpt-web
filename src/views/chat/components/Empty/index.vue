<script lang="ts" setup>
import sourceList from '@/assets/prompt-source.json'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import type { PromptItem } from '@/views/chat/types'
import AegisHelper from '@/utils/aegis'

const emit = defineEmits(['clickPrompt'])

// 移动端自适应相关
const { isMobile } = useBasicLayout()

const sourceData: PromptItem[] = sourceList as unknown as PromptItem[]

const firstVisit = localStorage.getItem('firstVisit') || '1'
function onPromptItemClick(item: PromptItem) {
  if (firstVisit !== '0')
    localStorage.setItem('firstVisit', '0')
  // q:这里为什么报错
  // a:因为emit的类型定义中没有clickPrompt这个事件

  emit('clickPrompt', item)
  AegisHelper.reportInfo({
    ext1: item.title,
  })
}

const dataList = computed(() => {
  const count = isMobile.value ? 2 : 4
  return fetchDataList(sourceData, count)
})

function fetchDataList(source: PromptItem[], count: number) {
  const lengthData = Array(count).fill(0) as number[]
  const resultList = [] as Array<PromptItem[]>
  source.forEach((item, index) => {
    if (item.hint.length > 100)
      return

    // 计算countData中最小值的索引
    const minIndex = lengthData.indexOf(Math.min(...lengthData))
    lengthData[minIndex] += item.hint.length
    if (!resultList[minIndex])
      resultList[minIndex] = []

    resultList[minIndex].push({
      ...item,
      key: `${index}`,
    })
  })
  return resultList
}

// table相关
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-4 text-center text-neutral-300">
    <h2 class="text-2xl flex" :class="`mb-${firstVisit === '1' ? '2' : '6'}`">
      <SvgIcon icon="ri:bubble-chart-fill" class="mr-2 text-3xl" />我能为您做些什么？
    </h2>
    <span v-if="firstVisit === '1'" class="mb-6 text-cyan-700 text-md">（试试点击下方卡片，快速提问）</span>
    <div class="flex w-full gap-3">
      <div v-for="(childList, index) in dataList" :key="index" class="flex-1 flex flex-col gap-3">
        <n-card v-for="item in childList" :key="item.key" class="cursor-pointer dark:hover:bg-zinc-800 hover:bg-gray-100" :title="item.title" @click="onPromptItemClick(item)">
          {{ item.hint }}
        </n-card>
      </div>
    </div>
  </div>
</template>
