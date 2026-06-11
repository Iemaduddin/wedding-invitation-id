<script setup lang="ts">
import { ref } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

const accounts = [
  { name: 'Bank ABC', number: '123-456-7890', type: 'Rekening' },
  { name: 'e-Wallet XYZ', number: '0812-3456-7890', type: 'E-Wallet' },
]

function copy(text: string) {
  void navigator.clipboard?.writeText(text)
  alert('Nomor berhasil disalin')
}
</script>

<template>
  <section class="mt-6 relative anim-fade-in">
    <FlowerDecor class="small top-left" position="top-left" variant="sakura" delay="100" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="lotus" tone="champagne" delay="240" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="lily" size="80" tone="champagne" delay="160" />
    <h3 class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
      Wedding Gift
    </h3>
    <div class="mt-3 grid gap-3 sm:grid-cols-2">
      <div
        v-for="acc in accounts"
        :key="acc.number"
        class="rounded-xl border border-[var(--line)] bg-[var(--card)]/90 p-4"
      >
        <p class="font-semibold">{{ acc.name }}</p>
        <p class="text-sm text-[var(--muted)]">{{ acc.number }}</p>
        <button
          @click="copy(acc.number)"
          class="mt-3 inline-flex items-center rounded-full bg-[var(--gold)] px-3 py-2 text-white text-sm"
        >
          Salin
        </button>
      </div>
    </div>
  </section>
</template>
