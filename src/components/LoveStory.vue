<script setup lang="ts">
import FlowerDecor from './FlowerDecor.vue'

interface Story {
  date: string
  title: string
  description: string
}

const stories: Story[] = [
  {
    date: 'SMP — 2018',
    title: 'Pertama Menjalin Kisah',
    description:
      'Perjalanan kami dimulai sejak masa SMP, saat pertama kali dipertemukan sebagai dua remaja yang belum menyadari bahwa pertemuan sederhana itu akan menjadi awal dari kisah panjang yang penuh cerita.\nWaktu terus berjalan, kami tumbuh, belajar, dan melewati berbagai fase kehidupan bersama. Dari sekadar teman, menjadi tempat pulang satu sama lain, hingga akhirnya yakin bahwa cinta ini layak diperjuangkan.',
  },
  {
    date: '20 September 2025',
    title: 'Bertunangan',
    description:
      'dengan penuh rasa syukur dan kebahagiaan, kami melangkah ke tahap yang lebih serius melalui sebuah pertunangan. Momen itu menjadi simbol dari keyakinan kami untuk saling memilih, saling menjaga, dan berkomitmen dalam menata masa depan bersama. Di hadapan keluarga serta orang-orang terkasih, kami mengikat niat dan harapan, sebagai langkah awal menuju perjalanan hidup yang akan kami jalani berdua.',
  },
  {
    date: '5 Juli 2026',
    title: 'Pernikahan',
    description:
      'perjalanan yang telah kami rajut selama bertahun-tahun akan bermuara pada sebuah ikatan suci pernikahan. Hari yang kami nantikan bukan hanya menjadi perayaan cinta, tetapi juga awal dari babak kehidupan yang baru, tempat kami akan saling menggenggam dalam suka maupun duka, bertumbuh bersama, serta membangun rumah tangga yang dipenuhi cinta, ketulusan, dan keberkahan dalam setiap langkahnya.',
  },
]
</script>

<template>
  <section id="cerita" class="mt-6 relative scroll-mt-20">
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="90" />
    <FlowerDecor
      class="small bottom-right"
      position="bottom-right"
      variant="rose"
      tone="champagne"
      delay="260"
    />
    <FlowerDecor
      class="card-top-right"
      position="card-top-right"
      variant="sakura"
      size="90"
      tone="champagne"
      delay="170"
    />
    <FlowerDecor
      class="card-bottom-left"
      position="card-bottom-left"
      variant="lily"
      size="80"
      delay="330"
    />

    <div
      class="rounded-2xl border border-(--line)/60 bg-white/95 p-6 sm:p-10 shadow-[0_8px_40px_rgba(180,120,80,0.08)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/20 via-(--gold) to-(--gold)/20"
      ></div>

      <div
        class="absolute inset-0 pointer-events-none opacity-[0.03]"
        style="
          background-image:
            radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, var(--gold) 0%, transparent 50%);
        "
      ></div>

      <div class="relative">
        <p class="font-title text-base sm:text-lg text-(--gold) text-center tracking-[0.05em]">
          Love Story
        </p>
        <p class="font-title text-xs sm:text-sm text-(--gold)/70 text-center -mt-0.5">
          Icha &nbsp;&#10022;&nbsp; Didin
        </p>

        <div class="mt-5 flex items-center justify-center gap-3">
          <span
            class="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
          ></span>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="var(--gold)" opacity="0.4">
            <path d="M8 0C8 0 16 4 16 10c0 3-2 6-8 6S0 13 0 10C0 4 8 0 8 0z" />
          </svg>
          <span
            class="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
          ></span>
        </div>

        <div class="mt-6 text-center px-2">
          <p class="font-body text-sm sm:text-base text-(--ink)/80 italic leading-[1.8]">
            &ldquo;Tidak ada yang kebetulan di dunia ini. Semua sudah tertulis dengan indah
            oleh-Nya.&rdquo;
          </p>
        </div>
        <div class="flex items-center justify-center gap-2">
          <span
            class="h-px flex-1 max-w-8 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
          ></span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--gold)" opacity="0.35">
            <path
              d="M8 15s-6-4-6-9.5C2 3 3.5 1.5 5 1.5c1.5 0 3 1 3 3 0-2 1.5-3 3-3S14 3 14 5.5C14 11 8 15 8 15z"
            />
          </svg>
          <span
            class="h-px flex-1 max-w-8 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
          ></span>
        </div>

        <div class="mt-6 space-y-0">
          <div
            v-for="(item, i) in stories"
            :key="i"
            class="relative flex gap-5 sm:gap-7 pb-8 last:pb-0"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-full border-2 border-(--gold)/50 bg-(--gold)/5 flex items-center justify-center flex-shrink-0 z-10 transition hover:scale-110 hover:bg-(--gold)/15"
              >
                <svg width="8" height="8" viewBox="0 0 16 16" fill="var(--gold)" opacity="0.5">
                  <path
                    d="M8 15s-6-4-6-9.5C2 3 3.5 1.5 5 1.5c1.5 0 3 1 3 3 0-2 1.5-3 3-3S14 3 14 5.5C14 11 8 15 8 15z"
                  />
                </svg>
              </div>
              <div
                v-if="i < stories.length - 1"
                class="w-0.5 flex-1 bg-gradient-to-b from-(--gold)/30 via-(--gold)/15 to-transparent mt-1.5"
              ></div>
            </div>

            <div class="flex-1 pt-0.5 pb-2">
              <p
                class="font-body text-[11px] sm:text-xs uppercase tracking-[0.15em] text-(--gold)/60 font-medium"
              >
                {{ item.date }}
              </p>
              <p class="mt-1 font-title text-sm sm:text-base font-semibold text-(--ink)">
                {{ item.title }}
              </p>
              <p class="mt-1.5 font-body text-sm sm:text-base text-(--muted) leading-[1.8]">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-center gap-3">
          <span
            class="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
          ></span>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="var(--gold)" opacity="0.4">
            <path d="M8 0C8 0 16 4 16 10c0 3-2 6-8 6S0 13 0 10C0 4 8 0 8 0z" />
          </svg>
          <span
            class="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent via-(--gold)/30 to-transparent"
          ></span>
        </div>

        <div class="mt-6 text-center px-2">
          <p class="font-body text-sm sm:text-base italic leading-[1.8] text-(--muted)">
            &ldquo;Dari bangku SMP hingga pelaminan, semoga cinta ini selalu tumbuh dalam ridha dan
            keberkahan-Nya.&rdquo;
          </p>
          <p class="mt-4 font-title text-base sm:text-lg text-(--gold) tracking-[0.08em]">
            Icha & Didin
          </p>
          <p
            class="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-(--gold)/50 font-medium"
          >
            5 Juli 2026
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
