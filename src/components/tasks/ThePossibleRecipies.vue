<script setup>
import { ref, onMounted, watch } from "vue";
import recipesData from "/src/assets/recipes.json";
import { tasks, page } from "/src/stores/tasks.js";
import IngredientEntry from "./IngredientEntry.vue";


const selectedPercentage =ref(70);
const possibleRecipes = ref([]);

console.log(recipesData);
// add an id to each recipe according to its index in the array
recipesData.forEach((recipe, index) => {
  recipe.id = index;
});
// console.log(recipesData[0].Ingredients);
// console.log(tasks.value);
// console.log(tasks.value[0].text);
const showDropdownMap = ref({});

function toggleDropdown(recipeId) {
  showDropdownMap.value[recipeId] = !showDropdownMap.value[recipeId];
}

function isDropdownShown(recipeId) {
  return showDropdownMap.value[recipeId] || false;
}
function filterRecipesByIngredients(recipes) {
  return recipes.filter((recipe) => {
    const recipeIngredients = recipe.Ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );
    // console.log(recipeIngredients);
    const totalIngredients = recipeIngredients.length;
    let matchingIngredients = 0;

    recipeIngredients.forEach((ingredient) => {
      tasks.value.forEach((task) => {
        if (ingredient.includes(task.text.toLowerCase())) {
          matchingIngredients++;
          // console.log(ingredient);
        }
      });
    });

    const percentageMatch = (matchingIngredients / totalIngredients) * 100;
    // console.log(percentageMatch);
    // console.log(selectedPercentage)
    return percentageMatch >= selectedPercentage.value;
  });
}
function redirect(url) {
  window.open(url, "_blank");
}
onMounted(() => {
  possibleRecipes.value = filterRecipesByIngredients(recipesData);
});
/////**************************************** */

// percentage ingredients input user
//**************************************** *

let percentages = [];
        // Générer les pourcentages de 10 en 10 jusqu'à 100
for (let i = 0; i <= 100; i += 10) {
            percentages.push(i);
        }
watch(selectedPercentage => {

            possibleRecipes.value = filterRecipesByIngredients(recipesData);
        
        });
</script>

<template>

  <div>
    <h2>Possible Recipes</h2>
        <label for="pourcentage">Select percentage of matching ingredients </label>
        <select v-model="selectedPercentage" id="pourcentage">
            <option v-for="percentage in percentages" :value="percentage" :key="percentage">{{ percentage }}%</option>
        </select>
    <div class="cardgroup">

    <p v-for="recipe in possibleRecipes" :key="recipe.id" class="card">
      
      <h3 @click="redirect(recipe.url)">{{ recipe.Name }}</h3>
      <p>{{ recipe.Description }} </p>
      <span @click="toggleDropdown(recipe.id)">
        {{ isDropdownShown(recipe.id) ? '▲' : '▼' }}
      </span>
      <ul class="recipe-list" v-if="isDropdownShown(recipe.id)"> 
        <ingredient-entry v-for="ingredient in recipe.Ingredients" :key="recipe.id" :ingredient="ingredient" />
      </ul>
    </p>
  </div>
  </div>
</template>

<style scoped>
.card {
  background-color:var(--primary-color
  );
  border-radius: 0.75rem;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
  margin: 0 auto;
  width: 300px;
  height: 200px;
  padding: 1rem;
margin: 1%;
}

.recipe-list {
  list-style-type: none;

  background-color:var(--primary-color
  );
  border-radius: 0.75rem;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
  margin: 0 auto;
  width: 300px;
  height: 200px;
  padding: 1rem;
margin: 1%;
}
.cardgroup{
  display: flex;
  flex-wrap: wrap;
}
</style>
```
