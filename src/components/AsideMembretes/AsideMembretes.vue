<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-50" @close="closeAside">
      <div class="fixed inset-0 bg-black bg-opacity-30" @click="closeAside" />

      <div class="fixed inset-0 flex">
        <TransitionChild as="template" enter="transform transition ease-in-out duration-300"
          enter-from="-translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300"
          leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel
            class="w-80 bg-gray-50 bg-opacity-20 backdrop-blur-sm rounded-lg border border-white shadow-lg h-full p-4 overflow-y-auto space-y-4">
            <header class="space-y-2">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-medium text-gray-900">Membretes</h2>
                <button @click="closeAside" class="text-gray-500 hover:text-gray-700">
                  <CloseIcon />
                </button>
              </div>
              <p class="text-sm text-gray-700">Selecciona el membrete que quieres aplicar sobre tu PDF</p>
            </header>
            <main class="space-y-2">
              <cardMembrete :selected="store.selected === 'membrete1'" @click="selectedMembrete('membrete1')"
                image="/membrete1.webp" />

              <cardMembrete :selected="store.selected === 'membrete2'" @click="selectedMembrete('membrete2')"
                image="/membrete2.webp" />

              <cardMembrete :selected="store.selected === 'membrete3'" @click="selectedMembrete('membrete3')"
                image="/membrete3.webp" />
            </main>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
// import CardMembrete from '../cards/cardMembrete.vue'
import { useDocument } from '@/store/useDocument'
import cardMembrete from '../cards/cardMembrete.vue'
import CloseIcon from '../icons/CloseIcon.vue'

const store = useDocument()

defineProps({ modelValue: Boolean }) // Recibe el estado del modal
const emit = defineEmits(['update:modelValue'])

const closeAside = () => emit('update:modelValue', false) // Cierra el aside

const selectedMembrete = (membrete) => {
  store.selectedMembrete(membrete);
  closeAside()
}
</script>
