<template>
  <HeaderComponent />
  <div class="container">
    <BalanceComponent :balance="total" />
    <IncomeExpenseComponent :income="income" :expense="expense" />
    <TransactionComponent :transactions="transactions" />
    <AddTransactionComponent />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import HeaderComponent from './components/HeaderComponent.vue'
import BalanceComponent from './components/BalanceComponent.vue'
import IncomeExpenseComponent from './components/IncomeExpenseComponent.vue'
import TransactionComponent from './components/TransactionComponent.vue'
import AddTransactionComponent from './components/AddTransactionComponent.vue'

const transactions = ref([
  { id: 1, text: 'Purse', amount: 9999 },
  { id: 2, text: 'Drink', amount: -23 },
  { id: 2, text: 'Course', amount: 600 }
])

// Get Total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

// Get Income
const income = computed(() => {
  return parseInt(
    transactions.value
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount
      }, 0)
      .toFixed(2)
  )
})

// Get Expense
const expense = computed(() => {
  return parseInt(
    transactions.value
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount
      }, 0)
      .toFixed(2)
  )
})
</script>
