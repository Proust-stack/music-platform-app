import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';
interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return (
            <>
                    {
                        tracks.map(track => 
                            <TrackItem
                                key={track._id}
                                track={track}
                            />
                            )
                    }
            </>
    );
};

export default TrackList;