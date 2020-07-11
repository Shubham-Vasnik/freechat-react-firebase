import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import groupReducer from './groupReducer';
import messagesReducer from './messagesReducer';


export default combineReducers({
    auth:authReducer,
    form:formReducer,
    groups:groupReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    messages:messagesReducer,
});