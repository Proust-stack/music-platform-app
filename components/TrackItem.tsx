import { Card, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import { useActions } from '../hooks/useActions';
import axios from 'axios';
import Image from 'next/image';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    
    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }
    const deleteTrack = async (e) => {
        e.stopPropagation()
        const response = await axios.delete('http://localhost:3001/tracks/' + track._id)
        router.push('/tracks')
    }
    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play} >
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>   
            <Image 
            alt="Picture of the author"
            width={70} 
            height={70} 
            src={'http://localhost:3001/' + track.picture} 
            />
            <Grid container direction="column"  style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={deleteTrack} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;

