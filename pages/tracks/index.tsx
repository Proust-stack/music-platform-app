import { Box, Button, Grid, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/track';


const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    const [query, setquery] = useState<string>('')
    const [timer, settimer] = useState(null)
    const dispatch = useDispatch() as NextThunkDispatch

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
            <Grid container justifyContent="center" >
                <Card style={{width: 1200, background: 'linear-gradient(45deg, #EECFBA, #C5DDE8)', borderRadius: 30, marginTop: 150}}>
                    <Box p={3}>
                        <Grid container justifyContent="space-around">
                            <Button onClick={() => router.push('/tracks/create')}>Load track</Button>
                        </Grid>
                    </Box>
                    <TextField
                    value={query}
                    onChange={search}
                    label={"search track"} 
                    style={{margin: '10px auto 0 350px', width: 500, borderRadius: 30}}
                    />
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    try {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks())
    } catch (error) {
        return {
            redirect: {
                destination: '/tracks',
                statusCode: 307
            }
        }
    }
})