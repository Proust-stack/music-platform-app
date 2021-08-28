import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import { useRouter } from 'next/dist/client/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import Image from 'next/image';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('https://music-platform-nest.herokuapp.com/tracks/comment', {
            username: username.value,
            text: text.value,
            trackId: track._id
        })
        setTrack({...track, comments: [...track.comments, response.data]})
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainLayout
            title={"Музыкальная площадка - " + track.name + " - " + track.artist}
            keywords={'Музыка, артисты, ' + track.name + ", " + track.artist}
        >
            <Button 
            onClick={() => router.push('/tracks')}
            variant={"outlined"}
            style={{fontSize: 32}}
            >
                to tracks list
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <Image 
                src={track.picture} 
                alt="track cover" 
                width={200} 
                height={200}/>
                <div style={{marginLeft: 30}}>
                    <h1>track name: {track.name}</h1>
                    <h1>artist: {track.artist}</h1>
                    <h1>number of listerning: {track.listens}</h1>
                </div>
            </Grid>
            <h1>lyrics</h1>
            <p>{track.text}</p>
            <h1>comments</h1>
            <Grid container>
                <TextField 
                label="your name" 
                fullWidth
                {...username}
                />
                <TextField 
                label="your comment" 
                fullWidth multiline 
                rows={4}  
                style={{marginTop: 10}}
                {...text}
                />
                <Button onClick={addComment}>add comment</Button>
            </Grid>
            <div>
                {track.comments.map(comment => 
                    <div key={comment._id}>
                        <div>User: {comment.username}</div>
                        <div>Comment: {comment.text}</div>
                    </div>
                    )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    try {
        const response = await axios.get('https://music-platform-nest.herokuapp.com/tracks/' + params.id)
        return {
            props: {
                serverTrack: response.data
            }
        }
    } catch (error) {
        console.log(error);
    }
    
}