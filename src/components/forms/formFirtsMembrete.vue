<template>
  <section class="flex flex-col h-full py-2">
    <div class="py-2 ">
      <h2 class="text-xl font-medium text-gray-900">Membrete uno</h2>
    </div>
    <div class="flex-grow overflow-auto">
      <inputText v-model="store.infoDocument.eslogan" label="Eslogan" />
      <inputText v-model="store.infoDocument.mail" label="Correo electrónico" typeField="mail" />
      <inputText v-model="store.infoDocument.phone" label="Teléfono" type-field="phone" />
      <inputText v-model="store.infoDocument.web" label="Página web" />
      <inputFile v-model="store.infoDocument.logo" label="Logo" />
    </div>
    <div class="flex flex-col gap-1 bg-transparent">
      <btnPrimary @click="generatePdf">
        <template #icon-left>
          <SaveIcon />
        </template>
        aplicar cambios
      </btnPrimary>
      <div class="flex gap-1">
        <btnSecondary @click="store.resetDocument">
          <template #icon-left>
            <ResetIcon />
          </template>
          Restablcer
        </btnSecondary>
        <btnSecondary @click="store.descargarPdf">
          <template #icon-left>
            <DownloadIcon />
          </template>
          Descargar
        </btnSecondary>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useDocument } from '@/store/useDocument';
//iconos
import SaveIcon from '../icons/SaveIcon.vue';
import ResetIcon from '../icons/ResetIcon.vue';
import DownloadIcon from '../icons/DownloadIcon.vue';
//componentes
import inputText from '../inputs/inputText.vue';
import inputFile from '../inputs/inputFile.vue';
import btnPrimary from '../buttons/btnPrimary.vue';
import btnSecondary from '../buttons/btnSecondary.vue';

const store = useDocument();

const emits = defineEmits(['close'])

const generatePdf =()=>{
  store.aplicarMembrete();
  emits('close')
}

</script>
