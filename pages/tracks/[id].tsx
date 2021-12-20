import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import Image from 'next/image';
import MusicPlayerSlider from '../../components/TrackPage';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const TrackPage = ({serverTrack}) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    return <MusicPlayerSlider track={track}/>
};

export default function ToggleColorMode({serverTrack}) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <TrackPage serverTrack={serverTrack}/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    try {
        const response = await axios.get('https://music-platform-nest.herokuapp.com/tracks/' + params.id)
        // const response = await axios.get('http://localhost:3001/tracks/' + params.id)
        return {
            props: {
                serverTrack: response.data
            }
        }
    } catch (error) {
        console.log(error);
    }
    
}