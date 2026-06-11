<script setup lang="ts">
import { ref } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

const items = [
  { q: 'Dimana parkir?', a: 'Parkir tersedia di area gedung dan di seberang jalan.' },
  { q: 'Dress code?', a: 'Elegan, warna biru atau earth tones direkomendasikan.' },
  { q: 'Apakah anak-anak boleh hadir?', a: 'Anak-anak dipersilakan.' },
]

const open = ref<number | null>(null)
function toggle(i: number) {
  open.value = open.value === i ? null : i
}
</script>

<template>
  <section class="mt-6 relative anim-fade-in">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="110" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="sakura" tone="champagne" delay="250" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="lily" size="80" delay="190" />
    <h3 class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
      FAQ
    </h3>
    <div class="mt-3 space-y-2">
      <div
        v-for="(it, i) in items"
        :key="i"
        class="rounded-lg border border-[var(--line)] bg-[var(--card)]/90 p-3"
      >
        <button @click="toggle(i)" class="w-full text-left font-semibold">{{ it.q }}</button>
        <div v-if="open === i" class="mt-2 text-sm text-[var(--muted)]">{{ it.a }}</div>
      </div>
    </div>
  </section>
</template>
