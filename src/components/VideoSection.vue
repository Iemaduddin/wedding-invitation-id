<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'
</script>

<template>
  <section class="mt-6 relative anim-fade-in">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="90" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="rose" tone="champagne" delay="230" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="sakura" size="80" delay="150" />
    <h3 class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
      Video Prewedding
    </h3>
    <div class="mt-3 rounded-lg overflow-hidden bg-black/5">
      <video
        controls
        class="w-full max-h-72"
        preload="metadata"
        poster="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop&s="
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  </section>
</template>
