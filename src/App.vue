<template>
  <div>
      <router-view/>
      <alert-notification v-model:model-value="store.error" title="Error" :message="store.messageError" />
  </div>
</template>
<script setup>
import AlertNotification from './components/AlertNotification/AlertNotification.vue';
import { useDocument } from './store/useDocument';

const store= useDocument()

</script>
