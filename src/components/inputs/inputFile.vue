<template>
  <div class="flex flex-col gap-2 py-2">
    <label class="text-gray-800 text-sm" :for="label">{{ label }}</label>
    <div
      class="flex flex-col items-center justify-center w-full max-w-md p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-700 transition duration-300 ease-in-out group"
      @click="triggerFileInput"
    >
      <div v-if="modelValue" class="mt-4 p-2 rounded-md text-sm text-center">
        <p class="font-medium text-gray-700">Documento seleccionado:</p>
        <p>{{ store.nameLogo }}</p>
      </div>
      <div v-else class="flex flex-col items-center justify-center text-center cursor-pointer p-4 rounded-md">
        <p class="mt-2 text-gray-400 group-hover:text-gray-700">Selecciona tu {{ props.label }}</p>
      </div>
      <input
        type="file"
        class="hidden"
        ref="fileInput"
        accept=" image/jpeg"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useDocument } from "@/store/useDocument";

const store = useDocument();

const fileInput = ref(null);

const props = defineProps({
  label: String,
  modelValue: String // URL generada
});

const emit = defineEmits(["update:modelValue"]);

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value.click();
};

// Handle file selection
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    store.nameLogo = file.name;
    // Verifica que sea una imagen válida
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const url = URL.createObjectURL(file);
      emit("update:modelValue", url); // Emite la URL generada
    } else {
      alert("Por favor, selecciona una imagen PNG o JPG.");
    }
  }
};
</script>

