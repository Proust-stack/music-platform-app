import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

const Albums = () => {
    const router = useRouter()
    useEffect(() => {
        const id = setTimeout(() => {
            router.push('/tracks')
        }, 3000);
        return () => {
            clearTimeout(id)
        }
    }, [])
    return (
        <div>
            <h3>section is under development...</h3>
            <h3>you are to be routed to tracks in 3 sec...</h3>
        </div>
    );
};

export default Albums;