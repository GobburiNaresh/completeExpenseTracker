import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Signup.module.css';
import backgroundImage from '../Images/Mainpage.jpg';

const Signup = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const [passwordMessage, setPasswordMessage] = useState(null);
    const history = useHistory();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            setPasswordMessage('Password not Match!');
            return;
        } else {
            setPasswordMessage(null);
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                throw new Error('Signup failed');
            }
            await response.json();
            history.replace('/login');
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            confirmPasswordRef.current.value = '';
            
        } catch (error) {
            console.error(error);
        }
    };

    const backgroundStyle = {
        width: '100%',
        height: '90vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div style={backgroundStyle}>
        <Card>
            <h1 className={classes.signupTitle}>Signup</h1>
            {passwordMessage && <h5 className={classes.passwordMessage}>{passwordMessage}</h5>}
            <form className={classes.signupForm} onSubmit={onSubmitHandler}>
                <label htmlFor='email' className={classes.signupLabel}>Email</label>
                <input type='email' id='email' ref={emailInputRef} required className={classes.signupInput} />
                <label htmlFor='password' className={classes.signupLabel}>Password</label>
                <input type='password' id='password' ref={passwordInputRef} required className={classes.signupInput} />
                <label htmlFor='confirmPassword' className={classes.signupLabel}>Confirm Password</label>
                <input type='password' id='confirmPassword' ref={confirmPasswordRef} required className={classes.signupInput} />
                <Button type="submit">Signup</Button>
                <Link to='/login'><h5 className={classes.signupLink}>Have an account? Login</h5></Link>
            </form>
        </Card>
        </div>
    );
}

export default Signup;
