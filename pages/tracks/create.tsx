import React from 'react';
import FirebaseStorage from '../../components/FirebaseStorage';
import  { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';


const Create = () => {
    // return <FirebaseStorage/>
    const router = useRouter()
    useEffect(() => {
        const id = setTimeout(() => {
            router.push('/tracks')
        }, 3000);
        return () => {
            clearTimeout(id)
        }
    }, [])
    return <h3>not allowed for now. You are to be routed to tracks in 3 sec...</h3>
};

export default Create;