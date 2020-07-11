import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import  { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app';

import App from './components/App';
import reducers from './reducers';
import firebaseConfig from './config/firebaseConfig';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk.withExtraArgument({getFirebase, getFirestore})), 
    reduxFirestore(firebaseConfig),
    ));

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}

    
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

const AuthIsLoaded = ({ children }) => {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
            </div>
        </div>);
    return children
  }


    ReactDOM.render(
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <AuthIsLoaded>
                    <App/>
                </AuthIsLoaded>
            </ReactReduxFirebaseProvider>
        </Provider>,
        document.querySelector('#root'));


