import React, { useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import './ContactProfile.css';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';

const ContactProfile = () => {
    const [closed, setClosed] = useState(false);
    const history = useHistory();
    const nameInputRef = useRef();
    const urlInputRef = useRef();
    const loginState=useSelector((state)=> state.login)


    const closeHandler = () => {
        setClosed(true);
        history.replace('/expense');
    }

    if (closed) {
        return null;
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const url = urlInputRef.current.value;

       
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U',
            {
            method: 'POST',
            body: JSON.stringify(
                {   
                    idToken: loginState.token,
                    displayName: name,
                    photoUrl: url,
                    returnSecureToken: true
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error!!');
            }
            return res.json();
        })
        .then(data => {
            setClosed(true);
            history.replace('/expense');
            nameInputRef.current.value = '';
            urlInputRef.current.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
    }
    

    return (
        <form className="contact" onSubmit={onSubmitHandler}>
            <div className="close-btn" onClick={closeHandler}>x</div>
            <h1>Contact Details</h1>
            <div>
                <label htmlFor='fullName'>Full Name</label>
                <input type="text" ref={nameInputRef} required />
                <label htmlFor='photo'>Profile Photo URL</label>
                <input type="text" ref={urlInputRef} required />
            </div>
            <div className='btn'>
                <Button type="submit">Update</Button>
            </div>
        </form>
    )
}

export default ContactProfile;
