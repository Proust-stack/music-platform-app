import { Button, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import {useDispatch } from 'react-redux';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/track';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useUser} from '../../firebase/useUser'
import FirebaseAuth from '../../components/auth/FirebaseAuth';
import Player from '../../components/Player';


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const drawerWidth = 240;
 
const Index = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    // const {user} = useTypedSelector(state => state.user)
    const { user } = useUser()
    const [query, setquery] = useState<string>('')
    const [timer, settimer] = useState(null)
    const dispatch = useDispatch() as NextThunkDispatch
    const dispatchAuth = useDispatch()

    // useEffect(() => {
    //     const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
    //         dispatchAuth({type: UserActionTypes.FETCH_USER, payload: {
    //         email: user.email,
    //         id: user.uid
    //     }})
    //     });
    //     return () => unregisterAuthObserver(); 
    //   }, []);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setquery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimeout(async () => {
            await dispatch(await searchTracks(e.target.value))
        }, 500)
    }

    if (error) {
        return (
        <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
        )}

    return (
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <>
                {user 
                ? 
                    <Grid 
                    container 
                    spacing={4} 
                    sx={{
                    [theme.breakpoints.up('sm')]: {
                      marginLeft: '70px',
                      width: `calc(100% - ${drawerWidth}px)`
                    },
                    }}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    >
                        <Grid item xs={4}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                            bgcolor: 'background.default',
                            color: 'text.primary',
                            borderRadius: 1,
                            p: 3,
                        }}
                        >
                          {theme.palette.mode} mode
                          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                          </IconButton>
                        </Grid>
                        {/* <Grid item xs={10} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.default',
                            borderRadius: 30,
                            margin: '3',
                            p: 3,
                            }}>
                          <TextField
                            value={query}
                            onChange={search}
                            label={"search track"} 
                            />
                        </Grid> */}
                    <TrackList tracks={tracks}/>
                    <Player/>
                </Grid>
                :
                <FirebaseAuth/>
                }
            </>
        </MainLayout>
    );
};


export default function ToggleColorMode() {
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
          <Index />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

export const getServerSideProps = wrapper.getStaticProps(async ({store}) => {
    try {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks())
    } catch (error) {
       console.log(error)
    }
})
