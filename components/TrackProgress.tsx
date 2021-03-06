import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
}
const TrackProgress: React.FC<TrackProgressProps> = ({
        left, right, onChange
}) => {
   
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
      }
    return (
            <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline'
            }}>
                <Slider 
                min={0}
                max={right}
                value={left}
                onChange={onChange}
                aria-label="time-indicator"
                size="small"
                />
                <Box sx={{fontSize: '12px'}}>{formatDuration(left)} / {formatDuration(right)}</Box>
            </Box>
    );
};

export default TrackProgress;