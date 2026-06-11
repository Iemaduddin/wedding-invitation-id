<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'simple' | 'ornate'
  tone?: 'blue' | 'champagne'
}>(), {
  variant: 'simple',
  tone: 'blue',
})

const lineColor = computed(() => props.tone === 'champagne' ? '#d4b483' : '#2b6cb0')
const fill = computed(() => props.tone === 'champagne' ? 'rgba(212,180,131,0.2)' : 'rgba(43,108,176,0.2)')
</script>

<template>
  <div class="floral-divider" aria-hidden="true">
    <div class="divider-line" :style="{ borderColor: lineColor }"></div>
    <svg
      v-if="variant === 'ornate'"
      class="divider-ornament"
      width="80"
      height="40"
      viewBox="0 0 80 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="20" rx="10" ry="2.5" :stroke="lineColor" stroke-width="1" fill="none" />
      <ellipse cx="68" cy="20" rx="10" ry="2.5" :stroke="lineColor" stroke-width="1" fill="none" />
      <g :fill="lineColor" opacity="0.5">
        <circle cx="40" cy="20" r="4" />
        <circle cx="40" cy="12" r="2.5" />
        <circle cx="40" cy="28" r="2.5" />
        <circle cx="34" cy="16" r="2" />
        <circle cx="46" cy="16" r="2" />
        <circle cx="34" cy="24" r="2" />
        <circle cx="46" cy="24" r="2" />
      </g>
      <g :fill="lineColor" opacity="0.35">
        <ellipse cx="26" cy="20" rx="6" ry="2" />
        <ellipse cx="54" cy="20" rx="6" ry="2" />
      </g>
    </svg>
    <svg
      v-else
      class="divider-ornament"
      width="60"
      height="20"
      viewBox="0 0 60 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="10" r="3" :fill="lineColor" opacity="0.5" />
      <circle cx="20" cy="10" r="2" :fill="lineColor" opacity="0.3" />
      <circle cx="40" cy="10" r="2" :fill="lineColor" opacity="0.3" />
      <circle cx="10" cy="10" r="1.5" :fill="lineColor" opacity="0.2" />
      <circle cx="50" cy="10" r="1.5" :fill="lineColor" opacity="0.2" />
    </svg>
    <div class="divider-line" :style="{ borderColor: lineColor }"></div>
  </div>
</template>

<style scoped>
.floral-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 0;
  width: 100%;
}

@media (max-width: 640px) {
  .floral-divider {
    padding: 0.5rem 0;
  }
}

.divider-line {
  flex: 1;
  border-top: 1px solid;
  opacity: 0.35;
}

.divider-ornament {
  flex-shrink: 0;
  animation: ornamentPulse 3s ease-in-out infinite;
}

@keyframes ornamentPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.92); }
}
</style>
