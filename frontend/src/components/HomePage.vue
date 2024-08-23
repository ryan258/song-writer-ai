<!-- File: src/components/HomePage.vue -->
<template>
  <div class="home-page">
    <h1 class="text-4xl font-bold text-center mb-8">Welcome to Song Writer AI</h1>
    <p class="text-center mb-8">Generate amazing song drafts with the power of AI!</p>
    <SongIdeaForm @generate-drafts="generateDrafts" />
    <ProgressIndicator v-if="isGenerating" :progress="progress" />
    <ErrorMessage v-if="error" :message="error" />
    <DraftDisplay v-if="songDrafts.length" :drafts="songDrafts" />
  </div>
</template>

<script>
import { ref } from 'vue';
import SongIdeaForm from './SongIdeaForm.vue';
import ProgressIndicator from './ProgressIndicator.vue';
import ErrorMessage from './ErrorMessage.vue';
import DraftDisplay from './DraftDisplay.vue';
import api from '../api';

export default {
  name: 'HomePage',
  components: {
    SongIdeaForm,
    ProgressIndicator,
    ErrorMessage,
    DraftDisplay
  },
  setup() {
    const songDrafts = ref([]);
    const isGenerating = ref(false);
    const progress = ref(0);
    const error = ref(null);

    const generateDrafts = async (songIdea, numberOfDrafts) => {
      isGenerating.value = true;
      error.value = null;
      songDrafts.value = [];
      progress.value = 0;

      try {
        const drafts = await api.generateSongDrafts(songIdea, numberOfDrafts);
        songDrafts.value = drafts;
      } catch (err) {
        error.value = "An error occurred while generating song drafts. Please try again.";
      } finally {
        isGenerating.value = false;
      }
    };

    return {
      songDrafts,
      isGenerating,
      progress,
      error,
      generateDrafts
    };
  }
};
</script>