<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'

defineProps<{ mapUrl?: string; mapEmbedUrl?: string }>()
</script>

<template>
  <section class="mt-6 relative">
    <FlowerDecor class="small top-left" position="top-left" variant="sakura" delay="80" />
    <FlowerDecor
      class="small bottom-right"
      position="bottom-right"
      variant="lotus"
      tone="champagne"
      delay="240"
    />
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="lily"
      size="80"
      delay="160"
    />

    <div
      class="rounded-2xl border border-(--line) bg-white/90 px-6 py-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/40 via-(--gold) to-(--gold)/40"
      ></div>

      <p class="font-title text-xs uppercase tracking-[0.2em] text-(--gold) text-center">Lokasi</p>

      <div class="mt-4 flex items-center justify-center gap-2">
        <span
          class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M6 1C3.5 1 2 2.5 2 5c0 3 4 6 4 6s4-3 4-6c0-2.5-1.5-4-4-4z"
            stroke="var(--gold)"
            stroke-width="1"
            fill="none"
            opacity="0.6"
          />
          <circle cx="6" cy="4.5" r="1.5" fill="var(--gold)" opacity="0.4" />
        </svg>
        <span
          class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
        ></span>
      </div>

      <div class="mt-4 rounded-xl overflow-hidden border border-(--line)">
        <iframe
          :src="mapEmbedUrl || 'https://maps.google.com/maps?q=Bangkalan&output=embed'"
          class="w-full h-56 sm:h-96"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <p class="mt-4 font-body text-sm text-(--muted) leading-relaxed text-center">
        Perumahan Istana Taj-Mahal blok L no 09, Karang Anyar, Kec. Blega, Kab Bangkalan, Jawa Timur
      </p>
    </div>
  </section>
</template>
