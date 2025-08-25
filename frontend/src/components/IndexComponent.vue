<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getIndexPage } from '@/api/endpoints/index.js';

const state = reactive({
  user: { id: null, email: null, name: null },
  loading: true,
  error: null
});

onMounted(async () => {
  try {
    const { data } = await getIgndexPage();
    console.log(data);
    Object.assign(state.user, data);
  } catch (e) {
    state.error = e?.message || 'Ошибка при загрузке главной страницы';
  } finally {
    state.loading = false;
  }
});
</script>

<template>
  <v-container class="py-8" fluid>
    <v-card class="mx-auto pa-6" max-width="400" elevation="8" shaped>

      <template v-if="state.loading">
        <div class="d-flex justify-center my-8">
          <v-progress-circular indeterminate color="primary" size="50"/>
        </div>
      </template>

      <template v-else-if="state.error">
        <v-alert type="error" border="start" prominent>
          {{ state.error }}
        </v-alert>
      </template>

      <template v-else>
        <v-card-title class="text-h5 text-center mb-4">Здравствуйте, {{ state.user.name }}!</v-card-title>
        <v-card-text>
          <div class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-email</v-icon>
            <span>{{ state.user.email }}</span>
          </div>
        </v-card-text>
      </template>

    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
