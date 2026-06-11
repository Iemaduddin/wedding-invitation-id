<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import FlowerDecor from './FlowerDecor.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <section
    class="relative mx-auto max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--card)]/95 p-6 text-center shadow-lg sm:p-12 anim-scale-up"
  >
    <FlowerDecor
      class="card-top-right small"
      position="card-top-right"
      tone="champagne"
      delay="160"
    />
    <FlowerDecor class="small bottom-right" position="bottom-right" delay="320" />
    <p class="font-[var(--font-title)] text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
      Undangan Pernikahan
    </p>
    <h2 class="mt-3 font-[var(--font-script)] text-4xl leading-none text-[var(--ink)] sm:text-5xl">
      Icha &amp; Didin
    </h2>
    <p class="mt-3 text-[var(--muted)]">
      Dengan penuh suka cita, kami mengundang Anda untuk hadir merayakan resepsi pernikahan kami.
    </p>

    <div class="mt-6 grid gap-3 sm:grid-cols-3 sm:items-center">
      <div class="col-span-2 text-left">
        <p
          class="font-[var(--font-title)] text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]"
        >
          Detail Acara
        </p>
        <p class="mt-2 font-[var(--font-body)] text-lg font-semibold">5 Juli 2026 • 09.00 WIB</p>
        <p class="mt-1 text-[var(--muted)]">
          Perumahan Istana Taj-Mahal blok L no 09, Karang Anyar, Kec. Blega, Kab Bangkalan
        </p>
      </div>

      <div class="col-span-1 flex flex-col gap-2 items-center">
        <a
          href="#acara"
          class="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-white"
          >Rangkaian Acara</a
        >
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)]"
          >Konfirmasi</a
        >
      </div>
    </div>

    <div class="mt-6 flex gap-3 justify-center flex-wrap">
      <div class="w-20 h-20 rounded-xl bg-white/60 p-2 flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="8" fill="var(--gold)" />
          <path
            d="M24 8c2 4 6 4 8 8s4 4 8 6c-4 2-4 6-8 8s-6 6-8 8c-2-4-6-4-8-8s-4-4-8-6c4-2 4-6 8-8s6-6 8-8z"
            fill="#fff"
            opacity="0.9"
          />
        </svg>
      </div>
      <div class="w-20 h-20 rounded-xl bg-white/60 p-2 flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="7" fill="#fff" stroke="var(--gold)" stroke-width="1.5" />
          <path
            d="M24 6c3 5 8 5 11 10 3 5 6 5 6 10-5 0-5 5-10 8s-6 8-11 11c-3-5-8-5-11-10-3-5-6-5-6-10 5 0 5-5 10-8s6-8 11-11z"
            fill="var(--gold)"
            opacity="0.12"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
