<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'

defineProps<{ mapUrl?: string; mapEmbedUrl?: string }>()
</script>

<template>
  <section class="mt-6 relative">
    <FlowerDecor class="small top-left" position="top-left" variant="sakura" delay="80" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="lotus" tone="champagne" delay="240" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="lily" size="80" delay="160" />

    <div class="rounded-2xl border border-(--line) bg-white/90 px-6 py-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)] relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/40 via-(--gold) to-(--gold)/40"></div>

      <p class="font-title text-xs uppercase tracking-[0.2em] text-(--gold) text-center">
        Lokasi
      </p>

      <div class="mt-4 flex items-center justify-center gap-2">
        <span class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"></span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M6 1C3.5 1 2 2.5 2 5c0 3 4 6 4 6s4-3 4-6c0-2.5-1.5-4-4-4z" stroke="var(--gold)" stroke-width="1" fill="none" opacity="0.6" />
          <circle cx="6" cy="4.5" r="1.5" fill="var(--gold)" opacity="0.4" />
        </svg>
        <span class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"></span>
      </div>

      <div class="mt-4 rounded-xl overflow-hidden border border-(--line)">
        <iframe
          :src="mapEmbedUrl || 'https://maps.google.com/maps?q=Bangkalan&output=embed'"
          class="w-full h-56 sm:h-64"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <p class="mt-4 font-body text-sm text-(--muted) leading-relaxed text-center">
        Perumahan Istana Taj-Mahal blok L no 09, Karang Anyar, Kec. Blega, Kab Bangkalan, Jawa Timur
      </p>

      <a
        :href="mapUrl"
        target="_blank"
        rel="noreferrer"
        class="mt-3 inline-flex items-center justify-center gap-2 w-full rounded-full border border-(--gold) px-5 py-2.5 font-title text-xs uppercase tracking-[0.18em] text-(--gold) transition hover:bg-(--gold) hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 1C4 1 2 3 2 6c0 3.5 5 7 5 7s5-3.5 5-7c0-3-2-5-5-5z" stroke="currentColor" stroke-width="1.2" fill="none" />
          <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" stroke-width="1.2" fill="none" />
        </svg>
        Buka Google Maps
      </a>
    </div>
  </section>
</template>
