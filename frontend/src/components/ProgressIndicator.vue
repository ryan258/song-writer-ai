<!-- File: src/components/ProgressIndicator.vue -->
<template>
  <div class="mb-4">
    <div class="relative pt-1">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
            Generating Drafts
          </span>
        </div>
        <div class="text-right">
          <span class="text-xs font-semibold inline-block text-indigo-600">
            {{ progress }}%
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
        <div :style="{ width: `${progress}%` }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressIndicator',
  props: {
    progress: {
      type: Number,
      required: true
    }
  }
};
</script>