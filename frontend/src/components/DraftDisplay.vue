<!-- File: src/components/DraftDisplay.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Generated Song Drafts</h2>
    <div v-for="(draft, index) in drafts" :key="index" class="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-2">{{ draft.title }}</h3>
      <p class="text-gray-600 mb-4">Style: {{ draft.style }}</p>
      <pre class="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded">{{ draft.lyrics }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DraftDisplay',
  props: {
    drafts: {
      type: Array,
      required: true
    }
  }
};
</script>