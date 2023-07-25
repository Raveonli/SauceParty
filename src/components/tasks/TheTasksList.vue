<script setup>
import { computed, ref, watch } from "vue";
import { tasks, page } from "/src/stores/tasks.js";
import ThePossibleRecipies from "./ThePossibleRecipies.vue";

function deleteTask(task) {
  // delete the task in the tasks array
  const index = tasks.value.indexOf(task);
  tasks.value.splice(index, 1);
}

const search = ref("");

// computed for filtered tasks en utilisant search du input
const filteredTasks = computed(() => {
  return tasks.value.filter((task) => task.text.includes(search.value));
});
</script>

<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </head>
  <input
    type="text"
    v-model="search"
    placeholder="search"
    class="searchInput"
  />
  <h2>Your Ingredients</h2>
  <ul class="ingredients">
    <li v-for="task of filteredTasks" class="ingredient">
      {{ task.text }}

      <div @click="deleteTask(task)" class="item">
        <!-- Icône de poubelle -->
        <i class="fas fa-trash-alt"></i>
      </div>
    </li>
  </ul>
  <button class="add" @click="page = 'add'">Add Ingredient</button>
  <the-possible-recipies />
</template>

<style scoped>
* {
  display: block;
  padding: 1%;
}
.ingredients {
  display: flex;
  flex-wrap: wrap;
  /* border-width: 1rem;
  border-radius: 0.75rem;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
  padding: 1rem;
  margin: 1%; */
}
.ingredient {
  width: 20%; /* Les éléments occuperont 20% de la largeur du conteneur parent (5 éléments par ligne) */
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  margin: 1%;
  background-color: var(--primary-color);
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
}
.add {
  /* CENTER */
  margin-left: auto;
  margin-right: auto;
  background-color: var(--primary-color);
  border-radius: 0.75rem;
}
.ingredient button {
  margin-left: auto;
  background-color: var(--secondary-color);
  border-radius: 0.75rem;
  width: 0.75rem;
  height: 0.75rem;
  border: none;

  /* CENTER */
}

.searchInput {
  width: 20%;
  margin-bottom: 1rem;
  /* ALIGNE LEFT  */
  margin-left: auto;
  margin-top: -3.5rem;
}
</style>

<style>
:root {
  --primary-color: #86c78fab;
  --secondary-color: #cf07ed;
  --tertiary-color: #7eed07;
  --fourth-color: #8c00a1;
  --background-color: #1b1b1b;
}
body {
  font-size: 14px; /* Par défaut, taille de police de base pour le body */
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

p {
  font-size: 1rem; /* 1 rem équivaut à 16px dans cet exemple (taille de base) */
}

h1 {
  font-size: 2rem; /* 2 rem équivaut à 32px dans cet exemple (16px x 2) */
}
</style>
