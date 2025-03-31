<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <div class="fixed inset-0 bg-black bg-opacity-30" @click="closeModal" />

      <div class="fixed inset-0 flex items-end justify-center">
        <TransitionChild
          as="template"
          enter="transform transition ease-in-out duration-300"
          enter-from="translate-y-full"
          enter-to="translate-y-0"
          leave="transform transition ease-in-out duration-300"
          leave-from="translate-y-0"
          leave-to="translate-y-full"
        >
          <DialogPanel class="w-full max-w-lg bg-gray-50 bg-opacity-20 backdrop-blur-sm rounded-lg border border-white shadow-lg rounded-t-lg px-4">
            <div class="flex justify-end items-end ">
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700 mt-2">
                <CloseIcon />
              </button>
            </div>

            <component :is="activeForm" v-if="activeForm" @close="closeModal" />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import formFirtsMembrete from '../forms/formFirtsMembrete.vue'
import formSecondMembrete from '../forms/formSecondMembrete.vue'
import formThreeMembrete from '../forms/formThreeMembrete.vue'
import CloseIcon from '../icons/CloseIcon.vue'

const props = defineProps({
  modelValue: Boolean,
  selectedMembrete: String // Recibe el membrete seleccionado
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => emit('update:modelValue', false)

// Componente dinámico basado en el membrete seleccionado
const activeForm = computed(() => {
  switch (props.selectedMembrete) {
    case 'membrete1': return formFirtsMembrete
    case 'membrete2': return formSecondMembrete
    case 'membrete3': return formThreeMembrete
    default: return null
  }
})
</script>
