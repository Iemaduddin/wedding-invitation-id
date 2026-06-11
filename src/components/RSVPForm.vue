<script setup lang="ts">
import { ref } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

const name = ref('')
const phone = ref('')
const status = ref('Hadir')
const count = ref(1)
const note = ref('')
const success = ref(false)

function submitForm() {
  if (!name.value || !phone.value) {
    alert('Mohon isi nama dan nomor WA')
    return
  }

  const data = {
    name: name.value,
    phone: phone.value,
    status: status.value,
    count: count.value,
    note: note.value,
    time: Date.now(),
  }
  const list = JSON.parse(localStorage.getItem('rsvps') || '[]')
  list.unshift(data)
  localStorage.setItem('rsvps', JSON.stringify(list))
  success.value = true
  name.value = ''
  phone.value = ''
  count.value = 1
  note.value = ''
}
</script>

<template>
  <section
    class="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)]/95 p-4 relative anim-fade-in"
  >
    <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="120" />
    <FlowerDecor class="small bottom-right" position="bottom-right" variant="sakura" tone="champagne" delay="260" />
    <FlowerDecor class="card-top-right" position="card-top-right" variant="lily" size="80" delay="200" />
    <h3 class="font-[var(--font-title)] text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
      RSVP
    </h3>
    <form @submit.prevent="submitForm" class="mt-3 space-y-3">
      <input
        v-model="name"
        class="w-full rounded-md border border-[var(--line)] px-3 py-2"
        placeholder="Nama"
      />
      <input
        v-model="phone"
        class="w-full rounded-md border border-[var(--line)] px-3 py-2"
        placeholder="No. WhatsApp"
      />
      <div class="flex gap-2">
        <select v-model="status" class="rounded-md border border-[var(--line)] px-3 py-2">
          <option>Hadir</option>
          <option>Berhalangan</option>
        </select>
        <input
          v-model.number="count"
          type="number"
          min="1"
          class="w-24 rounded-md border border-[var(--line)] px-3 py-2"
        />
      </div>
      <textarea
        v-model="note"
        rows="3"
        class="w-full rounded-md border border-[var(--line)] px-3 py-2"
        placeholder="Ucapan / Doa (opsional)"
      ></textarea>
      <div class="flex items-center gap-2">
        <button
          type="submit"
          class="inline-flex items-center rounded-full bg-[var(--gold)] px-4 py-2 text-white"
        >
          Kirim
        </button>
        <p v-if="success" class="text-sm text-green-600">
          Terima kasih! Konfirmasi telah disimpan.
        </p>
      </div>
    </form>
  </section>
</template>
