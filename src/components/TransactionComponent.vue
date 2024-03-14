<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.amount > 0 ? 'plus' : 'minus'"
    >
      {{ transaction.text }}
      <span>{{ transaction.amount }}</span>
      <button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface ITransaction {
  id: number
  text: string
  amount: number
} 

defineProps<{
  transactions: Array<ITransaction>
}>()
</script>
