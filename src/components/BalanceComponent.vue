<template>
  <h4>Your Balance</h4>
  <h1 id="balance">${{ balance }}</h1>
</template>

<script setup lang="ts">
defineProps<{
  balance: number
}>()
</script>
