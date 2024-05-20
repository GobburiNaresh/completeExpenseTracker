import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './auth-reducers';
import expenseReducer from './expense-reducers';
const store=configureStore({
    reducer: {login: loginReducer, expense: expenseReducer}
})

export default store;