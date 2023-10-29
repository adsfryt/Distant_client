import  '../styles/Global.css';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import React, {useState} from 'react';
import auth from "../components/auth";
import {observer} from "mobx-react-lite";

function MyApp({ Component, pageProps }) {

    const router = useRouter();
    const [loading, setLoading] =  React.useState(false);
    React.useEffect(() => {
        const handleRouteChange = (url) => {
            setLoading(true);
        };

        const handleRouteChangeComplete = () => {
            setLoading(false);
        };
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
    });

    React.useEffect(() => {
        if(localStorage.getItem('token')){
            auth.setTrue()
        }
    },[]);

    return <>{loading ? <Loader /> :<Component {...pageProps} />}</>
}
export default  observer(MyApp);