<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

const messages = ref<any[]>([])

onMounted(() => {
  messages.value = JSON.parse(localStorage.getItem('rsvps') || '[]').map((m: any) => ({ ...m }))
})
</script>

<template>
  <section class="mt-6 relative anim-fade-in">
    <FlowerDecor class="small top-left" position="top-left" variant="sakura" delay="90" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="lotus" tone="champagne" delay="250" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="lily" size="80" delay="170" />
    <h3 class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
      Ucapan & Doa
    </h3>
    <div class="mt-3 space-y-3">
      <div
        v-for="m in messages"
        :key="m.time"
        class="rounded-lg border border-[var(--line)] bg-[var(--card)]/90 p-3"
      >
        <p class="font-semibold">
          {{ m.name }}
          <span class="text-xs text-[var(--muted)]">· {{ new Date(m.time).toLocaleString() }}</span>
        </p>
        <p class="mt-1 text-sm text-[var(--muted)]">{{ m.note }}</p>
      </div>
    </div>
  </section>
</template>
