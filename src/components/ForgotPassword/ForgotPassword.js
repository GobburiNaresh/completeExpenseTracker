import React, { useRef } from 'react';
import Card from '../UI/Card';
import './ForgotPassword.css';
import Button from '../UI/Button';
import {useHistory } from 'react-router-dom';

const ForgotPassword = () => {
    const userEmailRef = useRef();
    const history = useHistory();

    const forgotHandler = (event) => {
        event.preventDefault();
        const userEmail = userEmailRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
            method: 'POST',
            body: JSON.stringify({
                email: userEmail,
                requestType: 'PASSWORD_RESET'
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to reset password');
            }
        })
        .then((data) => {
            if(data){
                alert('Email sent successful');
                history.replace('/login')

            }
            userEmailRef.current.value = '';

        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <Card>
            <h1>Forgot Password</h1>
            <form onSubmit={forgotHandler}>
                <label htmlFor='Email'>Email</label>
                <input type='email' ref={userEmailRef}/>
                <Button type='submit'>Send</Button>
            </form>
        </Card>
    );
};

export default ForgotPassword;
