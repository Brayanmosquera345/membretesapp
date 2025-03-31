<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 rounded-md p-2 w-full  text-white transition duration-300 ease-in-out',
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
    default: "bg-gray-900",
  },
  hoverColor: {
    type: String,
    default: "hover:bg-gray-950",
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
