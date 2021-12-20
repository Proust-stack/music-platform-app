import { Container } from '@material-ui/core';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import Head from "next/head";
import DrawerMini from '../components/DrawerMini';

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    title,
    description,
    keywords
    }) => {
    return (
        <>  
             <Head>
                <title>{title || 'Music platform'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <DrawerMini/>
                    {children}
            
        </>
    );
};

export default MainLayout;