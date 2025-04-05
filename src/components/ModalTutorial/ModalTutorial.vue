<template>
  <TransitionRoot as="template" :show="store.tutorial" appear>
    <Dialog as="div" class="relative z-50" @close="close">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" />

      <!-- Modal content -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <!-- Header -->
            <div class="flex justify-between items-start">
              <div>
                <DialogTitle class="text-xl font-bold text-gray-800">🚀 Guía rápida para crear tu membrete</DialogTitle>
                <p class="mt-1 text-sm text-gray-500"> Sigue estos simples pasos para personalizar y aplicar tu membrete en segundos.</p>
              </div>
              <button @click="close" class="text-gray-400 hover:text-gray-600">
                <CloseIcon :size="24"/>
              </button>
            </div>

            <!-- Steps -->
            <div class="mt-6 space-y-4">
              <div v-for="(step, index) in steps" :key="index" class="p-4 rounded-lg border border-gray-200 bg-gray-50">
                <h3 class="text-base font-semibold text-gray-950">{{ step.title }}</h3>
                <p class="text-sm text-gray-700 mt-1">{{ step.description }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-6 text-right">
              <button
                class="px-4 py-2 bg-gray-900 hover:bg-gray-950 text-white text-sm rounded-md"
                @click="close"
              >
                ¡Entendido!
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useDocument } from '@/store/useDocument'

const store = useDocument()


function close() {
  store.tutorial = false;
}

// Pasos del tutorial
const steps = [
  {
    title: '1. Selecciona tu PDF',
    description: 'Sube el archivo PDF al que deseas agregar el membrete personalizado.',
  },
  {
    title: '2. Personaliza tu membrete',
    description: 'Agrega tu logotipo, eslogan, correo electrónico, sitio web y número de teléfono.',
  },
  {
    title: '3. Guarda y previzualiza',
    description: 'Visualiza cómo se verá el membrete en tu documento.',
  },
  {
    title: '4. Descarga tu documento',
    description: 'Obtén tu PDF final con el membrete aplicado, listo para usar.',
  },
]

onMounted(()=>{
  const showTutorial = localStorage.getItem('tutorial');
  if(showTutorial === 'true'){
    store.tutorial = false;
  }else{
    localStorage.setItem('tutorial', 'true');
    store.tutorial = true;
  }
})

</script>
