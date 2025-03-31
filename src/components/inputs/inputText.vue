<template>
  <div class="flex flex-col gap-2 py-2">
    <label class="text-gray-800 text-sm" :for="props.label">{{ props.label }}</label>
    <input
      :id="props.label"
      class="p-2 rounded-md border border-gray-300 bg-transparent hover:border-gray-500"
      :type="props.typeField"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  typeField: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: 'Campo',
  },
  modelValue: {
    type: String,
    default: '',
  },
});
</script>
