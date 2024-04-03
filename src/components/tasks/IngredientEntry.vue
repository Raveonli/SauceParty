<script setup>
import { defineProps, ref, computed } from "vue";

const props = defineProps(["ingredient"]);
</script>

<template>
  <div>
    <p>{{ ingredient }}</p>
  </div>
</template>
