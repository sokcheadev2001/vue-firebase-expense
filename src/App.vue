<template>
  <HeaderComponent />
  <div class="container">
    <BalanceComponent :balance="total" />
    <IncomeExpenseComponent :income="income" :expense="expense" />
    <TransactionComponent
      :transactions="transactions"
      @removeTransaction="handleDeleteTransaction"
    />
    <AddTransactionComponent
      @addTransaction="handleAddTransaction"
      :toast="toast"
      :posting="posting"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { ITransaction } from './domain/transaction/interface'
import {
  createTransaction,
  deleteTransaction,
  getTransactions
} from './services/transaction.service'

import HeaderComponent from './components/HeaderComponent.vue'
import BalanceComponent from './components/BalanceComponent.vue'
import IncomeExpenseComponent from './components/IncomeExpenseComponent.vue'
import TransactionComponent from './components/TransactionComponent.vue'
import AddTransactionComponent from './components/AddTransactionComponent.vue'

const toast = useToast()
const transactions = ref<ITransaction[]>([])
const posting = ref(false)

onMounted(async () => {
  const transactionsData = await getTransactions()

  if (transactionsData) {
    transactionsData.forEach((item) => {
      transactions.value.push({ ...(item.data() as ITransaction), id: item.id })
    })
  }
})

// Get Total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

// Get Income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
})

// Get Expense
const expense = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
})

async function handleAddTransaction(transaction: ITransaction) {
  try {
    posting.value = true

    const { id } = await createTransaction({
      text: transaction.text,
      amount: transaction.amount
    })

    if (id) {
      posting.value = false
      transactions.value.push({
        id: id,
        text: transaction.text,
        amount: transaction.amount
      })

      toast.success('Successfully added ✅')
    }
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong 💥')
  } finally {
    posting.value = false
  }
}

async function handleDeleteTransaction(id: string) {
  try {
    await deleteTransaction(id)
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id)

    toast.success('Transaction deleted 🔥')
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong 💥')
  }
}
</script>
