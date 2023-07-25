<script setup>
import { onMounted, ref } from "vue";
import { add, update } from "../stores/bookmarks.js";

const props = defineProps({
  bookmark: {
    type: Object,
    required: false,
    default: () => ({
      label: "",
      url: "",
      tags: "",
    }),
  },
  mode: {
    type: String,
    required: false,
    default: "add",
    // Utilise une fonction de validation pour vérifier si la valeur fournie pour la propriété "mode" est soit "add" (ajouter) ou "modify" (modifier). Si la valeur fournie n'est pas l'une de ces deux options, la validation échoue et une erreur peut être renvoyée.
    validator: (value) => {
      return ["add", "modify"].includes(value);
    },
  },
});

const label = ref(props.bookmark.label);
const url = ref(props.bookmark.url);
const tags = ref(props.bookmark.tags);
// emits
const emits = defineEmits(["close"]);

function manageSubmit() {
  const newBookmark = {
    label: label.value.trim(),
    url: url.value,
    tags: tags.value,
  };
  if (props.mode == "modify") {
    update(props.bookmark, newBookmark);
  } else {
    add(newBookmark);
  }
  emits("close");
}

function cancel() {
  emits("close");
}

const elLabel = ref(null);
//
//ce code assure que lorsque le composant est monté, l'élément spécifié par elLabel.value reçoit le focus, ce qui permet à l'utilisateur de commencer à interagir avec cet élément immédiatement
onMounted(() => {
  elLabel.value.focus();
});
</script>

<template>
  <form @submit.prevent="manageSubmit()">
    <label for="label">Label</label>
    <input type="text" name="label" required v-model="label" ref="elLabel" />
    <label for="url">URL</label>
    <input type="url" name="url" required v-model="url" ref="elUrl" />
    <label for="tags">Tags</label>
    <input type="text" name="tags" required v-model="tags" />
    <button>{{ mode == "add" ? "Add" : "Save" }}</button>
    <button @click.prevent="cancel()">Cancel</button>
  </form>
</template>

<style scoped>
form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
