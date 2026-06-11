<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  count?: number
  petalColor?: string
  petalColorAlt?: string
}>(), {
  count: 12,
  petalColor: '#2b6cb0',
  petalColorAlt: '#d4b483',
})

interface Petal {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  sway: number
  swayDuration: number
  opacity: number
  color: string
  shape: number
}

const petals = ref<Petal[]>([])

function createPetals() {
  const items: Petal[] = []
  for (let i = 0; i < props.count; i++) {
    const isAlt = Math.random() > 0.5
    items.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 18,
      rotation: Math.random() * 360,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 6,
      sway: 15 + Math.random() * 30,
      swayDuration: 3 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.35,
      color: isAlt ? props.petalColorAlt : props.petalColor,
      shape: Math.floor(Math.random() * 3),
    })
  }
  petals.value = items
}

onMounted(createPetals)
</script>

<template>
  <div class="petals-container" aria-hidden="true">
    <div
      v-for="petal in petals"
      :key="petal.id"
      class="petal"
      :style="{
        left: `${petal.x}%`,
        top: `${petal.y}%`,
        width: `${petal.size}px`,
        height: `${petal.size * 0.6}px`,
        borderRadius: petal.shape === 0 ? '50% 0 50% 0' : petal.shape === 1 ? '50% 50% 0 0' : '50%',
        opacity: petal.opacity,
        backgroundColor: petal.color,
        animationDuration: `${petal.duration}s, ${petal.swayDuration}s`,
        animationDelay: `${petal.delay}s, ${petal.delay}s`,
        '--sway': `${petal.sway}px`,
        transform: `rotate(${petal.rotation}deg)`,
      }"
    />
  </div>
</template>

<style scoped>
.petals-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.petal {
  position: absolute;
  will-change: transform, opacity;
  animation:
    petalFall var(--duration, 6s) ease-in-out infinite,
    petalSway var(--sway-duration, 3.5s) ease-in-out infinite alternate;
}

@keyframes petalFall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: var(--opacity, 0.3);
  }
  90% {
    opacity: var(--opacity, 0.3);
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes petalSway {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: var(--sway, 20px);
  }
}
</style>
