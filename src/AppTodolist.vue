<script setup>
import TheHeader from "./bookmarks/TheHeader.vue";
import TheTasksList from "./components/tasks/TheTasksList.vue";
import TheTasksFormAdd from "./components/tasks/TheTasksFormAdd.vue";
import { page } from "./stores/tasks.js";
</script>

<template>
  <the-header />
  <the-tasks-form-add v-if="page === 'add'" />
  <the-tasks-list v-if="page === 'home'" />
</template>

<style scoped></style>
