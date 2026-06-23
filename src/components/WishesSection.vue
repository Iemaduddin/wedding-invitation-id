<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import FlowerDecor from './FlowerDecor.vue'

interface Wish {
  name: string
  message: string
  time: number
}

const props = defineProps<{
  apiUrl?: string
}>()

const name = ref(getQueryName())
const message = ref('')
const messages = ref<Wish[]>([])
const loading = ref(true)
const sending = ref(false)
const error = ref('')
const editorRef = ref<HTMLDivElement>()
const tick = ref(0)
const nameError = ref(false)
const messageError = ref(false)
const toastVisible = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null
let tickTimer: ReturnType<typeof setInterval> | null = null

const pageSize = 5
const currentPage = ref(1)
const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return messages.value.slice(start, start + pageSize)
})
const totalPages = computed(() => Math.max(1, Math.ceil(messages.value.length / pageSize)))
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const range: number[] = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  for (let i = start; i <= end; i++) range.push(i)
  return range
})

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?'
}

function relativeTime(ts: number, _tick?: number): string {
  const diff = Date.now() - ts
  const seconds = Math.floor(diff / 1000)
  if (seconds < 0) return 'Baru saja'
  if (seconds < 60) return 'Baru saja'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return minutes + ' menit yang lalu'
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours + ' jam yang lalu'
  const days = Math.floor(hours / 24)
  if (days < 7) return days + ' hari yang lalu'
  return new Date(ts).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getQueryName() {
  const params = new URLSearchParams(window.location.search)
  return params.get('nama') || params.get('name') || ''
}

function execCmd(cmd: string, val?: string) {
  document.execCommand(cmd, false, val)
  editorRef.value?.focus()
}

function onEditorInput() {
  if (editorRef.value) {
    message.value = editorRef.value.innerHTML
    messageError.value = false
  }
}

function stripHtml(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || ''
}

const STORAGE_KEY = 'wishes'

function loadLocal() {
  messages.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  currentPage.value = 1
}

function saveLocal(data: Wish) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  list.unshift(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  messages.value = list
  currentPage.value = 1
}

async function fetchMessages() {
  if (!props.apiUrl) {
    loadLocal()
    loading.value = false
    return
  }

  try {
    const res = await fetch(props.apiUrl + '?t=' + Date.now())
    if (!res.ok) throw new Error('Gagal mengambil data')
    const data = await res.json()
    if (Array.isArray(data)) {
      messages.value = data
      currentPage.value = 1
    }
  } catch {
    loadLocal()
  } finally {
    loading.value = false
  }
}

async function submitForm() {
  nameError.value = !name.value.trim()
  messageError.value = !stripHtml(message.value).trim()
  if (nameError.value || messageError.value) return

  const data: Wish = {
    name: name.value.trim(),
    message: message.value.trim(),
    time: Date.now(),
  }

  if (!props.apiUrl) {
    saveLocal(data)
    name.value = ''
    message.value = ''
    if (editorRef.value) editorRef.value.innerHTML = ''
    showToast()
    return
  }

  sending.value = true
  error.value = ''

  try {
    const res = await fetch(props.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Gagal mengirim')
    await fetchMessages()
    name.value = ''
    message.value = ''
    if (editorRef.value) editorRef.value.innerHTML = ''
    showToast()
  } catch {
    saveLocal(data)
    name.value = ''
    message.value = ''
    if (editorRef.value) editorRef.value.innerHTML = ''
    showToast()
  } finally {
    sending.value = false
  }
}

function showToast() {
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 3000)
}

onMounted(() => {
  fetchMessages()
  tickTimer = setInterval(() => { tick.value++ }, 30000)
})

onUnmounted(() => {
  if (tickTimer) clearInterval(tickTimer)
})
</script>

<template>
  <section id="ucapan" class="relative scroll-mt-20">
    <div
      class="rounded-2xl border border-(--line) bg-white/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(43,108,176,0.06)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--gold)/40 via-(--gold) to-(--gold)/40"
      ></div>

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
      <FlowerDecor class="small top-left" position="top-left" variant="lotus" delay="90" />
      <FlowerDecor
        class="small bottom-right"
        position="bottom-right"
        variant="rose"
        tone="champagne"
        delay="260"
      />

      <p class="font-title text-xs uppercase tracking-[0.2em] text-(--gold) text-center mt-1">
        Ucapan & Doa
      </p>

      <form @submit.prevent="submitForm" class="mt-5 space-y-3">
        <div>
          <input
            v-model="name"
            type="text"
            placeholder="Nama Anda"
            class="w-full rounded-xl border px-4 py-2.5 font-body text-sm text-(--ink) placeholder:text-(--muted)/50 focus:outline-none focus:border-(--gold) transition bg-(--card)"
            :class="nameError ? 'border-red-400' : 'border-(--line)'"
            @input="nameError = false"
          />
          <p v-if="nameError" class="mt-1 font-body text-xs text-red-400">Nama wajib diisi</p>
        </div>
        <div>
          <div
            class="w-full rounded-xl border overflow-hidden focus-within:border-(--gold) transition bg-(--card)"
            :class="messageError ? 'border-red-400' : 'border-(--line)'"
          >
          <div class="flex flex-wrap gap-0.5 border-b border-(--line) px-2 py-1.5 bg-(--card)" @mousedown.prevent>
            <button type="button" @click="execCmd('bold')" class="w-7 h-7 flex items-center justify-center rounded text-sm font-bold text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Tebal"><strong>B</strong></button>
            <button type="button" @click="execCmd('italic')" class="w-7 h-7 flex items-center justify-center rounded text-sm italic text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Miring"><em>I</em></button>
            <button type="button" @click="execCmd('underline')" class="w-7 h-7 flex items-center justify-center rounded text-sm underline text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Garis Bawah"><u>U</u></button>
            <button type="button" @click="execCmd('strikeThrough')" class="w-7 h-7 flex items-center justify-center rounded text-sm text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Coret">S&#x0336;</button>
            <span class="w-px h-5 bg-(--line) mx-0.5 self-center"></span>
            <button type="button" @click="execCmd('justifyLeft')" class="w-7 h-7 flex items-center justify-center rounded text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Rata Kiri">
              <svg viewBox="0 0 14 14" width="14" height="14"><rect x="1" y="2" width="12" height="2" rx=".6" fill="currentColor"/><rect x="1" y="6" width="7" height="2" rx=".6" fill="currentColor"/><rect x="1" y="10" width="9.5" height="2" rx=".6" fill="currentColor"/></svg>
            </button>
            <button type="button" @click="execCmd('justifyCenter')" class="w-7 h-7 flex items-center justify-center rounded text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Rata Tengah">
              <svg viewBox="0 0 14 14" width="14" height="14"><rect x="1" y="2" width="12" height="2" rx=".6" fill="currentColor"/><rect x="3.5" y="6" width="7" height="2" rx=".6" fill="currentColor"/><rect x="2.25" y="10" width="9.5" height="2" rx=".6" fill="currentColor"/></svg>
            </button>
            <button type="button" @click="execCmd('justifyRight')" class="w-7 h-7 flex items-center justify-center rounded text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Rata Kanan">
              <svg viewBox="0 0 14 14" width="14" height="14"><rect x="1" y="2" width="12" height="2" rx=".6" fill="currentColor"/><rect x="6" y="6" width="7" height="2" rx=".6" fill="currentColor"/><rect x="3.5" y="10" width="9.5" height="2" rx=".6" fill="currentColor"/></svg>
            </button>
          </div>
          <div
            ref="editorRef"
            contenteditable
            @input="onEditorInput"
            class="min-h-[84px] w-full px-4 py-2.5 font-body text-sm text-(--ink) focus:outline-none [&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:text-(--muted)/50"
            data-placeholder="Tulis ucapan & doa untuk kedua mempelai..."
          ></div>
        </div>
        <p v-if="messageError" class="mt-1 font-body text-xs text-red-400 px-1">Ucapan wajib diisi</p>
        </div>
        <button
          type="submit"
          :disabled="sending"
          class="inline-flex items-center rounded-full bg-(--gold) px-5 py-2.5 font-title text-xs uppercase tracking-[0.15em] text-white transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ sending ? 'Mengirim...' : 'Kirim' }}
        </button>
      </form>

      <div v-if="loading" class="mt-6 text-center font-body text-sm text-(--muted)/60">
        Memuat ucapan...
      </div>
      <div v-else-if="messages.length" class="mt-6 space-y-3">
        <div
          v-for="m in paginatedMessages"
          :key="m.time"
          class="rounded-xl border border-(--line) bg-(--card)/80 p-4"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-9 h-9 rounded-full bg-(--gold)/20 flex items-center justify-center font-body text-sm font-bold text-(--gold)">
              {{ initial(m.name) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="font-body text-sm font-semibold text-(--ink) truncate">{{ m.name }}</p>
                <p class="font-body text-xs text-(--muted)/50 whitespace-nowrap">
                  {{ relativeTime(m.time, tick) }}
                </p>
              </div>
              <div class="mt-1 font-body text-sm text-(--muted) leading-relaxed message-content" v-html="m.message"></div>
            </div>
          </div>
        </div>

        <div v-if="totalPages > 1" class="flex items-center justify-center gap-1 pt-2">
          <button
            type="button"
            :disabled="currentPage <= 1"
            class="flex items-center justify-center w-8 h-8 rounded-lg border border-(--line) text-(--muted) hover:border-(--gold) hover:text-(--gold) hover:bg-(--gold)/5 disabled:opacity-30 disabled:cursor-not-allowed transition font-body text-xs"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            &laquo;
          </button>
          <button
            v-for="p in visiblePages"
            :key="p"
            type="button"
            class="flex items-center justify-center min-w-8 h-8 rounded-lg border font-body text-xs transition"
            :class="
              p === currentPage
                ? 'border-(--gold) bg-(--gold) text-white'
                : 'border-(--line) text-(--muted) hover:border-(--gold) hover:text-(--gold) hover:bg-(--gold)/5'
            "
            @click="currentPage = p"
          >
            {{ p }}
          </button>
          <button
            type="button"
            :disabled="currentPage >= totalPages"
            class="flex items-center justify-center w-8 h-8 rounded-lg border border-(--line) text-(--muted) hover:border-(--gold) hover:text-(--gold) hover:bg-(--gold)/5 disabled:opacity-30 disabled:cursor-not-allowed transition font-body text-xs"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
          >
            &raquo;
          </button>
        </div>
      </div>
      <p v-else class="mt-6 text-center font-body text-sm text-(--muted)/60">
        Belum ada ucapan. Jadilah yang pertama!
      </p>
    </div>

    <Teleport to="body">
      <div
        v-if="toastVisible"
        class="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-body text-sm text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-300"
        :class="toastVisible ? 'animate-toast-in' : 'animate-toast-out'"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Ucapan berhasil terkirim!
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.message-content strong { font-weight: 600; color: var(--ink); }
.message-content em { font-style: italic; }
.message-content u { text-decoration: underline; }
.message-content s { text-decoration: line-through; }

.animate-toast-in {
  animation: toastSlideRight 0.35s ease both;
}

.animate-toast-out {
  animation: toastSlideRightOut 0.35s ease both;
}

@keyframes toastSlideRight {
  from { opacity: 0; transform: translateX(24px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes toastSlideRightOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(24px); }
}
</style>
