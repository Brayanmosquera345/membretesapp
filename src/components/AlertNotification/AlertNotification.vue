<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" class="relative z-50" @close="close">
      <div class="fixed inset-0 flex items-center justify-center p-4 bg-black/30">
        <!-- Fondo con animación -->
        <TransitionChild
          as="template"
          enter="duration-200 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30"></div>
        </TransitionChild>

        <!-- Contenido con animación -->
        <TransitionChild
          as="template"
          enter="duration-200 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg transform transition-all">
            <div class="flex items-center justify-between">
              <DialogTitle class="text-lg font-semibold">
                {{ title }}
              </DialogTitle>
              <CloseIcon class="text-gray-600 cursor-pointer" @click="close" />
            </div>
            <DialogDescription class="mt-2 text-gray-600">
              {{ message }}
            </DialogDescription>
            <div class="mt-4 flex justify-end">
              <btnPrimary @click="close">Ok</btnPrimary>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionRoot, TransitionChild } from "@headlessui/vue";
import btnPrimary from "../buttons/btnPrimary.vue";
import CloseIcon from "../icons/CloseIcon.vue";

defineProps({
  modelValue: Boolean,
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Alerta",
  },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);
</script>
