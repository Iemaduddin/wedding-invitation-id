<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

const images = ['gallery/1.JPG', 'gallery/2.JPG', 'gallery/3.JPG', 'gallery/4.JPG']

const track = ref<HTMLDivElement>()
const isModalOpen = ref(false)
const modalIndex = ref(0)
const atStart = ref(true)
const atEnd = ref(false)

function updateScrollState() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft < 10
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
}

onMounted(() => {
  updateScrollState()
  track.value?.addEventListener('scroll', updateScrollState)
})

onUnmounted(() => {
  track.value?.removeEventListener('scroll', updateScrollState)
})

function scrollByImg(dir: 'prev' | 'next') {
  if (!track.value) return
  const scroll = dir === 'next' ? 1 : -1
  const child = track.value.children[0] as HTMLElement
  const w = child?.offsetWidth + 12
  track.value.scrollBy({ left: w * scroll, behavior: 'smooth' })
}

function updateModal(i: number) {
  modalIndex.value = i
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function modalPrev() {
  modalIndex.value = modalIndex.value > 0 ? modalIndex.value - 1 : images.length - 1
}

function modalNext() {
  modalIndex.value = modalIndex.value < images.length - 1 ? modalIndex.value + 1 : 0
}

function isAtStart() {
  return atStart.value
}

function isAtEnd() {
  return atEnd.value
}
</script>

<template>
  <section class="mt-6 relative">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="110" />
    <FlowerDecor
      class="small bottom-right"
      position="bottom-right"
      variant="sakura"
      tone="champagne"
      delay="260"
    />
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="lily"
      size="90"
      delay="180"
    />
    <FlowerDecor
      class="card-bottom-left"
      position="card-bottom-left"
      variant="rose"
      size="80"
      tone="champagne"
      delay="320"
    />

    <div
      class="rounded-2xl border border-(--line) bg-white/90 px-6 py-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/40 via-(--gold) to-(--gold)/40"
      ></div>

      <p class="font-title text-xs uppercase tracking-[0.2em] text-(--gold) text-center">Galeri</p>

      <div class="mt-4 flex items-center justify-center gap-2">
        <span
          class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity="0.4" />
        </svg>
        <span
          class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
      </div>

      <div class="mt-5 relative">
        <div
          ref="track"
          class="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <img
            v-for="(src, i) in images"
            :key="i"
            :src="src"
            class="w-full md:w-[calc(100%/3-8px)] flex-shrink-0 snap-start aspect-[3/4] object-cover cursor-pointer rounded-lg"
            @click="updateModal(i)"
          />
        </div>

        <button
          v-if="!atStart"
          type="button"
          class="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-(--muted) hover:text-(--gold) transition"
          @click="scrollByImg('prev')"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          v-if="!atEnd"
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-(--muted) hover:text-(--gold) transition"
          @click="scrollByImg('next')"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        @click.self="closeModal"
      >
        <button
          type="button"
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition"
          @click.stop="closeModal"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <img
          :src="images[modalIndex]"
          class="max-h-[85vh] max-w-full rounded-xl shadow-2xl cursor-pointer"
          @click.stop="closeModal"
        />

        <button
          type="button"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition"
          @click.stop="modalPrev"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition"
          @click.stop="modalNext"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </Teleport>
  </section>
</template>
