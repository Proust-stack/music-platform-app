import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';
import styles from '../styles/TrackList.module.scss'

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return (
            <Grid container className={styles.container}>
                <Box p={2} >
                    {
                        tracks.map(track => 
                            <TrackItem
                                key={track._id}
                                track={track}
                            />
                            )
                    }
                </Box>
            </Grid>
    );
};

export default TrackList;