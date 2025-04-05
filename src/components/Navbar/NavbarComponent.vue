<template>
  <nav class="p-2 flex lg:hidden bg-gray-50 bg-opacity-20 backdrop-blur-sm rounded-lg border border-white mx-2 mt-1">
    <div class="flex w-full gap-2 items-center justify-between">
      <div class="flex items-center gap-2">
        <button @click="showAside = !showAside">
          <MenuIcon :size="32" />
        </button>
        <p>{{ membreteSelected(store.selected) }}</p>
      </div>
      <div class="flex gap-2 items-center relative">

        <button @click="store.descargarPdf"
          class="flex items-center gap-2 p-2 rounded-md bg-gray-900 text-white border border-transparent hover:border-gray-300">
          <DownloadIcon />
          Descargar
        </button>
        <button @click="showForms = !showForms"
          class="p-2 rounded-md bg-white text-gray-900 border border-transparent hover:border-gray-300">
          <PencilIcon />
        </button>
        <button @click="store.tutorial = true"
        class="p-2 rounded-full text-gray-700 border border-gray-50 hover:border-gray-300">
        <QuestionIcon size="20" />
      </button>
      </div>
      <TooltipTutorial />
    </div>
  </nav>
  <AsideMembretes v-model="showAside" />
  <FormsModal v-model="showForms" :selected-membrete="store.selected" />
</template>
<script setup>
import { ref } from 'vue';
import MenuIcon from '../icons/MenuIcon.vue';
import AsideMembretes from '../AsideMembretes/AsideMembretes.vue';
import FormsModal from '../FormsModal/FormsModal.vue';
import PencilIcon from '../icons/PencilIcon.vue';
import QuestionIcon from '../icons/QuestionIcon.vue';
import DownloadIcon from '../icons/DownloadIcon.vue';
import { useDocument } from '@/store/useDocument';
import TooltipTutorial from '../TooltipTutorial/TooltipTutorial.vue';

const store = useDocument();

const showAside = ref(false);
const showForms = ref(false)

const membreteSelected = (menbrete) => {
  switch (menbrete) {
    case 'membrete1':
      return 'Membrete uno'
    case 'membrete2':
      return 'Membrete dos'
    case 'membrete3':
      return 'Membrete tres'
    default:
      break;
  }
}

</script>
