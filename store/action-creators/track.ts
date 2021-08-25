import axios from "axios"
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:3001/tracks')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'error occures on loading tracks'})
        }
    }
}
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:3001/tracks/search?query=' + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'error occures on loading tracks'})
        }
    }
}