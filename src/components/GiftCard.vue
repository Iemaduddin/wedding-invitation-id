<script setup lang="ts">
import { ref } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

const toastVisible = ref(false)
const toastMessage = ref('')
const copied = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

function copy(text: string) {
  void navigator.clipboard?.writeText(text)
  copied.value = true
  toastMessage.value = 'Nomor rekening berhasil disalin!'
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastVisible.value = false
    copied.value = false
  }, 2000)
}
</script>

<template>
  <section class="mt-6 relative">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="60" />
    <FlowerDecor
      class="small bottom-right"
      position="bottom-right"
      variant="rose"
      tone="champagne"
      delay="210"
    />
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="sakura"
      size="90"
      delay="140"
    />
    <FlowerDecor
      class="card-bottom-left"
      position="card-bottom-left"
      variant="lily"
      size="80"
      tone="champagne"
      delay="300"
    />

    <div
      class="relative rounded-2xl border border-(--line) bg-white/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)]"
    >
      <p class="font-title text-xs uppercase tracking-[0.22em] text-(--gold) text-center mt-1">
        Wedding Gift
      </p>
      <p class="mt-2 text-center font-body text-sm text-(--muted)">
        Doa dan hadiah pernikahan dapat disalurkan melalui:
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <!-- Digital / Transfer -->
        <div
          class="relative rounded-2xl bg-gradient-to-br from-[#E8ECF0] to-[#FFFFFF] px-4 py-5 sm:p-6 text-[#1A2A3A] shadow-xl select-none overflow-hidden"
        >
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="geo-bni" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M40 6 L74 40 L40 74 L6 40 Z"
                  stroke="#1A2A3A"
                  stroke-width="0.7"
                  fill="none"
                  opacity="0.35"
                />
                <path
                  d="M40 16 L64 40 L40 64 L16 40 Z"
                  stroke="#1A2A3A"
                  stroke-width="0.5"
                  fill="none"
                  opacity="0.22"
                />
                <line
                  x1="40"
                  y1="0"
                  x2="40"
                  y2="80"
                  stroke="#1A2A3A"
                  stroke-width="0.2"
                  opacity="0.08"
                />
                <line
                  x1="0"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke="#1A2A3A"
                  stroke-width="0.2"
                  opacity="0.08"
                />
                <circle cx="40" cy="40" r="2" fill="#1A2A3A" opacity="0.3" />
                <circle cx="12" cy="12" r="1.2" fill="#1A2A3A" opacity="0.12" />
                <circle cx="68" cy="68" r="1.2" fill="#1A2A3A" opacity="0.12" />
                <circle cx="68" cy="12" r="1.2" fill="#1A2A3A" opacity="0.12" />
                <circle cx="12" cy="68" r="1.2" fill="#1A2A3A" opacity="0.12" />
                <circle cx="40" cy="0" r="0.8" fill="#1A2A3A" opacity="0.08" />
                <circle cx="40" cy="80" r="0.8" fill="#1A2A3A" opacity="0.08" />
                <circle cx="0" cy="40" r="0.8" fill="#1A2A3A" opacity="0.08" />
                <circle cx="80" cy="40" r="0.8" fill="#1A2A3A" opacity="0.08" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-bni)" />
          </svg>

          <!-- Top row: copy left, logo right -->
          <div class="relative flex justify-between items-center">
            <button
              type="button"
              @click="copy('1868545076')"
              class="inline-flex items-center gap-1.5 rounded-lg bg-[#1A2A3A]/10 px-2.5 py-1.5 transition hover:bg-[#1A2A3A]/20 active:scale-95"
            >
              <svg
                v-if="!copied"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A2A3A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <svg
                v-else
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A2A3A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="font-body text-[11px] font-semibold text-[#1A2A3A]/70">{{
                copied ? 'Tersalin' : 'Salin'
              }}</span>
            </button>
            <img src="/bni.png" alt="Bank BNI" class="h-4 md:h-6 w-auto object-contain" />
          </div>

          <!-- Chip -->
          <div class="relative mt-4 sm:mt-5">
            <svg width="40" height="40" viewBox="0 0 36 26" fill="none" class="sm:w-9 sm:h-auto">
              <rect x="1" y="1" width="34" height="24" rx="3" fill="#D4A843" fill-opacity="0.8" />
              <rect x="1" y="1" width="34" height="24" rx="3" stroke="#B8912E" stroke-width="1.5" />
              <path
                d="M10 1v24M18 1v24M26 1v24M1 8h34M1 17h34"
                stroke="#B8912E"
                stroke-width="0.8"
                opacity="0.5"
              />
            </svg>
          </div>

          <!-- Card number + Holder -->
          <div class="relative mt-4 sm:mt-5 flex items-end justify-between">
            <div>
              <p
                class="font-body text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[#1A2A3A]/80"
              >
                Nomor Rekening
              </p>
              <p
                class="mt-0.5 sm:mt-1 font-mono text-sm md:text-xl tracking-[0.15em] text-[#1A2A3A]/80"
              >
                1868545076
              </p>
            </div>
            <div class="text-right">
              <p class="text-[11px] uppercase tracking-[0.12em] text-[#1A2A3A]/80">A/n</p>
              <p class="font-body text-sm font-semibold tracking-wide text-[#1A2A3A]/90">
                Izzah Nabila
              </p>
            </div>
          </div>

          <!-- Decorative stripe -->
          <div class="relative mt-1 md:mt-4 -mx-5 sm:-mx-6">
            <div
              class="h-6 md:h-8 bg-gradient-to-r from-[#D4A843]/50 via-[#D4A843]/20 to-transparent"
            ></div>
          </div>
        </div>

        <!-- Offline / Hadiah Fisik -->
        <div
          class="relative rounded-2xl bg-gradient-to-br from-[#F5F0E8] to-[#FFFFFF] px-4 py-5 sm:p-6 text-[#3A2A1A] shadow-xl select-none overflow-hidden"
        >
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="geo-gift" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M40 6 L74 40 L40 74 L6 40 Z"
                  stroke="#3A2A1A"
                  stroke-width="0.7"
                  fill="none"
                  opacity="0.35"
                />
                <path
                  d="M40 16 L64 40 L40 64 L16 40 Z"
                  stroke="#3A2A1A"
                  stroke-width="0.5"
                  fill="none"
                  opacity="0.22"
                />
                <line
                  x1="40"
                  y1="0"
                  x2="40"
                  y2="80"
                  stroke="#3A2A1A"
                  stroke-width="0.2"
                  opacity="0.08"
                />
                <line
                  x1="0"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke="#3A2A1A"
                  stroke-width="0.2"
                  opacity="0.08"
                />
                <circle cx="40" cy="40" r="2" fill="#3A2A1A" opacity="0.3" />
                <circle cx="12" cy="12" r="1.2" fill="#3A2A1A" opacity="0.12" />
                <circle cx="68" cy="68" r="1.2" fill="#3A2A1A" opacity="0.12" />
                <circle cx="68" cy="12" r="1.2" fill="#3A2A1A" opacity="0.12" />
                <circle cx="12" cy="68" r="1.2" fill="#3A2A1A" opacity="0.12" />
                <circle cx="40" cy="0" r="0.8" fill="#3A2A1A" opacity="0.08" />
                <circle cx="40" cy="80" r="0.8" fill="#3A2A1A" opacity="0.08" />
                <circle cx="0" cy="40" r="0.8" fill="#3A2A1A" opacity="0.08" />
                <circle cx="80" cy="40" r="0.8" fill="#3A2A1A" opacity="0.08" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-gift)" />
          </svg>

          <!-- Header -->
          <div class="relative flex items-center justify-center gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#3A2A1A]/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3A2A1A"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" />
                <rect x="2" y="7" width="20" height="5" rx="1" />
                <line x1="12" y1="7" x2="12" y2="21" />
                <path d="M12 7H8.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h3.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <span class="font-title text-base font-semibold tracking-wide text-[#3A2A1A]"
              >Hadiah Fisik</span
            >
          </div>

          <div class="relative mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
            <p class="font-body text-sm leading-relaxed text-[#3A2A1A]/80 text-center">
              Jika ingin mengirimkan hadiah secara fisik, dapat dikirimkan ke alamat berikut:
            </p>
            <div class="rounded-xl border border-[#3A2A1A]/10 bg-white/60 p-4 text-center">
              <p class="font-body text-sm font-semibold text-[#3A2A1A]">
                Iemaduddin & Izzah Nabila
              </p>
              <p class="mt-1 font-body text-sm text-[#3A2A1A]/70 leading-relaxed">
                Perumahan Istana Taj-Mahal blok L no 09, Karang Anyar, Kec. Blega, Kab Bangkalan,
                Jawa Timur
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="toastVisible"
        class="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-body text-sm text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-300"
        :class="toastVisible ? 'animate-toast-in' : 'animate-toast-out'"
      >
        <div class="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {{ toastMessage }}
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.animate-toast-in {
  animation: toastSlideRight 0.35s ease both;
}

.animate-toast-out {
  animation: toastSlideRightOut 0.35s ease both;
}

@keyframes toastSlideRight {
  from { opacity: 0; transform: translateX(24px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes toastSlideRightOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(24px); }
}
</style>
