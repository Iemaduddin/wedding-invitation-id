<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import FlowerDecor from './components/FlowerDecor.vue'
import FloatingPetals from './components/FloatingPetals.vue'
import FloralDivider from './components/FloralDivider.vue'
import InvitationCard from './components/InvitationCard.vue'
import Profiles from './components/Profiles.vue'
import Details from './components/Details.vue'
import LoveStory from './components/LoveStory.vue'
import Gallery from './components/Gallery.vue'
import WishesSection from './components/WishesSection.vue'

import FooterSection from './components/FooterSection.vue'

const brideName = 'Icha'
const groomName = 'Didin'
const mapEmbedUrl =
  'https://maps.google.com/maps?q=V3GF%2BR3Q+Toko+AL-BAROKAH,+Karang+Anyar,+Karang+Panasan,+Blega,+Bangkalan,+Jawa+Timur&output=embed'

const eventDate = new Date('2026-07-05T09:00:00')
const invitedName = ref('Tamu Undangan')
const invitedAddress = ref('')
const isInvitationOpen = ref(false)
const isDesktopNavOpen = ref(true)
const isMusicOn = ref(false)
const musicVolume = ref(99)

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

let countdownTimer: ReturnType<typeof setInterval> | null = null
let revealObserver: IntersectionObserver | null = null

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(eventDate)
})

const countdownItems = computed(() => [
  { label: 'Hari', value: countdown.value.days },
  { label: 'Jam', value: countdown.value.hours },
  { label: 'Menit', value: countdown.value.minutes },
  { label: 'Detik', value: countdown.value.seconds },
])

// Background music
const bgMusicUrl = 'wedding-song.mp3'
const bgAudio = new Audio(bgMusicUrl)
bgAudio.loop = true
bgAudio.preload = 'auto'
bgAudio.volume = 0.99

function toTitleCase(value: string): string {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      const first = word.charAt(0).toUpperCase()
      return first + word.slice(1).toLowerCase()
    })
    .join(' ')
}

function parseInviteeName(rawName: string | null): string {
  if (!rawName) return 'Tamu Undangan'

  const cleaned = decodeURIComponent(rawName)
    .replace(/[+_]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return cleaned ? cleaned : 'Tamu Undangan'
}

function parseInviteeAddress(rawAddress: string | null): string {
  if (!rawAddress) return ''

  const cleaned = decodeURIComponent(rawAddress)
    .replace(/[+_]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return cleaned
}

function updateCountdown(): void {
  const diff = eventDate.getTime() - Date.now()

  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    if (countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
    return
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  countdown.value = { days, hours, minutes, seconds }
}

function setupRevealObserver(): void {
  revealObserver?.disconnect()

  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
  )

  nodes.forEach((node) => revealObserver?.observe(node))
}

watch(musicVolume, (value) => {
  bgAudio.volume = Math.max(0, Math.min(1, value / 100))
})

async function setMusicState(enabled: boolean): Promise<void> {
  isMusicOn.value = enabled
  if (enabled) {
    bgAudio.volume = Math.max(0, Math.min(1, musicVolume.value / 100))
    try {
      await bgAudio.play()
    } catch {
      /* autoplay blocked */
    }
  } else {
    bgAudio.pause()
  }
}

function toggleMusic(): void {
  void setMusicState(!isMusicOn.value)
}

async function openInvitation(): Promise<void> {
  isInvitationOpen.value = true
  void setMusicState(true)
  await nextTick()
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search)
  invitedName.value = parseInviteeName(queryParams.get('name'))
  invitedAddress.value = parseInviteeAddress(
    queryParams.get('address') || queryParams.get('alamat'),
  )
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
  void nextTick(setupRevealObserver)
  // prevent body scroll while opening overlay is visible
  if (!isInvitationOpen.value) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
  revealObserver?.disconnect()
  bgAudio.pause()
  bgAudio.src = ''
  document.body.style.overflow = ''
})

