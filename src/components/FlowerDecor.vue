<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  position?: string
  size?: number | string
  tone?: 'blue' | 'champagne' | 'gold'
  variant?: 'lotus' | 'rose' | 'wreath' | 'sakura' | 'lily'
  delay?: number | string
  opacity?: number | string
}>(), {
  size: 220,
  delay: 0,
  opacity: 0.95,
})

const resolvedSize = computed(() => Number(props.size) || 220)
const resolvedDelay = computed(() => Number(props.delay) || 0)
const resolvedOpacity = computed(() => Number(props.opacity) ?? 0.95)

const fillColor = computed(() => {
  switch (props.tone) {
    case 'champagne': return '#d4b483'
    case 'gold': return '#c9a96e'
    default: return '#2b6cb0'
  }
})

const fadeColor = computed(() => {
  switch (props.tone) {
    case 'champagne': return 'rgba(212,180,131,0.15)'
    case 'gold': return 'rgba(201,169,110,0.12)'
    default: return 'rgba(43,108,176,0.12)'
  }
})

const gradId = computed(() => `fd-grad-${Math.random().toString(36).slice(2, 8)}`)
</script>

<template>
  <svg
    :class="[
      'flower-decor',
      props.position || '',
      `variant-${props.variant || 'lotus'}`,
      'anim-float',
    ]"
    :width="resolvedSize"
    :height="resolvedSize"
    viewBox="0 0 220 220"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    :style="{ animationDelay: `${resolvedDelay}ms`, opacity: resolvedOpacity }"
  >
    <defs>
      <linearGradient :id="gradId" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" :stop-color="fillColor" stop-opacity="0.25" />
        <stop offset="100%" :stop-color="fillColor" stop-opacity="0.04" />
      </linearGradient>
    </defs>

    <!-- Lotus variant -->
    <g v-if="(props.variant || 'lotus') === 'lotus'" :fill="fillColor" fill-rule="evenodd">
      <g transform="translate(110,110)">
        <circle r="85" :fill="`url(#${gradId})`" />
        <g>
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(0)" opacity="0.92" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(45)" opacity="0.88" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(90)" opacity="0.92" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(135)" opacity="0.88" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(180)" opacity="0.92" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(225)" opacity="0.88" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(270)" opacity="0.92" />
          <ellipse cx="0" cy="-34" rx="14" ry="28" transform="rotate(315)" opacity="0.88" />
        </g>
        <circle cx="0" cy="0" r="18" fill="#fff" opacity="0.7" />
        <circle cx="0" cy="0" r="8" :fill="fillColor" opacity="0.9" />
        <g fill="#fff" opacity="0.85">
          <ellipse cx="0" cy="-18" rx="6" ry="12" transform="rotate(22.5)" />
          <ellipse cx="0" cy="-18" rx="6" ry="12" transform="rotate(67.5)" />
          <ellipse cx="0" cy="-18" rx="6" ry="12" transform="rotate(112.5)" />
          <ellipse cx="0" cy="-18" rx="6" ry="12" transform="rotate(157.5)" />
        </g>
      </g>
    </g>

    <!-- Rose variant -->
    <g v-else-if="props.variant === 'rose'" :fill="fillColor" fill-rule="evenodd">
      <g transform="translate(110,110)">
        <circle r="90" :fill="`url(#${gradId})`" />
        <g opacity="0.9">
          <ellipse cx="0" cy="-20" rx="22" ry="18" transform="rotate(-15)" />
          <ellipse cx="20" cy="-5" rx="22" ry="18" transform="rotate(75)" />
          <ellipse cx="20" cy="15" rx="22" ry="18" transform="rotate(165)" />
          <ellipse cx="-20" cy="15" rx="22" ry="18" transform="rotate(255)" />
          <ellipse cx="-20" cy="-5" rx="22" ry="18" transform="rotate(-105)" />
        </g>
        <g opacity="0.75">
          <ellipse cx="0" cy="-12" rx="14" ry="12" transform="rotate(0)" />
          <ellipse cx="12" cy="0" rx="14" ry="12" transform="rotate(90)" />
          <ellipse cx="0" cy="12" rx="14" ry="12" transform="rotate(180)" />
          <ellipse cx="-12" cy="0" rx="14" ry="12" transform="rotate(270)" />
        </g>
        <circle cx="0" cy="0" r="10" fill="#fff" opacity="0.6" />
        <circle cx="0" cy="0" r="5" :fill="fillColor" opacity="0.95" />
      </g>
    </g>

    <!-- Wreath variant (half-circle decorative corner) -->
    <g v-else-if="props.variant === 'wreath'" :fill="fillColor" fill-rule="evenodd">
      <g transform="translate(10,10)">
        <circle r="95" :fill="`url(#${gradId})`" />
        <g opacity="0.85">
          <ellipse cx="50" cy="30" rx="10" ry="16" transform="rotate(-30 50 30)" />
          <ellipse cx="80" cy="20" rx="10" ry="16" transform="rotate(10 80 20)" />
          <ellipse cx="110" cy="30" rx="10" ry="16" transform="rotate(30 110 30)" />
          <ellipse cx="130" cy="55" rx="10" ry="16" transform="rotate(70 130 55)" />
          <ellipse cx="135" cy="85" rx="10" ry="16" transform="rotate(100 135 85)" />
          <ellipse cx="30" cy="50" rx="10" ry="16" transform="rotate(-70 30 50)" />
          <ellipse cx="20" cy="80" rx="10" ry="16" transform="rotate(-100 20 80)" />
          <ellipse cx="25" cy="110" rx="10" ry="16" transform="rotate(-130 25 110)" />
        </g>
        <g fill="#fff" opacity="0.7">
          <circle cx="50" cy="30" r="4" />
          <circle cx="80" cy="20" r="4" />
          <circle cx="110" cy="30" r="4" />
          <circle cx="130" cy="55" r="4" />
          <circle cx="135" cy="85" r="4" />
          <circle cx="30" cy="50" r="4" />
          <circle cx="20" cy="80" r="4" />
          <circle cx="25" cy="110" r="4" />
        </g>
      </g>
    </g>

    <!-- Sakura variant -->
    <g v-else-if="props.variant === 'sakura'" :fill="fillColor" fill-rule="evenodd">
      <g transform="translate(110,110)">
        <circle r="85" :fill="`url(#${gradId})`" />
        <g opacity="0.95">
          <ellipse cx="0" cy="-30" rx="18" ry="22" transform="rotate(0)" />
          <ellipse cx="0" cy="-30" rx="18" ry="22" transform="rotate(72)" />
          <ellipse cx="0" cy="-30" rx="18" ry="22" transform="rotate(144)" />
          <ellipse cx="0" cy="-30" rx="18" ry="22" transform="rotate(216)" />
          <ellipse cx="0" cy="-30" rx="18" ry="22" transform="rotate(288)" />
        </g>
        <g fill="#fff" opacity="0.75">
          <ellipse cx="0" cy="-16" rx="8" ry="12" transform="rotate(36)" />
          <ellipse cx="0" cy="-16" rx="8" ry="12" transform="rotate(108)" />
          <ellipse cx="0" cy="-16" rx="8" ry="12" transform="rotate(180)" />
          <ellipse cx="0" cy="-16" rx="8" ry="12" transform="rotate(252)" />
          <ellipse cx="0" cy="-16" rx="8" ry="12" transform="rotate(324)" />
        </g>
        <g fill="#fff" opacity="0.5">
          <ellipse cx="0" cy="-38" rx="5" ry="8" transform="rotate(18)" />
          <ellipse cx="0" cy="-38" rx="5" ry="8" transform="rotate(90)" />
          <ellipse cx="0" cy="-38" rx="5" ry="8" transform="rotate(162)" />
          <ellipse cx="0" cy="-38" rx="5" ry="8" transform="rotate(234)" />
          <ellipse cx="0" cy="-38" rx="5" ry="8" transform="rotate(306)" />
        </g>
        <circle cx="0" cy="0" r="6" fill="#fff" opacity="0.9" />
      </g>
    </g>

    <!-- Lily variant -->
    <g v-else :fill="fillColor" fill-rule="evenodd">
      <g transform="translate(110,110)">
        <circle r="90" :fill="`url(#${gradId})`" />
        <g opacity="0.9">
          <ellipse cx="0" cy="-35" rx="10" ry="30" transform="rotate(0)" />
          <ellipse cx="0" cy="-35" rx="10" ry="30" transform="rotate(60)" />
          <ellipse cx="0" cy="-35" rx="10" ry="30" transform="rotate(120)" />
          <ellipse cx="0" cy="-35" rx="10" ry="30" transform="rotate(180)" />
          <ellipse cx="0" cy="-35" rx="10" ry="30" transform="rotate(240)" />
          <ellipse cx="0" cy="-35" rx="10" ry="30" transform="rotate(300)" />
        </g>
        <g fill="#fff" opacity="0.6">
          <ellipse cx="0" cy="-18" rx="5" ry="14" transform="rotate(30)" />
          <ellipse cx="0" cy="-18" rx="5" ry="14" transform="rotate(90)" />
          <ellipse cx="0" cy="-18" rx="5" ry="14" transform="rotate(150)" />
          <ellipse cx="0" cy="-18" rx="5" ry="14" transform="rotate(210)" />
          <ellipse cx="0" cy="-18" rx="5" ry="14" transform="rotate(270)" />
          <ellipse cx="0" cy="-18" rx="5" ry="14" transform="rotate(330)" />
        </g>
        <circle cx="0" cy="0" r="8" fill="#fff" opacity="0.85" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.flower-decor {
  position: absolute;
  pointer-events: none;
  z-index: 1;
}
.flower-decor.variant-lotus,
.flower-decor.variant-sakura,
.flower-decor.variant-lily {
  color: #2b6cb0;
}
.flower-decor.variant-rose {
  color: #d4b483;
}
.flower-decor.variant-wreath {
  color: #2b6cb0;
}
.flower-decor.tone-champagne {
  color: #d4b483;
}
.flower-decor.tone-gold {
  color: #c9a96e;
}

