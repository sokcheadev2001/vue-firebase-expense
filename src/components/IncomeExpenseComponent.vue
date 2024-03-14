<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+${{ income }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">-${{ Math.abs(expense) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  income: number
  expense: number
}>()
</script>
