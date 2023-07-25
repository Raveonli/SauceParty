<script setup>
import { defineProps, ref } from "vue";
import { remove } from "../stores/bookmarks.js";
import { addTofav } from "../stores/bookmarks.js";
import BookmarkForm from "./BookmarkForm.vue";
import { favoriteBookmark } from "../stores/bookmarks.js";

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});

const showForm = ref(false);
</script>

<template>
  <div>
    <a :href="bookmark.url" target="_blank">
      {{ bookmark.label }}
    </a>
    ( {{ bookmark.tags }} )
    <button @click="remove(bookmark)">X</button>
    <button @click="showForm = true">M</button>
    <button @click="addTofav(bookmark)">Favorite</button>
    <bookmark-form
      v-if="showForm"
      @close="showForm = false"
      mode="modify"
      :bookmark="bookmark"
    />
  </div>
</template>

<style scoped></style>
