<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'
</script>

<template>
  <footer class="mt-6 relative">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="130" />
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
      tone="champagne"
      delay="210"
    />
    <FlowerDecor
      class="card-bottom-left"
      position="card-bottom-left"
      variant="rose"
      size="80"
      delay="280"
    />

    <div
      class="rounded-2xl border border-(--line) bg-white/90 px-6 py-8 sm:p-10 text-center shadow-[0_8px_30px_rgba(43,108,176,0.06)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/40 via-(--gold) to-(--gold)/40"
      ></div>

      <div
        class="mx-auto mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-full ring-2 ring-(--gold)/20 shadow-lg overflow-hidden"
      >
        <img src="/foto-2-mempelai.gif" alt="couple" class="h-full w-full object-cover" />
      </div>

      <p class="font-title text-xs uppercase tracking-[0.2em] text-(--gold)">Terima Kasih</p>

      <div class="mt-2 flex items-center justify-center gap-2">
        <span
          class="h-px w-8 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
          <path
            d="M4 7s-2-1-2-3C2 2.5 2.5 2 4 2s2 .5 2 2c0 2-2 3-2 3z"
            fill="var(--gold)"
            opacity="0.4"
          />
        </svg>
        <span
          class="h-px w-8 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
      </div>

      <p class="mt-3 text-(--muted) font-body text-sm leading-relaxed max-w-md mx-auto">
        Atas segala perhatian, doa restu, dan kehadiran Bapak/Ibu/Saudara/i, kami ucapkan terima
        kasih yang sebesar-besarnya.
      </p>

      <p class="mt-3 font-arabic text-sm text-(--gold)">جَزَاكُمُ اللَّهُ خَيْرًا كَثِيرًا</p>

      <div class="mt-4 h-px bg-(--line)"></div>

      <p class="mt-4 font-arabic text-base text-(--ink)">
        وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
      </p>

      <p class="mt-1 font-body text-[10px] text-(--muted)/60 uppercase tracking-[0.15em]">
        Icha & Didin
      </p>
    </div>
  </footer>
</template>
