import { Card, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss'
import { Pause, PlayArrow } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import { useActions } from '../hooks/useActions';
import axios from 'axios';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    
    const playerHandler = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        
    }
    const trackPageHandler = (e) => {
        e.stopPropagation()
        router.push('/tracks/' + track._id)
    }
    // const deleteTrack = async (e) => {
    //     e.stopPropagation()
    //     const response = await axios.delete('https://music-platform-nest.herokuapp.com/tracks/' + track._id)
    //     router.push('/tracks')
    // }
    return (
        <Grid item xs="auto" sx={{
            width: {
              xs: '100%', 
              sm: '70%', 
              md: '70%', 
              lg: '70%', 
              xl: '70%',
            },
            padding: 10
          }} className={styles.track} 
          onClick={trackPageHandler}
          >
            <IconButton onClick={playerHandler} style={{margin: '0 20px'}}>
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>   
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img src={track.picture} alt="Picture of the author" className={styles.image}/>
            <Grid container direction="row"  style={{width: 200, margin: '0 20px'}}>
                <Typography>{track.name} - </Typography>
                <Typography style={{color: 'gray', marginLeft: 10}}>{track.artist}</Typography>
            </Grid>
            <IconButton  style={{marginLeft: 'auto'}} >
                <MoreVertIcon/>
            </IconButton>
        </Grid>
    );
};

export default TrackItem;

