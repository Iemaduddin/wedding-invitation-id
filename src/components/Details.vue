<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'
</script>

<template>
  <section id="acara" class="mt-6 relative scroll-mt-20">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="90" />
    <FlowerDecor
      class="small bottom-right"
      position="bottom-right"
      variant="rose"
      tone="champagne"
      delay="260"
    />
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="sakura"
      size="90"
      tone="champagne"
      delay="170"
    />
    <FlowerDecor
      class="card-bottom-left"
      position="card-bottom-left"
      variant="lily"
      size="80"
      delay="330"
    />

    <div
      class="rounded-2xl border border-(--line) bg-white/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/40 via-(--gold) to-(--gold)/40"
      ></div>
      <p class="font-title text-xs uppercase tracking-[0.2em] text-(--gold) text-center mt-1">
        Rangkaian Acara
      </p>

      <!-- Date in center -->
      <div class="mt-5 flex items-center justify-center gap-3">
        <span
          class="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect
            x="1"
            y="3"
            width="18"
            height="15"
            rx="2"
            stroke="var(--gold)"
            stroke-width="1.2"
            fill="none"
            opacity="0.6"
          />
          <path d="M1 7h18" stroke="var(--gold)" stroke-width="1.2" opacity="0.6" />
          <line x1="6" y1="1" x2="6" y2="4" stroke="var(--gold)" stroke-width="1" opacity="0.4" />
          <line x1="14" y1="1" x2="14" y2="4" stroke="var(--gold)" stroke-width="1" opacity="0.4" />
        </svg>
        <p class="font-title text-2xl sm:text-3xl text-(--ink) font-semibold">Ahad, 5 Juli 2026</p>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect
            x="1"
            y="3"
            width="18"
            height="15"
            rx="2"
            stroke="var(--gold)"
            stroke-width="1.2"
            fill="none"
            opacity="0.6"
          />
          <path d="M1 7h18" stroke="var(--gold)" stroke-width="1.2" opacity="0.6" />
          <line x1="6" y1="1" x2="6" y2="4" stroke="var(--gold)" stroke-width="1" opacity="0.4" />
          <line x1="14" y1="1" x2="14" y2="4" stroke="var(--gold)" stroke-width="1" opacity="0.4" />
        </svg>
        <span
          class="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
      </div>

      <!-- Left - Center - Right -->
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start">
        <!-- Akad Nikah -->
        <div
          class="rounded-xl border border-(--line) bg-(--card)/80 p-4 sm:p-5 text-center sm:text-left"
        >
          <div class="flex items-center gap-2 justify-center sm:justify-start">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6" stroke="var(--gold)" stroke-width="1.2" opacity="0.6" />
              <circle cx="8" cy="8" r="2" fill="var(--gold)" opacity="0.5" />
            </svg>
            <p class="font-title text-sm uppercase tracking-[0.18em] text-(--gold) font-semibold">
              Akad Nikah
            </p>
          </div>
          <div class="mt-3">
            <p class="font-body text-lg sm:text-xl font-semibold text-(--ink)">09.00 WIB</p>
            <p class="font-body text-xs text-(--muted) mt-0.5">Sesi akad pernikahan</p>
          </div>
        </div>

        <!-- Separator for mobile / vertical layout -->
        <div class="hidden sm:flex flex-col items-center justify-center">
          <div
            class="w-px h-8 bg-gradient-to-b from-transparent via-(--gold)/30 to-transparent"
          ></div>
          <div class="my-2 w-8 h-8 rounded-full bg-(--gold)/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 14s-4-2.5-4-6.5C4 4.5 5.5 3 8 3s4 1.5 4 4.5c0 4-4 6.5-4 6.5z"
                fill="var(--gold)"
                opacity="0.5"
              />
              <circle cx="8" cy="6" r="1.5" fill="#fff" opacity="0.8" />
            </svg>
          </div>
          <div
            class="w-px h-8 bg-gradient-to-b from-transparent via-(--gold)/30 to-transparent"
          ></div>
        </div>

        <!-- Mobile separator -->
        <div class="flex sm:hidden items-center justify-center gap-2">
          <span class="h-px flex-1 bg-(--line)"></span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M7 12s-3.5-2-3.5-5.5C3.5 4 4.5 3 7 3s3.5 1 3.5 3.5c0 3.5-3.5 5.5-3.5 5.5z"
              fill="var(--gold)"
              opacity="0.4"
            />
          </svg>
          <span class="h-px flex-1 bg-(--line)"></span>
        </div>

        <!-- Resepsi -->
        <div
          class="rounded-xl border border-(--line) bg-(--card)/80 p-4 sm:p-5 text-center sm:text-right"
        >
          <div class="flex items-center gap-2 justify-center sm:justify-end">
            <p class="font-title text-sm uppercase tracking-[0.18em] text-(--gold) font-semibold">
              Resepsi
            </p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6" stroke="var(--gold)" stroke-width="1.2" opacity="0.6" />
              <circle cx="8" cy="8" r="2" fill="var(--gold)" opacity="0.5" />
            </svg>
          </div>
          <div class="mt-3">
            <p class="font-body text-lg sm:text-xl font-semibold text-(--ink)">
              09.00 WIB - Selesai
            </p>
            <p class="font-body text-xs text-(--muted) mt-0.5">Sesi resepsi & ramah tamah</p>
          </div>
        </div>
      </div>

      <!-- divider -->
      <div class="mt-6 h-px bg-(--line)"></div>

      <!-- Address -->
      <div class="mt-4 text-center">
        <p class="font-body text-sm text-(--muted) leading-relaxed">
          Perumahan Istana Taj-Mahal blok L no 09, Karang Anyar, Kec. Blega, Kab Bangkalan, Jawa
          Timur
        </p>
      </div>
    </div>
  </section>
</template>
