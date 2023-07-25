<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { tasks, page } from "../../stores/tasks.js";

const name = ref("");
const showDropdown = ref(false);
const array = ref([]);
onMounted(async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const data = await response.json();

    data.meals.forEach((item) => {
      array.value.push({ id: item.idIngredient, name: item.strIngredient });
    });
  } catch (error) {
    console.error(error);
  }
});
const elLabel = ref(null);
onMounted(() => {
  elLabel.value.focus();
});
watch(name, () => {
  if (name.value !== "") {
    showDropdown.value = true;
  } else {
    showDropdown.value = false;
  }
});
function addTask() {
  console.log("addTask", name.value);
  tasks.value.push({ text: name.value, done: false });
  page.value = "home";
}

const filteredArray = computed(() => {
  return array.value.filter((item) => {
    // Effectue une recherche insensible à la casse basée sur le nom de l'élément
    return item.name.toLowerCase().includes(name.value.toLowerCase());
  });
});
</script>

<template>
  <div>
    <label>Ingredient</label>
    <input type="text" v-model="name" ref="elLabel" />
    <ul v-if="showDropdown">
      <li
        @click="
          name = item.name;
          addTask();
        "
        v-for="item in filteredArray"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
    <button @click="page = 'home'">Cancel</button>
  </div>
</template>

<style scoped>
div {
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f1f1f1;
  padding: 20px;
}
div > * {
  display: block;
  margin: 0.5rem;
}
ul {
  border: 1px solid #ccc;
  padding: 5px;
  max-height: 200px;
  overflow-y: auto;
}
li {
  cursor: pointer;
}
</style>
