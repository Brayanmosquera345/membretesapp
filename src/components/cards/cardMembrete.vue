<template>
  <div :class="props.selected?' border-2 border-gray-600 ':''" class="bg-white shadow-sm rounded-md p-4 cursor-pointer my-1 hover:shadow-lg relative">
    <img class=" object-cover " :src="props.image" alt="membrete">
    <svg v-show="props.selected" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="size-10 bg-white rounded-full fill-gray-900 absolute -top-2 -right-4">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  image: {
    type: String,
    Required: true,
    default: 'https://i.pinimg.com/736x/9f/b2/f1/9fb2f1f46f6452732a91ebd0fc69ffab.jpg'
  },
  selected:{
    type:Boolean,
    default: false
  }
})
</script>
