import React, { useEffect } from 'react';
import classes from './getExpense.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../../store/expense-reducers';

const GetExpenses = ({ expenses, setExpenses, onEdit }) => {
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login);
    const darkTheme = useSelector((state) => state.expense.darkTheme);

    const email = loginState.email.replace('@', '-').replace('.', '-');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://expensetracker-172ee-default-rtdb.firebaseio.com/expenses/${email}.json`);
                const data = await response.json();
                const loadedExpenses = [];
                let total = 0;

                for (const key in data) {
                    const expense = {
                        id: key,
                        money: parseFloat(data[key].money),
                        description: data[key].description,
                        category: data[key].category
                    };
                    loadedExpenses.push(expense);
                    total += expense.money;
                }
                
                dispatch(expenseAction.setExpense(loadedExpenses,total));
                setExpenses(loadedExpenses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [email, dispatch, setExpenses]);

    const deleteHandler = async (id) => {
        try {
            await fetch(`https://expensetracker-172ee-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`, {
                method: "DELETE"
            });
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            setExpenses(updatedExpenses);
            dispatch(expenseAction.deleteExpense({ id, amount: expenses.find(exp => exp.id === id).money }));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
    return (
        <div className={darkTheme ? classes.darkTheme : classes.layout}>
            <h2>Expense Details</h2>
            <table className={classes.expenseTable}>
                <thead>
                    <tr>
                        <th>Money</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} className={classes.expenseItem}>
                            <td>{expense.money}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td className={classes.editDelete}>
                                <button className={classes.delete} onClick={() => deleteHandler(expense.id)}>Delete</button>
                                <button className={classes.edit} onClick={() => onEdit(expense.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetExpenses;
