
import React from 'react';
import Navbar from '../components/Navbar';
import MainLayout from '../layouts/MainLayout';
import styles from '../styles/Index.module.scss'
import Link from 'next/link'
import { Grid } from '@material-ui/core';

const index = () => {
    return (
        <Grid container className={styles.container}>
            <MainLayout>
                <div className={styles.center}>
                    <h1>Добро пожаловать!</h1>
                    <h3>Здесь собраны лучшие треки!</h3>
                    <h3>*тестовая версия</h3>
                </div>
            </MainLayout>
    </Grid>
    );
};

export default index;