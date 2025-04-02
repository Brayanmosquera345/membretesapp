<template>
  <div class="flex flex-col gap-2 py-2">
    <label class="text-gray-800 text-sm" :for="label">{{ label }}</label>
    <div
      class="flex flex-col items-center justify-center w-full max-w-md p-4 border-2 border-dashed rounded-lg transition duration-300 ease-in-out group"
      :class="{ 'border-gray-300 hover:border-gray-700': !errorMessage, 'border-red-500': errorMessage }"
      @click="triggerFileInput"
    >
      <div v-if="modelValue || errorMessage" class="mt-4 p-2 rounded-md text-sm text-center">
        <p class="font-medium" :class="{ 'text-gray-700': !errorMessage, 'text-red-500': errorMessage }">
          {{ errorMessage ? errorMessage : 'Documento seleccionado:' }}
        </p>
        <p v-if="!errorMessage">{{ store.nameLogo }}</p>
      </div>
      <div v-else class="flex flex-col items-center justify-center text-center cursor-pointer p-4 rounded-md">
        <p class="mt-2 text-gray-400 group-hover:text-gray-700">Selecciona tu logo</p>
      </div>
      <input
        type="file"
        class="hidden"
        ref="fileInput"
        accept="image/jpeg"
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
const errorMessage = ref("");

const props = defineProps({
  label: String,
  modelValue: String // URL generada
});

const emit = defineEmits(["update:modelValue"]);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type === "image/jpeg") {
      errorMessage.value = "";
      store.nameLogo = file.name;
      const url = URL.createObjectURL(file);
      emit("update:modelValue", url);
    } else {
      errorMessage.value = "Por favor, selecciona una imagen en formato JPG.";
      event.target.value = ""; // Limpia el input
    }
  }
};
</script>
