import React, {FC, useEffect} from 'react';
import {AppProps} from 'next/app';
import { wrapper } from '../store';
import '../styles/globals.css'
import '../styles/login.scss'
import '../styles/signUp.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    return <Component {...pageProps} />
}
    
export default wrapper.withRedux(WrappedApp);
