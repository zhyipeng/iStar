<template>
  <div style="overflow: auto">
    <v-md-preview :text="text"></v-md-preview>
  </div>
</template>

<script setup lang="ts">
import type { Repo } from '@/core/interfaces';
import axios from 'axios';
import { onUpdated, ref } from 'vue';
import { Base64 } from 'js-base64';

const props = defineProps<{
  repo: Repo | null,
}>();
const text = ref('');
const getReadme = async () => {
  if (!props.repo) {
    return;
  }
  const url = `${props.repo.url}/readme`;
  const { data } = await axios.get(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });
  text.value = Base64.decode(data.content);
};

onUpdated(getReadme);
</script>

<style scoped>

</style>
