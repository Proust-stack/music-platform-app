import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('http://localhost:3001/tracks', formData)
            .then(res => router.push('/tracks'))
            .catch(e => console.log(e))
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
                <Button onClick={next}>next</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;