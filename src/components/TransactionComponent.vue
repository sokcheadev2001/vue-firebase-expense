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
      <button @click.prevent="handleRemoveTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ITransaction } from '@/domain/transaction/interface'

defineProps<{
  transactions: Array<ITransaction>
}>()

const emit = defineEmits(['removeTransaction'])
function handleRemoveTransaction(id: string) {
  emit('removeTransaction', id)
}
</script>
