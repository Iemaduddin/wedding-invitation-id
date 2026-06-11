<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'
</script>

<template>
  <section class="mt-6 relative anim-fade-in">
    <FlowerDecor class="small top-left" position="top-left" variant="sakura" delay="70" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="lotus" tone="champagne" delay="220" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="lily" size="80" tone="champagne" delay="140" />
    <h3 class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
      Love Story
    </h3>
    <div class="mt-4 space-y-4">
      <div class="flex items-start gap-3">
        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--gold)]"></div>
        <div>
          <p class="font-semibold">Pertama Bertemu</p>
          <p class="text-sm text-[var(--muted)]">
            Pertemuan di sebuah acara komunitas yang mengubah segalanya.
          </p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--gold)]"></div>
        <div>
          <p class="font-semibold">Mulai Menjalin</p>
          <p class="text-sm text-[var(--muted)]">
            Langkah demi langkah kami membangun kebersamaan.
          </p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--gold)]"></div>
        <div>
          <p class="font-semibold">Lamaran</p>
          <p class="text-sm text-[var(--muted)]">Momen yang penuh haru dan kebahagiaan.</p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--gold)]"></div>
        <div>
          <p class="font-semibold">Pernikahan</p>
          <p class="text-sm text-[var(--muted)]">
            Saat kami mengucap janji setia di hadapan keluarga dan sahabat.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
