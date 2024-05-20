import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses: [],
    totalAmount: 0,
    editedExpense: false,
    darkTheme: false,
    loading: false,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    reducers: {
        setExpense(state, action) {
            state.expenses = action.payload;
            state.totalAmount = action.payload.reduce((total, expense) => total + parseFloat(expense.money), 0);
            state.loading = false;
        },
        addExpense(state, action) {
            state.expenses.push(action.payload);
            state.totalAmount += parseFloat(action.payload.money);
        },
        deleteExpense(state, action) {
            const id = action.payload.id;
            const index = state.expenses.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.totalAmount -= parseFloat(state.expenses[index].money);
                state.expenses.splice(index, 1);
            }
        },
        editExpense(state, action) {
            state.editedExpense = action.payload;
        },
        updateExpense(state, action) {
            state.expenses = action.payload;
            state.totalAmount = action.payload.reduce((total, expense) => total + parseFloat(expense.money), 0);
            state.editedExpense = null;
        },
        toggleTheme(state) {
            state.darkTheme = !state.darkTheme;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