.flower-decor.top-left {
  top: -3rem;
  left: -3rem;
  transform: rotate(-8deg);
}
.flower-decor.top-right {
  top: -3rem;
  right: -3rem;
  transform: rotate(8deg);
}
.flower-decor.bottom-left {
  bottom: -3rem;
  left: -3rem;
  transform: rotate(-12deg);
}
.flower-decor.bottom-right {
  bottom: -3rem;
  right: -3rem;
  transform: rotate(12deg);
}
.flower-decor.card-top-right {
  top: -1.5rem;
  right: -1.5rem;
  width: 120px;
  height: 120px;
}
.flower-decor.card-top-left {
  top: -1.5rem;
  left: -1.5rem;
  width: 120px;
  height: 120px;
}
.flower-decor.card-bottom-right {
  bottom: -1.5rem;
  right: -1.5rem;
  width: 120px;
  height: 120px;
}
.flower-decor.card-bottom-left {
  bottom: -1.5rem;
  left: -1.5rem;
  width: 120px;
  height: 120px;
}
.flower-decor.small {
  width: 96px;
  height: 96px;
}
.flower-decor.tiny {
  width: 64px;
  height: 64px;
}
.flower-decor.anim-float {
  animation-duration: 6.5s;
}

@media (max-width: 640px) {
  .flower-decor {
    opacity: 0.5;
  }
  .flower-decor.top-left {
    top: -5rem;
    left: -6rem;
    transform: scale(1.2) rotate(-8deg);
  }
  .flower-decor.bottom-right {
    bottom: -5rem;
    right: -6rem;
    transform: scale(1.2) rotate(14deg);
  }
  .flower-decor.small {
    width: 72px;
    height: 72px;
  }
  .flower-decor.tiny {
    width: 48px;
    height: 48px;
  }
}
</style>
