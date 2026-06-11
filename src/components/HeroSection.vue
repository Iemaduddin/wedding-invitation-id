<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'

const { bride, groom, quote, countdown } = defineProps<{
  bride: string
  groom: string
  quote?: string
  countdown?: any
}>()
</script>

<template>
  <section
    class="mt-6 rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)]/95 p-6 shadow-md text-center"
  >
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="lotus"
      tone="champagne"
      size="100"
      delay="120"
    />
    <FlowerDecor class="tiny top-left" position="top-left" variant="sakura" delay="180" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="rose" delay="240" />
    <div class="overflow-hidden rounded-lg">
      <div
        class="h-48 md:h-72 bg-cover bg-center"
        :style="{
          backgroundImage: `url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=')`,
          height: '100%',
        }"
      ></div>
    </div>
    <h2 class="mt-4 font-[var(--font-script)] text-3xl text-[var(--ink)]">
      {{ bride }} &amp; {{ groom }}
    </h2>

    <div class="mt-4 flex justify-center gap-4 text-center">
      <div class="rounded-lg bg-white/80 px-4 py-2">
        <p class="text-lg font-semibold">{{ countdown?.days ?? 0 }}</p>
        <p class="text-xs text-[var(--muted)]">Hari</p>
      </div>
      <div class="rounded-lg bg-white/80 px-4 py-2">
        <p class="text-lg font-semibold">{{ countdown?.hours ?? 0 }}</p>
        <p class="text-xs text-[var(--muted)]">Jam</p>
      </div>
      <div class="rounded-lg bg-white/80 px-4 py-2">
        <p class="text-lg font-semibold">{{ countdown?.minutes ?? 0 }}</p>
        <p class="text-xs text-[var(--muted)]">Menit</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.h-48 {
  height: 12rem;
}
@media (min-width: 768px) {
  .h-48 {
    height: 18rem;
  }
}
</style>
