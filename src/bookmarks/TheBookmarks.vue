<script setup>
import { ref, computed } from "vue";
import { bookmarks } from "../stores/bookmarks.js";
import BookmarkEntry from "./BookmarkEntry.vue";
import BookmarkForm from "./BookmarkForm.vue";
import TheFooter from "./TheFooter.vue";
import { favoriteBookmark } from "../stores/bookmarks.js";
import ThePopup from "./ThePopup.vue";

// Put this in a unit test file
// console.log(bookmarks.value);
// const b1 = { label: 'Vue 3', url: 'https://v3.vuejs.org/' };
// add(b1);
// add({ label: 'Vue 3 ex', url: 'https://v3.vuejs.org/', tags: 'vue javascript'});
// console.log(bookmarks.value);
// remove(b1);
// console.log(bookmarks.value);

const showForm = ref(false);
const showPopup = ref(false);

const filterBy = ref("");

const bookmarksFiltered = computed(() => {
  return bookmarks.value.filter((bookmark) => {
    return bookmark.tags.toLowerCase().includes(filterBy.value.toLowerCase());
  });
});

const bookmarksSorted = computed(() => {
  return bookmarksFiltered.value.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });
});
</script>

<template>
  <div>
    <input
      type="text"
      v-model="filterBy"
      autofocus
      placeholder="Barre de recherche"
    />
  </div>
  <button @click="showForm = true">Add</button>
  <button @click="showPopup = true">show le popup mec</button>

  <bookmark-form v-if="showForm" @close="showForm = false" />
  <the-popup v-if="showPopup" @close="showPopup = false" />
  <bookmark-entry
    v-for="(bookmark, index) of bookmarksSorted"
    :key="index"
    :bookmark="bookmark"
    :favorite="false"
  />
  <div>
    <h1>Favories</h1>
    <li v-for="item in favoriteBookmark" :key="item.label">
      {{ item.label }}
    </li>
  </div>
  <the-footer v-if="!showForm" />
</template>

<style scoped></style>
