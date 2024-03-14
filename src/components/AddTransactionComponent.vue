<template>
  <h3>Add new transaction</h3>
  <form @submit.prevent="handleSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input v-model="formData.text" type="text" id="text" placeholder="Enter text..." />
    </div>
    <div class="form-control">
      <label for="amount"
        >Amount <br />
        (negative - expense, positive - income)</label
      >
      <input v-model="formData.amount" type="number" id="amount" placeholder="Enter amount..." />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  text: '',
  amount: null
})
function handleSubmit() {
  console.log(formData.value.text)
}
</script>
