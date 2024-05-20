import React, { useState, useRef } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import './AddExpense.css';
import GetExpenses from '../getExpenses/getExpense';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../../store/expense-reducers';

const AddExpense = () => {
    const moneySpendRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const [expenses, setExpenses] = useState([]);
    const [editingExpenseId, setEditingExpenseId] = useState(null);

    const loginState = useSelector((state) => state.login);
    const darkTheme = useSelector((state) => state.expense.darkTheme);

    const dispatch = useDispatch();

    const addOrUpdateExpenseHandler = async (event) => {
        event.preventDefault();

        const moneySpend = moneySpendRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;

        const expenseDetails = {
            money: moneySpend,
            description: description,
            category: category
        };

        const email = loginState.email.replace('@', '-').replace('.', '-');
        try {
            if (editingExpenseId !== null) {
                await fetch(`https://expensetracker-172ee-default-rtdb.firebaseio.com/expenses/${email}/${editingExpenseId}.json`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(expenseDetails)
                });

                const updatedExpenses = expenses.map(expense => {
                    if (expense.id === editingExpenseId) {
                        return {
                            id: expense.id,
                            ...expenseDetails
                        };
                    }
                    return expense;
                });

                setExpenses(updatedExpenses);
                setEditingExpenseId(null);
            } else {
                const response = await fetch(`https://expensetracker-172ee-default-rtdb.firebaseio.com/expenses/${email}.json`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(expenseDetails)
                });

                const data = await response.json();
                const newExpenseId = data.name;

                const updatedExpenses = [...expenses, { id: newExpenseId, ...expenseDetails }];
                dispatch(expenseAction.addExpense(updatedExpenses))
                setExpenses(updatedExpenses);
            }

            moneySpendRef.current.value = '';
            descriptionRef.current.value = '';
            categoryRef.current.value = '';
        } catch (error) {
            console.error('Error adding or updating expense:', error);
        }
    };

    const editExpenseHandler = (id) => {
        const expenseToEdit = expenses.find(expense => expense.id === id);
        moneySpendRef.current.value = expenseToEdit.money;
        descriptionRef.current.value = expenseToEdit.description;
        categoryRef.current.value = expenseToEdit.category;
        setEditingExpenseId(id);
    };

    return (
        <div className={darkTheme && 'darkTheme'}>
            <Card className={darkTheme && 'darkTheme'}>
                <form onSubmit={addOrUpdateExpenseHandler}>
                    <label htmlFor="moneySpend">Money Spend</label>
                    <input type="number" min="1" step="0" ref={moneySpendRef} />
                    <label htmlFor="description">Description</label>
                    <input type="text" ref={descriptionRef} />
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryRef}>
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                    <Button type="submit">{editingExpenseId ? 'Update' : 'Submit'}</Button>
                </form>
            </Card>
            <GetExpenses expenses={expenses} setExpenses={setExpenses} onEdit={editExpenseHandler} />
        </div>
    );
}

export default AddExpense;
