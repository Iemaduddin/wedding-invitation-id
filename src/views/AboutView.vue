<template>
  <main class="mx-auto max-w-4xl px-6 py-12">
    <section class="rounded-2xl border border-[var(--line)] bg-[var(--card)]/90 p-8 shadow-md">
      <h2 class="font-[var(--font-script)] text-4xl text-[var(--ink)]">Our Story</h2>
      <p class="mt-4 text-[var(--muted)]">
        Pertemuan sederhana yang membawa kami pada perjalanan panjang penuh tawa, dukungan, dan
        cinta. Kami menantikan hari dimana keluarga dan sahabat akan berkumpul untuk merayakan
        kebahagiaan ini bersama.
      </p>
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h3
            class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]"
          >
            Icha
          </h3>
          <p class="mt-2 text-[var(--muted)]">Pecinta seni dan bunga, selalu membawa keceriaan.</p>
        </div>
        <div>
          <h3
            class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]"
          >
            Didin
          </h3>
          <p class="mt-2 text-[var(--muted)]">
            Penggemar musik dan kopi, yang membuat hari-hari lebih ringan.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
