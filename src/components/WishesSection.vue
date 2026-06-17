<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
}

function saveLocal(data: Wish) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  list.unshift(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  messages.value = list
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
    }
  } catch {
    loadLocal()
  } finally {
    loading.value = false
  }
}

async function submitForm() {
  if (!name.value.trim() || !stripHtml(message.value).trim()) return

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
  } catch {
    saveLocal(data)
    name.value = ''
    message.value = ''
    if (editorRef.value) editorRef.value.innerHTML = ''
  } finally {
    sending.value = false
  }
}

onMounted(fetchMessages)
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
        <input
          v-model="name"
          type="text"
          placeholder="Nama Anda"
          class="w-full rounded-xl border border-(--line) bg-(--card) px-4 py-2.5 font-body text-sm text-(--ink) placeholder:text-(--muted)/50 focus:outline-none focus:border-(--gold) transition"
        />
        <div class="w-full rounded-xl border border-(--line) bg-(--card) overflow-hidden focus-within:border-(--gold) transition">
          <div class="flex flex-wrap gap-0.5 border-b border-(--line) px-2 py-1.5 bg-(--card)" @mousedown.prevent>
            <button type="button" @click="execCmd('bold')" class="w-7 h-7 flex items-center justify-center rounded text-sm font-bold text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Tebal"><strong>B</strong></button>
            <button type="button" @click="execCmd('italic')" class="w-7 h-7 flex items-center justify-center rounded text-sm italic text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Miring"><em>I</em></button>
            <button type="button" @click="execCmd('underline')" class="w-7 h-7 flex items-center justify-center rounded text-sm underline text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Garis Bawah"><u>U</u></button>
            <button type="button" @click="execCmd('strikeThrough')" class="w-7 h-7 flex items-center justify-center rounded text-sm text-(--muted) hover:text-(--ink) hover:bg-(--line)/30 transition" title="Coret">S̶</button>
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
          v-for="m in messages"
          :key="m.time"
          class="rounded-xl border border-(--line) bg-(--card)/80 p-4"
        >
          <div class="flex items-center justify-between gap-2">
            <p class="font-body text-sm font-semibold text-(--ink)">{{ m.name }}</p>
            <p class="mt-1.5 font-body text-xs text-(--muted)/50 text-end">
              {{
                new Date(m.time).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            </p>
          </div>
          <div class="mt-1 font-body text-sm text-(--muted) leading-relaxed message-content" v-html="m.message"></div>
        </div>
      </div>
      <p v-else class="mt-6 text-center font-body text-sm text-(--muted)/60">
        Belum ada ucapan. Jadilah yang pertama!
      </p>
    </div>
  </section>
</template>

<style scoped>
.message-content strong { font-weight: 600; color: var(--ink); }
.message-content em { font-style: italic; }
.message-content u { text-decoration: underline; }
.message-content s { text-decoration: line-through; }
</style>
