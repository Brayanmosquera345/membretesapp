<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 rounded-md p-2 w-full text-gray-900 transition duration-300 ease-in-out border border-transparent hover:border-gray-300',
      props.bgColor,
      props.hoverColor,
      props.padding,
    ]"
    @click="handleClick"
  >
    <!-- Icono opcional antes del texto -->
    <slot name="icon-left" />

    <!-- Texto principal del botón -->
    <span>
      <slot />
    </span>

    <!-- Icono opcional después del texto -->
    <slot name="icon-right" />
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Props para personalizar el botón
const props = defineProps({
  bgColor: {
    type: String,
    default: "bg-white",
  },
  hoverColor: {
    type: String,
    default: "hover:bg-transparent",
  },
  padding: {
    type: String,
    default: "py-4", // Tamaño de padding por defecto
  },
});

// Emitir eventos
const emit = defineEmits(["click"]);

// Manejar clics
const handleClick = (event) => {
  emit("click", event);
};
</script>
