<!-- File: src/components/ErrorMessage.vue -->
<template>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
    <strong class="font-bold">Error:</strong>
    <span class="block sm:inline">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>