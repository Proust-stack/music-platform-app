import axios from 'axios';
import { Button, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useInput } from '../hooks/useInput';
import MainLayout from '../layouts/MainLayout';
import firebase from '../firebase/firebase';
import FileUpload from './FileUpload';
import Snack from './Snack';
import StepWrapper from './StepWrapper';
import "firebase/storage"

const FirebaseStorage = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const [track, setTrack] = useState(null)
    const [isSnackOpen, setIsSnackOpen] = useState(false)
    const [message, setMessage] = useState('')
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const storage = firebase.storage();
    let ref;

    const fieldsOfTrack = [
        {file: picture, label: "picture"},
        {file: audio, label: "audio"},
      ]

    const downloadTrack =  () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('text', text.value)
        formData.append('artist', artist.value)
        formData.append('picture', picture)
        formData.append('audio', audio)
        formData.append('audio', track.audio)
        formData.append('picture', track.picture)
        axios.post('http://localhost:3001/tracks', formData)
        .catch(e => console.log(e.message))
        setMessage('saved to database')
        setIsSnackOpen(true)
        setActiveStep(0)
    }  

    const uploadtoFirebase = (items) => {
        items.forEach(item => {
        const fileName = new Date().getTime() + item.label + item.file.name;
        ref = storage.ref(`/items/${fileName}`)
        const uploadTask = ref.put(item.file) 
        
          uploadTask.on(
            "state_changed", 
            (snapshot) => {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '% done';
                console.log(progress)
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(url => {
                        setTrack((prev) => {
                            return {...prev, [item.label]: url}
                            })
                        })
                }
          )
        })
      }

    const next = () => {
        setActiveStep(prev => prev + 1)
        if (activeStep === 2) {
            uploadtoFirebase(fieldsOfTrack)
            setMessage('uploaded to firebase')
            setIsSnackOpen(true) 
        }                   
    }
    const back = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {
                    activeStep === 0 && 
                
                <Grid container direction={"column"} style={{padding: 20}}>
                    <TextField 
                    {...name}
                    label={"track name"} 
                    style={{marginTop: 10}}/>
                    <TextField 
                    {...artist}
                    label={"artist name"} 
                    style={{marginTop: 10}}/>
                    <TextField 
                    {...text}
                    label={"track's text"} 
                    multiline rows={3}  
                    style={{marginTop: 10}}/>
                </Grid>
                }
                {
                    activeStep === 1 && 
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>load cover</Button>
                    </FileUpload>
                }
                {
                    activeStep === 2 && 
                    <FileUpload setFile={setAudio} accept="audio/*">
                        <Button>load track</Button>
                    </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='center'>
                <Button disabled={activeStep === 0} onClick={back}>back</Button>
                <Button onClick={next} disabled={activeStep === 3}>{activeStep === 2 ? 'upload to firebase' : 'next'}</Button>
                <Button disabled={activeStep < 3} onClick={downloadTrack}>download to database</Button>
                <Button  onClick={() => router.push('/tracks')}>go to tracks</Button>
            </Grid>
            <Snack isOpen={isSnackOpen} handleClose={() => setIsSnackOpen(false)} message={message}/>
        </MainLayout>
    );
};

export default FirebaseStorage;