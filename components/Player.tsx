import { Grid, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';
import Box, { BoxProps } from '@mui/material/Box';
import TrackVolume from './TrackVolume';

let audio;
const drawerWidth = 240;
const Player = () => {

    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);
    const { setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()
    const {tracks} = useTypedSelector(state => state.track);
    const [trackIndex, setTrackIndex] = React.useState(0)
    const [currentTrack, setCurrentTrack] = React.useState(null)
    const [paused, setPaused] = React.useState(true);
    const lastIndex = tracks.length -1;
    
    useEffect(() => {
        if (!active) return audio = null
        if (!audio) {
            audio = new Audio()
            setPaused(true)
            setAudio(active)
            playTrack()
        } else {
            setPaused(true)
            setAudio(active)
            playTrack()
        }
        return () => pauseTrack()
    }, [active])

    useEffect(() => {
        setCurrentTrack(tracks[0])
    }, [])

    const setAudio = (track) => {
        if (active) {
            audio.src = track.audio
            audio.volume = volume / 100 
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const playTrack = () => {
            setPaused(false)
            audio.play()
    }
    const pauseTrack = () => {
            setPaused(true)
            audio.pause()
    }



const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
}

const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
}


if (!active) {
    return null
}

    return (
        <Box sx={{
            width: { xs: `100%`, md: `calc(100% - ${drawerWidth}px)` },
            display: 'flex',
            height: '70px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            alignItems: 'center',
            padding: '0 10px',
            backgroundColor: 'darkgrey', 
            justifyContent: 'space-around'
          }}
          >
            <IconButton onClick={paused ? playTrack : pauseTrack} style={{marginLeft: '10px'}}>
                {paused
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>  
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: '10px'}}/>
            <TrackVolume left={volume} right={100} onChange={changeVolume}/>
        </Box>
    );
};

export default Player;