// watch invitation open state to toggle body scroll
watch(isInvitationOpen, (open) => {
  if (open) {
    document.body.style.overflow = ''
  } else {
    document.body.style.overflow = 'hidden'
  }
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-(--bg-soft) pb-20 text-(--ink) md:pb-0">
    <!-- Floating petals background -->
    <FloatingPetals :count="16" />

    <div class="pointer-events-none absolute inset-0 opacity-70">
      <!-- Main corner decorations -->
      <FlowerDecor class="top-left" position="top-left" variant="lotus" size="260" />
      <FlowerDecor
        class="bottom-right"
        position="bottom-right"
        variant="sakura"
        tone="champagne"
        size="240"
      />
      <FlowerDecor
        class="top-right"
        position="top-right"
        variant="lily"
        size="180"
        delay="300"
        opacity="0.5"
      />
      <FlowerDecor
        class="bottom-left"
        position="bottom-left"
        variant="rose"
        size="160"
        delay="500"
        opacity="0.45"
      />

      <!-- Mid-edge accents -->
      <FlowerDecor
        class="!absolute hidden md:block"
        style="top: 30%; left: -2rem"
        variant="sakura"
        size="100"
        delay="700"
        opacity="0.35"
      />
      <FlowerDecor
        class="!absolute hidden md:block"
        style="top: 55%; right: -2rem"
        variant="lily"
        size="90"
        delay="900"
        opacity="0.3"
      />

      <svg
        class="ornament ornament-top"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="g1" cx="30%" cy="25%">
            <stop offset="0%" stop-color="rgba(43,108,176,0.18)" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
          <radialGradient id="g1-glow" cx="50%" cy="50%">
            <stop offset="0%" stop-color="rgba(43,108,176,0.12)" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" rx="999" />
        <circle cx="200" cy="200" r="160" fill="url(#g1-glow)" />
        <g transform="translate(60,60) scale(0.9)">
          <circle cx="80" cy="80" r="28" fill="var(--gold)" />
          <g fill="#fff">
            <ellipse cx="80" cy="40" rx="18" ry="34" transform="rotate(-20 80 40)" opacity="0.95" />
            <ellipse
              cx="120"
              cy="80"
              rx="18"
              ry="34"
              transform="rotate(40 120 80)"
              opacity="0.95"
            />
            <ellipse
              cx="80"
              cy="120"
              rx="18"
              ry="34"
              transform="rotate(160 80 120)"
              opacity="0.95"
            />
            <ellipse
              cx="40"
              cy="80"
              rx="18"
              ry="34"
              transform="rotate(-140 40 80)"
              opacity="0.95"
            />
          </g>
        </g>
      </svg>

      <svg
        class="ornament ornament-bottom"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="g2" cx="70%" cy="75%">
            <stop offset="0%" stop-color="rgba(43,108,176,0.14)" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g2)" rx="999" />
        <g transform="translate(220,220) scale(1.02)">
          <circle cx="80" cy="80" r="22" fill="var(--gold)" />
          <g fill="#fff">
            <ellipse cx="80" cy="40" rx="14" ry="28" transform="rotate(-10 80 40)" opacity="0.95" />
            <ellipse
              cx="112"
              cy="80"
              rx="14"
              ry="28"
              transform="rotate(50 112 80)"
              opacity="0.95"
            />
            <ellipse
              cx="80"
              cy="112"
              rx="14"
              ry="28"
              transform="rotate(160 80 112)"
              opacity="0.95"
            />
            <ellipse
              cx="48"
              cy="80"
              rx="14"
              ry="28"
              transform="rotate(-140 48 80)"
              opacity="0.95"
            />
          </g>
        </g>
      </svg>

      <!-- Decorative glow orbs -->
      <div
        class="floral-glow"
        style="
          top: 15%;
          left: 10%;
          width: 200px;
          height: 200px;
          background: rgba(43, 108, 176, 0.12);
        "
      ></div>
      <div
        class="floral-glow"
        style="
          bottom: 20%;
          right: 8%;
          width: 250px;
          height: 250px;
          background: rgba(212, 180, 131, 0.08);
        "
      ></div>
    </div>

    <section
      v-if="!isInvitationOpen"
      class="fixed inset-0 z-40 flex items-center justify-center bg-[color-mix(in_srgb,var(--bg-soft)_78%,white)] px-5"
    >
      <div
        class="fade-up relative w-full max-w-sm rounded-4xl border border-(--line) bg-(--card)/90 px-6 py-8 text-center shadow-[0_18px_60px_rgba(42,33,25,0.2)] backdrop-blur"
      >
        <FlowerDecor
          class="card-top-right"
          position="card-top-right"
          variant="lotus"
          size="100"
          tone="gold"
        />
        <FlowerDecor
          class="card-bottom-left"
          position="card-bottom-left"
          variant="sakura"
          size="80"
          tone="champagne"
        />
        <p class="font-title text-xs uppercase tracking-[0.28em] text-(--gold) mt-3">
          Undangan Pernikahan
        </p>
        <h2 class="mt-4 font-script text-5xl leading-none text-(--ink)">
          {{ brideName }} & {{ groomName }}
        </h2>
        <div class="mt-4 flex items-center justify-center gap-2">
          <span class="h-px w-8 bg-(--gold)/40"></span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="3" fill="var(--gold)" opacity="0.6" />
            <circle cx="8" cy="4" r="2" fill="var(--gold)" opacity="0.4" />
            <circle cx="8" cy="12" r="2" fill="var(--gold)" opacity="0.4" />
            <circle cx="4" cy="8" r="2" fill="var(--gold)" opacity="0.3" />
            <circle cx="12" cy="8" r="2" fill="var(--gold)" opacity="0.3" />
          </svg>
          <span class="h-px w-8 bg-(--gold)/40"></span>
        </div>
        <p class="mt-4 font-title text-[11px] uppercase tracking-[0.24em] text-(--gold)">
          Kepada Yth.
        </p>
        <p class="mt-2 font-body text-2xl font-semibold">{{ invitedName }}</p>
        <p v-if="invitedAddress" class="mt-1 font-body text-sm text-(--muted)">
          {{ invitedAddress }}
        </p>
        <button
          type="button"
          class="mt-7 inline-flex w-full items-center justify-center rounded-full bg-(--gold) px-6 py-3 font-title text-xs uppercase tracking-[0.24em] text-white transition hover:brightness-110 hover:shadow-[0_0_24px_rgba(43,108,176,0.35)]"
          @click="openInvitation"
        >
          Buka Undangan
        </button>
      </div>
    </section>

    <header
      class="sticky top-0 z-30 border-b border-(--line) bg-(--card)/80 backdrop-blur-md transition"
      :class="isInvitationOpen ? 'opacity-100' : 'pointer-events-none opacity-15 blur-[2px]'"
    >
      <div
        class="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-8"
      >
        <div class="flex items-center gap-2">
          <p class="font-title text-xs uppercase tracking-[0.24em] text-(--gold) sm:text-sm">
            {{ brideName }} & {{ groomName }}
          </p>
          <span
            v-if="isMusicOn"
            class="music-dot hidden h-2.5 w-2.5 rounded-full bg-(--gold) shadow-[0_0_0_6px_rgba(214,180,131,0.14)] sm:inline-flex"
          ></span>
        </div>
        <div class="flex items-center gap-2">
          <nav class="hidden items-center gap-2 sm:flex">
            <a
              href="#acara"
              class="rounded-full border border-(--line) px-3 py-1.5 font-body text-xs font-semibold text-(--muted) transition hover:border-(--gold) hover:text-(--gold)"
            >
              Acara
            </a>
          </nav>
          <button
            type="button"
            class="rounded-full border border-(--line) px-3 py-1.5 font-body text-xs font-semibold text-(--muted) transition hover:border-(--gold) hover:text-(--gold)"
            @click="toggleMusic"
          >
            {{ isMusicOn ? 'Suara Off' : 'Suara On' }}
          </button>
          <label
            class="hidden items-center gap-2 rounded-full border border-(--line) px-3 py-1.5 sm:flex"
          >
            <span class="font-body text-[11px] font-semibold text-(--muted)">Vol</span>
            <input
              v-model="musicVolume"
              type="range"
              min="0"
              max="100"
              class="w-24 accent-(--gold)"
            />
          </label>
        </div>
      </div>
    </header>

    <section
      class="relative mx-auto flex min-h-[calc(100vh-57px)] max-w-5xl items-start px-3 py-4 transition sm:px-8 sm:py-12 pb-24 md:pb-12"
      :class="isInvitationOpen ? 'opacity-100' : 'pointer-events-none opacity-20 blur-[3px]'"
    >
      <div class="w-full space-y-3 sm:space-y-6">
        <InvitationCard
          :brideName="brideName"
          :groomName="groomName"
          :invitedName="invitedName"
          :invitedAddress="invitedAddress"
          :formattedDate="formattedDate"
        />

        <div data-reveal class="reveal-on-scroll">
          <FloralDivider variant="simple" tone="blue" />
        </div>
        <div id="mempelai" class="scroll-mt-24 reveal-on-scroll" data-reveal><Profiles /></div>
        <div data-reveal class="reveal-on-scroll">
          <FloralDivider variant="simple" tone="champagne" />
        </div>
        <div data-reveal class="reveal-on-scroll">
          <Details :countdownItems="countdownItems" :mapEmbedUrl="mapEmbedUrl" />
        </div>
        <div data-reveal class="reveal-on-scroll">
          <FloralDivider variant="simple" tone="blue" />
        </div>
        <div id="cerita" class="scroll-mt-24 reveal-on-scroll" data-reveal>
          <LoveStory />
        </div>
        <div data-reveal class="reveal-on-scroll">
          <FloralDivider variant="simple" tone="blue" />
        </div>
        <div id="galeri" class="scroll-mt-24 reveal-on-scroll" data-reveal><Gallery /></div>
        <div data-reveal class="reveal-on-scroll">
          <FloralDivider variant="simple" tone="blue" />
        </div>
        <div id="ucapan" class="scroll-mt-24 reveal-on-scroll" data-reveal>
          <WishesSection
            apiUrl="https://script.google.com/macros/s/AKfycbxLrlLO16lnEtdTmu8QHfHwdA2n7rHM8BrIV55xpSZStzdacyXCFUMLh1sxNEUSk7KD/exec"
          />
        </div>
        <div data-reveal class="reveal-on-scroll">
          <FloralDivider variant="ornate" tone="champagne" />
        </div>
        <div data-reveal class="reveal-on-scroll">
          <FooterSection />
        </div>
      </div>
    </section>

    <nav
      class="fixed inset-x-0 bottom-0 z-30 border-t border-(--line) bg-(--card)/95 backdrop-blur-md md:hidden transition-transform duration-300"
      :class="isInvitationOpen ? 'translate-y-0' : 'pointer-events-none translate-y-full'"
    >
      <div class="flex items-center justify-around px-2 py-1">
        <a
          href="#acara"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-center font-body text-[9px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect
              x="1"
              y="3"
              width="16"
              height="12"
              rx="2"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <path d="M1 7h16" stroke="currentColor" stroke-width="1.2" opacity="0.7" />
            <circle cx="9" cy="10.5" r="1.5" fill="currentColor" opacity="0.5" />
          </svg>
          Acara
        </a>
        <a
          href="#cerita"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-center font-body text-[9px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4 2h10v14l-5-3-5 3V2z"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
          </svg>
          Cerita
        </a>
        <a
          href="#mempelai"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-center font-body text-[9px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle
              cx="9"
              cy="5"
              r="3.5"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M3 16c0-3.5 2.5-6 6-6s6 2.5 6 6"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M9 9c-3 0-5 2-5 5"
              stroke="currentColor"
              stroke-width="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
          Mempelai
        </a>
        <a
          href="#galeri"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-center font-body text-[9px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect
              x="1"
              y="2"
              width="16"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <circle cx="6" cy="7" r="1.5" fill="currentColor" opacity="0.5" />
            <path
              d="M1 12l4-3 3 2 3-3 6 4"
              stroke="currentColor"
              stroke-width="1.2"
              opacity="0.7"
            />
          </svg>
          Galeri
        </a>
        <a
          href="#ucapan"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-center font-body text-[9px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M3 2h12a1 1 0 011 1v10a1 1 0 01-1 1H6l-3 3V3a1 1 0 011-1z"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <path d="M5 6h8M5 9h6" stroke="currentColor" stroke-width="1" opacity="0.5" />
          </svg>
          Ucapan
        </a>
        <button
          type="button"
          class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-center font-body text-[9px] font-semibold text-(--muted) transition hover:text-(--gold)"
          @click="toggleMusic"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.2" opacity="0.7" />
            <path d="M6 9h1.5l2-3v6l-2-3H6" fill="currentColor" opacity="0.5" />
            <path
              d="M10.5 7.5c.5.5.8 1 .8 1.5s-.3 1-.8 1.5"
              stroke="currentColor"
              stroke-width="1"
              opacity="0.7"
            />
          </svg>
          {{ isMusicOn ? 'Audio ON' : 'Audio OFF' }}
        </button>
      </div>
    </nav>

    <!-- Desktop bottom bar -->
    <div
      class="hidden md:block fixed bottom-0 left-1/2 z-30 -translate-x-1/2 transition-all duration-300"
      :class="[
        isInvitationOpen ? '' : 'pointer-events-none',
        isDesktopNavOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      ]"
    >
      <div
        class="relative flex items-center gap-1 rounded-2xl border border-(--line) bg-(--card)/95 px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md mb-4"
      >
        <button
          type="button"
          class="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-(--muted) text-white shadow transition hover:bg-(--gold)"
          @click="isDesktopNavOpen = false"
          title="Tutup"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path
              d="M1 1l8 8M9 1l-8 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <a
          href="#acara"
          class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center font-body text-[10px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect
              x="1"
              y="3"
              width="16"
              height="12"
              rx="2"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <path d="M1 7h16" stroke="currentColor" stroke-width="1.2" opacity="0.7" />
            <circle cx="9" cy="10.5" r="1.5" fill="currentColor" opacity="0.5" />
          </svg>
          <span>Acara</span>
        </a>
        <a
          href="#cerita"
          class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center font-body text-[10px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M4 2h10v14l-5-3-5 3V2z"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
          </svg>
          <span>Cerita</span>
        </a>
        <a
          href="#mempelai"
          class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center font-body text-[10px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle cx="9" cy="5" r="3.5" stroke="currentColor" stroke-width="1.2" fill="none" />
            <path
              d="M3 16c0-3.5 2.5-6 6-6s6 2.5 6 6"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
            />
            <path
              d="M9 9c-3 0-5 2-5 5"
              stroke="currentColor"
              stroke-width="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
          <span>Mempelai</span>
        </a>
        <a
          href="#galeri"
          class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center font-body text-[10px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect
              x="1"
              y="2"
              width="16"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <circle cx="6" cy="7" r="1.5" fill="currentColor" opacity="0.5" />
            <path
              d="M1 12l4-3 3 2 3-3 6 4"
              stroke="currentColor"
              stroke-width="1.2"
              opacity="0.7"
            />
          </svg>
          <span>Galeri</span>
        </a>
        <a
          href="#ucapan"
          class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center font-body text-[10px] font-semibold text-(--muted) transition hover:text-(--gold)"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M3 2h12a1 1 0 011 1v10a1 1 0 01-1 1H6l-3 3V3a1 1 0 011-1z"
              stroke="currentColor"
              stroke-width="1.2"
              fill="none"
              opacity="0.7"
            />
            <path d="M5 6h8M5 9h6" stroke="currentColor" stroke-width="1" opacity="0.5" />
          </svg>
          <span>Ucapan</span>
        </a>
        <button
          type="button"
          class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center font-body text-[10px] font-semibold text-(--muted) transition hover:text-(--gold)"
          @click="toggleMusic"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.2" opacity="0.7" />
            <path d="M6 9h1.5l2-3v6l-2-3H6" fill="currentColor" opacity="0.5" />
            <path
              d="M10.5 7.5c.5.5.8 1 .8 1.5s-.3 1-.8 1.5"
              stroke="currentColor"
              stroke-width="1"
              opacity="0.7"
            />
          </svg>
          <span>{{ isMusicOn ? 'Audio ON' : 'Audio OFF' }}</span>
        </button>
      </div>
    </div>

    <!-- Desktop reopen button -->
    <button
      type="button"
      class="hidden md:flex fixed bottom-0 left-1/2 z-30 -translate-x-1/2 transition-all duration-300 items-center justify-center w-10 h-10 rounded-full bg-(--gold) text-white shadow-lg hover:brightness-110 mb-4"
      :class="[
        isInvitationOpen ? '' : 'pointer-events-none',
        isDesktopNavOpen ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100',
      ]"
      @click="isDesktopNavOpen = true"
      title="Buka navigasi"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M3 6l6 6 6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </main>
</template>
