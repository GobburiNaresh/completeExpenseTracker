import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Expense.module.css';
import { CgProfile } from "react-icons/cg";
import { FaToggleOn,FaToggleOff } from "react-icons/fa";
import AddExpense from '../ExpenseDetails/AddExpense/AddExpense';
import { loginAction } from '../store/auth-reducers';
import { useSelector, useDispatch } from 'react-redux';
import { expenseAction } from '../store/expense-reducers';
import DownloadExpense from '../ExpenseDetails/downloadExpense/downloadExpenses';

const Expense = () => {
    const history = useHistory();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [userName, setUserName] = useState('');
    const [premiumButton, setPremiumButton] = useState(false);
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login);
    const totalAmount = useSelector((state) => state.expense.totalAmount);
    const darkTheme = useSelector((state) => state.expense.darkTheme);

    const contactHandler = () => {
        history.push('/contact');
    };

    const toggleDropdown = () => {
        setDropdownVisible(prevState => !prevState);
    };

    const logoutHandler = () => {
        dispatch(loginAction.logout());
        history.push('/login');
    };

    const confirmEmail = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
            method: 'POST',
            body: JSON.stringify({
                idToken: loginState.token,
                emailVerified: true
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.emailVerified) {
                setVerifyEmail(true);
            } else {
                fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: loginState.token,
                        requestType: 'VERIFY_EMAIL'
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.email) {
                        confirmEmail();
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: loginState.token,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Error fetching user details');
                }
                const data = await response.json();
                if (data.users[0].displayName) {
                    setUserName(data.users[0].displayName);
                }
                if (data.users[0].emailVerified) {
                    setVerifyEmail(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDetails();
    }, [loginState.token]);
    const ActivatePremium = () => {
        setPremiumButton(true);
    }
    const toggleThemeHandler = () => {
        dispatch(expenseAction.toggleTheme());
    };

    return (
        <div className={darkTheme && `${classes.darkTheme}`}>
            <div className={classes.header}>
                <h3>Welcome to Expense Tracker</h3>
                {totalAmount >= 10000 && (
                    <div className={classes.premium}>
                        <button className={classes.premiumButton} onClick={ActivatePremium}>Activate Premium</button>
                    </div>
                )}
                {premiumButton && <div onClick={toggleThemeHandler} className={classes.dark}>
                    {darkTheme && <FaToggleOn />}
                    {!darkTheme && <FaToggleOff />}
                </div>
                }
                {premiumButton && <DownloadExpense/>}
                {userName && (
                    <div className={classes.profile}>
                        <p>{userName}</p>
                        <div className={classes.profileIcon} onClick={toggleDropdown}>
                            <CgProfile />
                            {dropdownVisible && (
                                <div className={classes.dropdownMenu}>
                                    <button onClick={logoutHandler}>Logout</button>
                                    <button onClick={confirmEmail}>
                                        {verifyEmail ? "Email Verified" : "Verify Email"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {!userName && (
                    <div className={classes.profile}>
                        <p>
                            Your profile is 64% completed. A complete profile has
                            <br />
                            higher chances of landing a job <button onClick={contactHandler}>Complete now</button>
                        </p>
                    </div>
                )}
            </div>
            {userName && <AddExpense />}
        </div>
    );
};

export default Expense;
