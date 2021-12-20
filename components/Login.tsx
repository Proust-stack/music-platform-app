import React, { useContext, useState } from 'react';
import { login } from '../store/action-creators/user';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useRouter } from 'next/dist/client/router';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { UserActionTypes } from '../types/user';

const Login = () => {
    const {user, error} = useTypedSelector(state => state.user);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogin =  (e) => {
        e.preventDefault()
        login(email, password)
        .then(({user}) => {
            console.log(user)
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
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    {!user && <div>{error} try again, please</div>}
                    <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" value={password}  placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
                    <Button  onClick={handleLogin}>Sign In</Button>
                    <span>or
                        <Button onClick={() => router.push('/register')}> sign up</Button>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;