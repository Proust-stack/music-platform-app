import { Dispatch } from "react"
import { UserAction, UserActionTypes } from "../../types/user";
import firebase from '../../firebase/firebase'


export const login =  (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signUp = ( email, password ) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
}