<script setup>
import { defineProps, ref } from "vue";
import { add } from "../stores/bookmarks";
const props = defineProps({
  article: {
    type: Object,
    required: false,
    default: () => ({
      name: "poissons",
      price: "22",
      quantity: "45",
    }),
  },
});
const emits = defineEmits(["close"]);
function cancel() {
  emits("close");
}

const name = ref(props.article.name);
const price = ref(props.article.price);
const quantity = ref(props.article.quantity);
function manageSubmit() {
  const newArticle = {
    label: name.value.trim(),
    url: price.value,
    tags: quantity.value,
  };
  add(newArticle);
}
</script>
<template>
  <div class="black">
    <h1>Je suis ton popup hallo??</h1>
    <p>name {{ name }}</p>
    <button @click="cancel()">Fermer</button>

    <h2>Form</h2>
    <form @submit.prevent="manageSubmit()">
      <input type="text" name="name" required v-model="name" />
    </form>
  </div>
</template>

<style scoped>
.black {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff;
  color: #333;
  padding: 1rem;
  width: 100%;
  height: 100%;
}
</style>
