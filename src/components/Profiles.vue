<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'

defineProps<{ bride?: any; groom?: any }>()
</script>

<template>
  <section class="mt-6 relative">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="60" />
    <FlowerDecor
      class="small bottom-right"
      position="bottom-right"
      variant="rose"
      tone="champagne"
      delay="210"
    />
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="sakura"
      size="90"
      delay="140"
    />
    <FlowerDecor
      class="card-bottom-left"
      position="card-bottom-left"
      variant="lily"
      size="80"
      tone="champagne"
      delay="300"
    />

    <div
      class="relative rounded-2xl border border-(--line) bg-white/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)]"
    >
      <p class="font-title text-xs uppercase tracking-[0.22em] text-(--gold) text-center mt-1">
        Mempelai
      </p>
      <div
        class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10"
      >
        <!-- Bride -->
        <div class="flex flex-col items-center text-center w-full sm:w-auto">
          <div class="relative">
            <div
              class="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 overflow-hidden rounded-full ring-2 ring-(--gold)/20 shadow-lg mx-auto"
            >
              <img src="/mempelai/icha.jpeg" alt="Icha" class="h-full w-full object-cover" />
            </div>
            <div
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-(--gold) text-white text-[10px] uppercase tracking-[0.15em] px-3 py-0.5 rounded-full font-body font-semibold whitespace-nowrap"
            >
              Mempelai Wanita
            </div>
          </div>
          <h3 class="mt-5 font-script text-3xl sm:text-4xl text-(--ink)">Izzah Nabila</h3>
          <p class="mt-1 font-body text-sm text-(--muted)">
            Putri dari Bapak Moh. Zainal Arifin & Ibu Nurul Kudratinah
          </p>
        </div>

        <!-- Heart -->
        <div class="flex-shrink-0 flex items-center justify-center">
          <svg
            class="love-icon"
            width="52"
            height="52"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="hg" cx="50%" cy="35%">
                <stop offset="0%" stop-color="#ff6b8a" />
                <stop offset="100%" stop-color="#e74c6f" />
              </radialGradient>
              <filter id="h-shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="3"
                  flood-color="#e74c6f"
                  flood-opacity="0.3"
                />
              </filter>
            </defs>
            <circle cx="26" cy="26" r="23" fill="white" opacity="0.8" />
            <path
              d="M26 43s-13-8-13-17.5C13 20 16 16 19.5 16c2.3 0 4 1.2 6.5 3.5C28.5 17.2 30.2 16 32.5 16 36 16 39 20 39 25.5 39 35 26 43 26 43z"
              fill="url(#hg)"
              filter="url(#h-shadow)"
            />
            <path
              d="M26 39s-10-6-10-13.5C16 21 18.5 18.5 21 18.5c1.8 0 3 1 5 2.8 2-1.8 3.2-2.8 5-2.8 2.5 0 5 2.5 5 7 0 7.5-10 13.5-10 13.5z"
              fill="#fff"
              opacity="0.2"
            />
          </svg>
        </div>

        <!-- Groom -->
        <div class="flex flex-col items-center text-center w-full sm:w-auto">
          <div class="relative">
            <div
              class="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 overflow-hidden rounded-full ring-2 ring-(--gold)/20 shadow-lg mx-auto"
            >
              <img src="/mempelai/didin.jpg" alt="Didin" class="h-full w-full object-cover" />
            </div>
            <div
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-(--gold) text-white text-[10px] uppercase tracking-[0.15em] px-3 py-0.5 rounded-full font-body font-semibold whitespace-nowrap"
            >
              Mempelai Pria
            </div>
          </div>
          <h3 class="mt-5 font-script text-3xl sm:text-4xl text-(--ink)">Iemaduddin</h3>
          <p class="mt-1 font-body text-sm text-(--muted)">
            Putra dari Bapak Sahrul Imam & Ibu Husnol Hotimah
          </p>
        </div>
      </div>

      <!-- Romantic divider -->
      <div class="mt-8 flex items-center justify-center gap-3">
        <span
          class="h-px w-12 bg-gradient-to-r from-transparent via-(--gold)/40 to-transparent"
        ></span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M7 13s-4-2.5-4-6C3 4.5 4.5 3 7 3s4 1.5 4 4c0 3.5-4 6-4 6z"
            fill="var(--gold)"
            opacity="0.5"
          />
          <circle cx="7" cy="5.5" r="1.5" fill="#fff" opacity="0.8" />
        </svg>
        <span
          class="h-px w-12 bg-gradient-to-r from-transparent via-(--gold)/40 to-transparent"
        ></span>
      </div>

      <p class="mt-4 font-arabic text-base text-(--gold) text-center leading-relaxed" dir="rtl">
        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
      </p>
      <p class="mt-1 font-body text-sm text-(--muted) text-center italic leading-relaxed">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari
        jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di
        antaramu rasa kasih dan sayang."<br />
        <span class="not-italic text-[10px]">(QS. Ar-Rum: 21)</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.love-icon {
  animation: loveBeat 1.4s ease-in-out infinite;
}

@keyframes loveBeat {
  0%,
  100% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.15);
  }
  30% {
    transform: scale(0.95);
  }
  45% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(1);
  }
}
</style>
