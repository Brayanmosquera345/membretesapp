<template>
  <div class="grid grid-cols-12 w-full h-screen  gap-4 p-2">
    <aside class="col-span-3 hidden lg:block h-full bg-gray-50 bg-opacity-20 backdrop-blur-sm rounded-lg border border-white px-5 py-4 overflow-y-auto space-y-4">
      <div class="py-2 space-y-2">
        <h2 class="text-xl font-medium text-gray-900">Membretes</h2>
        <p class="text-sm text-gray-700">Selecciona el membrete que quieres aplicar sobre tu PDF</p>
      </div>
      <main class="space-y-2">
        <img  alt="">
        <cardMembrete :selected="store.selected === 'membrete1'" @click="store.selectedMembrete('membrete1')"
          image="/membrete1.webp" />
        <cardMembrete :selected="store.selected === 'membrete2'" @click="store.selectedMembrete('membrete2')"
          image="/membrete2.webp" />
        <cardMembrete :selected="store.selected === 'membrete3'" @click="store.selectedMembrete('membrete3')"
          image="/membrete3.webp" />
      </main>
    </aside>
    <main class="col-span-12 lg:col-span-6 flex justify-center h-full bg-gray-50 bg-opacity-20 backdrop-blur-sm rounded-lg border border-white w-full">
      <div v-if="pdf" class="w-full h-screen overflow-y-auto overflow-x-hidden">
        <VuePDF :pdf="pdf" fit-parent>
          <loadingDocument />
        </VuePDF>
      </div>
      <div v-else class="w-full h-full flex items-center justify-center p-5">
        <label
          class="p-4 rounded-md border-2 border-gray-400 w-full border-dashed hover:border-gray-700 flex flex-col items-center justify-center h-full group cursor-pointer"
          for="pdf">
          <UploadIcon class="fill-gray-500 group-hover:fill-gray-900" :size="64" />
          <p class="text-xl font-medium text-gray-500 group-hover:text-gray-900">Selecciona tu PDF</p>
          <p class="text-sm text-gray-500 group-hover:text-gray-700 ">Da un clic aca y selecciona tu PDF</p>
        </label>
        <input class="hidden" id="pdf" accept=".pdf" @change="loadPdf" type="file">
      </div>
    </main>
    <aside class="col-span-3 hidden lg:block h-full bg-gray-50 bg-opacity-20 backdrop-blur-sm rounded-lg border border-white px-5 py-1 ">
      <formFirtsMembrete v-show="store.selected === 'membrete1'" />
      <formSecondMembrete v-show="store.selected === 'membrete2'" />
      <formThreeMembrete v-show="store.selected === 'membrete3'" />
    </aside>
  </div>
</template>

<script setup>
import cardMembrete from '@/components/cards/cardMembrete.vue';
import { storeToRefs } from 'pinia';
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import loadingDocument from '@/components/loaders/loadingDocument.vue';
import formFirtsMembrete from '@/components/forms/formFirtsMembrete.vue';
import formSecondMembrete from '@/components/forms/formSecondMembrete.vue';
import formThreeMembrete from '@/components/forms/formThreeMembrete.vue';
import UploadIcon from '@/components/icons/UploadIcon.vue';
import { useDocument } from '@/store/useDocument';

const store = useDocument();

const { urlDocumentEdit } = storeToRefs(store); // Hace urlDocument reactivo
const { pdf } = usePDF(urlDocumentEdit);

const loadPdf = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file); // Crear una URL temporal para el archivo PDF
    store.urlDocument = fileURL;
    store.urlDocumentEdit = fileURL;
    store.nameDocument = file.name;
  }
};


</script>
