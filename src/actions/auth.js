import history from '../history';

import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_ERROR} from './types';

export const login = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(
            () => {
                dispatch({type:LOGIN_SUCCESS});
                history.push('/groups');
            }
        ).catch(
            (err) => {
                dispatch({type:LOGIN_ERROR, payload:err});
            }
        )
    }
}

export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then( () => {
            dispatch({type:LOGOUT_SUCCESS })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then( (res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                username:newUser.username,
            })
        }).then( () => {
            dispatch({type:SIGN_UP_SUCCESS});
            history.push('/groups/join');
        }).catch( (err) => {
            dispatch({type:SIGN_UP_ERROR, payload:err});
        })

    }
}