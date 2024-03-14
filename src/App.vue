<template>
  <HeaderComponent />
  <div class="container">
    <BalanceComponent :balance="total" />
    <IncomeExpenseComponent :income="income" :expense="expense" />
    <TransactionComponent
      :transactions="transactions"
      @removeTransaction="handleDeleteTransaction"
    />
    <AddTransactionComponent @addTransaction="handleAddTransaction" :toast="toast" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { AUTO_INCREMENT, INITIAL_ID } from './utils/constant'

import HeaderComponent from './components/HeaderComponent.vue'
import BalanceComponent from './components/BalanceComponent.vue'
import IncomeExpenseComponent from './components/IncomeExpenseComponent.vue'
import TransactionComponent from './components/TransactionComponent.vue'
import AddTransactionComponent from './components/AddTransactionComponent.vue'

interface ITransaction {
  id: number
  text: string
  amount: number
}

const toast = useToast()
const transactions = ref<ITransaction[]>([])

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

function handleAddTransaction(transaction: ITransaction) {
  transactions.value.push({
    id: generateUniqueId(),
    text: transaction.text,
    amount: transaction.amount
  })

  toast.success('Successfully added ✅')
}

function handleDeleteTransaction(id: number) {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  toast.success('Transaction deleted 🔥')
}

function generateUniqueId() {
  const lastId = transactions.value[transactions.value.length - 1]?.id
  if (lastId) {
    return lastId + AUTO_INCREMENT
  }

  return INITIAL_ID
}
</script>
