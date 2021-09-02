import { Card, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';

let audio;

const TrackItemMock: React.FC = () => {
    const [isPlay, setplay] = useState(false)
    const [isPause, setpause] = useState(true)
    
    const startTrack = (e) => {
        e.stopPropagation()
        if (isPause) {
            setplay(prev => !prev)
            setpause(prev => !prev)
            audio.play()
        } else {
            setplay(prev => !prev)
            setpause(prev => !prev)
            audio.pause()
        }
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            audio.src = 'sample.mp3'
            audio.volume = 0.5
        } 
    }, [])


    return (
        <Card className={styles.track} >
            <IconButton onClick={startTrack} >
                {!isPlay
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>   
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img src={'concert.jpg'} alt="Picture of the author" className={styles.image}/>
            <Grid container direction="column"  style={{width: 200, margin: '0 20px'}}>
                <div>this track</div>
                <div style={{fontSize: 12, color: 'gray'}}>someone</div>
            </Grid>
            <IconButton  style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItemMock;

