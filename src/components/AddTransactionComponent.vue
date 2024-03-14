<template>
  <h3>Add new transaction</h3>
  <form @submit.prevent="handleSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input v-model="text" type="text" id="text" placeholder="Enter text..." />
    </div>
    <div class="form-control">
      <label for="amount"
        >Amount <br />
        (negative - expense, positive - income)</label
      >
      <input v-model="amount" type="number" id="amount" placeholder="Enter amount..." />
    </div>
    <button :disabled="posting" class="btn">Add transaction</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const amount = ref('')

const emit = defineEmits(['addTransaction'])
const props = defineProps(['toast', 'posting'])

function handleSubmit() {
  if (!text.value || !amount.value) {
    props.toast.error('Both field must be filled 🚨')
    return
  }

  const transactionData = {
    text: text.value,
    amount: parseInt(amount.value)
  }

  emit('addTransaction', transactionData)

  text.value = ''
  amount.value = ''
}
</script>
