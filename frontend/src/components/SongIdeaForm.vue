<!-- src/components/SongIdeaForm.vue -->
<template>
  <form @submit.prevent="submitForm" class="mb-8">
    <div class="mb-4">
      <label for="songIdea" class="block text-sm font-medium text-gray-700"
        >Song Idea</label
      >
      <textarea
        id="songIdea"
        v-model="songIdea"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        rows="3"
        placeholder="Enter your song idea here..."
      ></textarea>
    </div>
    <div class="mb-4">
      <label
        for="numberOfDrafts"
        class="block text-sm font-medium text-gray-700"
        >Number of Drafts</label
      >
      <select
        id="numberOfDrafts"
        v-model="numberOfDrafts"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option v-for="n in 9" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="useOpenAI"
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700"
          >Use OpenAI (GPT) instead of Ollama</span
        >
      </label>
    </div>
    <button
      type="submit"
      class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Generate Song Drafts
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SongIdeaForm',
  emits: ['generate-drafts'],
  setup(props, { emit }) {
    const songIdea = ref('')
    const numberOfDrafts = ref(3)
    const useOpenAI = ref(false)

    const submitForm = () => {
      emit(
        'generate-drafts',
        songIdea.value,
        numberOfDrafts.value,
        useOpenAI.value
      )
    }

    return {
      songIdea,
      numberOfDrafts,
      useOpenAI,
      submitForm,
    }
  },
}
</script>
