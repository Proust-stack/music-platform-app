import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface TrackVolumeProps {
    left: number;
    right: number;
    onChange: (e) => void;
}
const TrackVolume: React.FC<TrackVolumeProps> = ({
        left, right, onChange
}) => {
    return (
            <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            }}>
                <Slider 
                min={0}
                max={right}
                value={left}
                onChange={onChange}
                aria-label="time-indicator"
                size="small"
                />
                <Box>{left} / {right}</Box>
            </Box>
    );
};

export default TrackVolume;