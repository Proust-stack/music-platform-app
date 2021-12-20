import React, { useContext, useState } from 'react';
import { signUp } from '../store/action-creators/user';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useRouter } from 'next/dist/client/router';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { UserActionTypes } from '../types/user';


const SignUp = () => {
    const {user, error} = useTypedSelector(state => state.user);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogin =  (e) => {
        e.preventDefault()
        signUp(email, password)
        .then(({user}) => {
            dispatch({type: UserActionTypes.FETCH_USER, payload: {
                email: user.email,
                id: user.uid
            }})
        })
        .catch((error) => {
            dispatch({type: UserActionTypes.FETCH_USER_ERROR, payload: error})
        });
        };
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign up</h1>
                    {!user && <div>{error} try again, please</div>}
                    <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" value={password}  placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
                    <Button className="loginButton" onClick={handleLogin}>Sign up</Button>
                    <span>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default SignUp;