import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

export type Income = {
  amount: number
  description: string
}

export type Expense = {
  amount: number
  description: string
}

export const useStatementStore = defineStore('statement', () => {
  const incomes = ref<Income[]>(localStorage.getItem('incomes') ? JSON.parse(localStorage.getItem('incomes')!) : [])
  const expenses = ref<Expense[]>(localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')!) : [])

  const totalIncome = computed(() => {
    return incomes.value.reduce((acc, income) => acc + income.amount, 0)
  })

  const totalExpense = computed(() => {
    return expenses.value.reduce((acc, expense) => acc + expense.amount, 0)
  })

  const cashflow = computed(() => {
    return totalIncome.value - totalExpense.value
  })

  const addIncome = (income: Income) => {
    incomes.value.push(income)
  }

  const addExpense = (expense: Expense) => {
    expenses.value.push(expense)
  }

  const removeIncome = (index: number) => {
    incomes.value.splice(index, 1)
  }

  const removeExpense = (index: number) => {
    expenses.value.splice(index, 1)
  }

  const storeInLocalStorage = () => {
    localStorage.setItem('incomes', JSON.stringify(incomes.value))
    localStorage.setItem('expenses', JSON.stringify(expenses.value))
  }

  watch([incomes, expenses], storeInLocalStorage, { deep: true })

  return {
    incomes,
    expenses,
    totalIncome,
    totalExpense,
    cashflow,
    addIncome,
    addExpense,
    removeExpense,
    removeIncome,
  }
})
