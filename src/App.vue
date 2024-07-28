<script setup lang="ts">
import { ref } from 'vue'
import { type Income, useStatementStore, type Expense } from './stores/statement'

const statementStore = useStatementStore()

const newIncome = ref<Income>({
  description: '',
  amount: 0
})

const newExpense = ref<Expense>({
  description: '',
  amount: 0
})

const addIncome = () => {
  statementStore.addIncome(newIncome.value)
  newIncome.value = {
    description: '',
    amount: 0
  }
}

const addExpense = () => {
  statementStore.addExpense(newExpense.value)
  newExpense.value = {
    description: '',
    amount: 0
  }
}
</script>

<template>
  <div class="container max-w-4xl mx-auto my-10">
    <div class="flex">
      <h1 class="text-2xl font-bold">Eredménykimutatás</h1>
      <div class="ml-auto flex gap-4 items-center mb-4 bg-slate-100 rounded-full px-4 py-2">
        <div>Készpénzáramlás: </div>
        <div class="text-lg font-bold" :class="statementStore.cashflow < 0 ? 'text-red-500' : ''">{{ new Intl.NumberFormat('hu', { style: 'currency', currency: 'HUF', maximumSignificantDigits: 10 }).format(statementStore.cashflow) }}</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h1 class="text-xl font-medium">Bevételek</h1>
        <div class="grid grid-cols-2 gap-2 py-2">
          <input class="border border-slate-300 rounded-lg px-2 py-1" type="text" v-model="newIncome.description" placeholder="Leírás" />
          <input class="border border-slate-300 rounded-lg px-2 py-1" type="number" v-model="newIncome.amount" @keypress.enter="addIncome" placeholder="Összeg" />
        </div>
        <div class="py-2 text-sm flex justify-between">
          <div>Összes bevétel</div>
          <div class="font-bold text-emerald-700">{{ new Intl.NumberFormat('hu', { style: 'currency', currency: 'HUF', maximumSignificantDigits: 10 }).format(statementStore.totalIncome) }}</div>
        </div>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="(incomeItem, index) in statementStore.incomes" :key="index" class="odd:bg-slate-100">
              <th class="font-medium w-56 text-left px-2 py-1">{{ incomeItem.description }}</th>
              <td class="text-right px-2 py-1">{{ new Intl.NumberFormat('hu', { style: 'currency', currency: 'HUF', maximumSignificantDigits: 10 }).format(incomeItem.amount) }}</td>
              <td class="w-14 text-right p-1">
                <button class="text-red-400 flex items-center my-auto ml-auto" @click="statementStore.removeIncome(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 class="text-xl font-medium">Kiadások</h1>
        <div class="grid grid-cols-2 gap-2 py-2">
          <input class="border border-slate-300 rounded-lg px-2 py-1" type="text" v-model="newExpense.description" placeholder="Leírás" />
          <input class="border border-slate-300 rounded-lg px-2 py-1" type="number" v-model="newExpense.amount" @keypress.enter="addExpense" placeholder="Összeg" />
        </div>
        <div class="py-2 text-sm flex justify-between">
          <div>Összes kiadás</div>
          <div class="font-bold text-red-700">- {{ new Intl.NumberFormat('hu', { style: 'currency', currency: 'HUF', maximumSignificantDigits: 10 }).format(statementStore.totalExpense) }}</div>
        </div>
        <table class="w-full text-xs">
          <tbody>
            <tr v-for="(expenseItem, index) in statementStore.expenses" :key="index" class="odd:bg-slate-100">
              <th class="font-medium w-56 text-left px-2 py-1">{{ expenseItem.description }}</th>
              <td class="text-right px-2 py-1">- {{ new Intl.NumberFormat('hu', { style: 'currency', currency: 'HUF', maximumSignificantDigits: 10 }).format(expenseItem.amount) }}</td>
              <td class="w-14 text-right p-1">
                <button class="text-red-400 flex items-center my-auto ml-auto" @click="statementStore.removeExpense(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
