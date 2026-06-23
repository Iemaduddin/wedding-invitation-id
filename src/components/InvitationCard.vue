<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'

defineProps<{
  brideName: string
  groomName: string
  invitedName: string
  invitedAddress: string
  formattedDate: string
}>()
</script>

<template>
  <div
    id="undangan"
    data-reveal
    class="reveal-on-scroll w-full rounded-3xl border border-(--line) bg-(--card)/90 px-4 py-6 shadow-[0_18px_60px_rgba(42,33,25,0.18)] backdrop-blur sm:rounded-4xl sm:px-8 sm:py-10 md:px-14 md:py-14 card-floral relative"
  >
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="lotus"
      tone="champagne"
      size="110"
    />
    <FlowerDecor class="card-bottom-left" position="card-bottom-left" variant="sakura" size="90" />
    <FlowerDecor
      class="card-top-left"
      position="card-top-left"
      variant="lily"
      size="80"
      tone="champagne"
    />
    <FlowerDecor class="card-bottom-right" position="card-bottom-right" variant="rose" size="70" />

    <div class="text-center">
      <p class="font-arabic text-base md:text-3xl tracking-[0.2em] text-(--gold)/60 mb-4">
        اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
      </p>
      <p
        class="mt-1 font-title text-[10px] uppercase tracking-[0.3em] text-(--gold) sm:text-xs sm:tracking-[0.35em]"
      >
        Pernikahan
      </p>
      <div class="mt-2 flex items-center justify-center gap-2">
        <span
          class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/40 to-transparent"
        ></span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <circle cx="6" cy="6" r="2" fill="var(--gold)" opacity="0.5" />
          <circle cx="6" cy="2.5" r="1.2" fill="var(--gold)" opacity="0.35" />
          <circle cx="6" cy="9.5" r="1.2" fill="var(--gold)" opacity="0.35" />
          <circle cx="2.5" cy="6" r="1.2" fill="var(--gold)" opacity="0.3" />
          <circle cx="9.5" cy="6" r="1.2" fill="var(--gold)" opacity="0.3" />
        </svg>
        <span
          class="h-px w-10 bg-gradient-to-r from-transparent via-(--gold)/40 to-transparent"
        ></span>
      </div>

      <h1
        class="mt-4 font-script text-4xl leading-tight text-(--ink) sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {{ brideName }} <span class="text-(--gold)">&</span> {{ groomName }}
      </h1>
    </div>

    <div
      class="mt-6 rounded-2xl border border-(--line) bg-white/80 p-5 sm:p-6 flex flex-col gap-4 sm:gap-5 sm:mt-10"
    >
      <div class="flex flex-col gap-3">
        <p
          class="font-title text-[10px] uppercase tracking-[0.25em] text-(--gold) sm:text-xs sm:tracking-[0.32em]"
        >
          Kepada Yth.
        </p>
        <p class="font-body text-xl font-semibold leading-tight sm:text-3xl">
          {{ invitedName }}
        </p>
        <p v-if="invitedAddress" class="font-body text-sm text-(--muted)">
          {{ invitedAddress }}
        </p>
        <div class="h-px bg-(--line)"></div>
        <p class="font-body text-xs leading-relaxed text-(--muted) md:text-sm">
          Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan acara
          pernikahan putra-putri kami. Mohon doa restu dan kehadiran Bapak/Ibu/Saudara/i untuk
          memeriahkan momen bahagia ini.
        </p>
        <p class="font-body text-xs leading-relaxed text-(--muted)/70 italic">
          * Mohon maaf apabila terdapat kesalahan penulisan nama dan gelar pada undangan ini.
        </p>
      </div>

      <div class="h-px bg-(--line)"></div>

      <div id="acara" class="scroll-mt-24 flex flex-col gap-3">
        <p
          class="font-title text-[10px] uppercase tracking-[0.25em] text-(--gold) sm:text-xs sm:tracking-[0.28em]"
        >
          Save The Date
        </p>
        <div class="flex flex-col">
          <p class="font-title text-xl sm:text-2xl">Ahad, {{ formattedDate }}</p>
          <p class="font-body text-sm text-(--muted) sm:text-base">09.00 WIB - Selesai</p>
        </div>
        <div class="h-px bg-(--line)"></div>
        <p class="font-body text-xs leading-relaxed text-(--muted) sm:text-sm">
          Perumahan Istana Taj-Mahal blok L no 09, Karang Anyar, Kec. Blega, Kab Bangkalan, Jawa
          Timur
        </p>
      </div>
    </div>

    <footer
      class="mt-8 flex flex-col gap-4 border-t border-(--line) pt-6 font-body text-xs text-(--muted) sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-7"
    >
      <p className="text-sm">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
        hadir & memberikan doa restu.
      </p>
    </footer>
  </div>
</template>
