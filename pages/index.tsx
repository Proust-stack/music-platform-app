
import React, { useState } from 'react';
import styles from '../styles/Index.module.scss'
import Link from 'next/link'
import { Grid } from '@material-ui/core';
import NoSsr from '@mui/material/NoSsr';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import FirebaseAuth from '../components/auth/FirebaseAuth'
import {useUser} from '../firebase/useUser'
import MenuAppBar from '../components/MenuAppbar';
import Footer from '../components/Footer';
import CustomColor from '../components/buttons/Neutral';
import { useRouter } from 'next/dist/client/router';
import {useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../store';
import { fetchTracks } from '../store/action-creators/track';

const Home = () => {
    const router = useRouter()
    const { user, logout } = useUser()
    const [isLogedIn, setIsLoggedIn] = useState(null)
    const dispatch = useDispatch() as NextThunkDispatch
    React.useEffect(() => {
        setIsLoggedIn(user)
      }, [user])

    async function fetchData() {
        await dispatch(await fetchTracks())
    }

    if (user) {
        fetchData()
    }
    
    return (
        <NoSsr>
            <Grid container className={styles.container}>
                    <MenuAppBar/>
                    <Grow in timeout={2000}>
                        <Box className={styles.center}>
                            <h3>*test version </h3>
                            {!isLogedIn && <FirebaseAuth/>}
                            {isLogedIn && <CustomColor router={router}/>}
                        </Box>
                    </Grow>
                    <Footer/>        
            </Grid>
        </NoSsr>
    );
};

export default Home;