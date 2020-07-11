import {LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_ERROR} from '../actions/types';


const intialState = {
    authError:null,
};

const authReducer = (state = intialState, action) => {
    switch(action.type){
        case LOGIN_ERROR:
            return { ...state, authError:'Login Failed'}
        case LOGIN_SUCCESS:
            return { ...state, authError:null}
        case LOGOUT_SUCCESS:
            console.log('Logout Success');
            return state;
        case SIGN_UP_SUCCESS:
            console.log('Signup Success');
            return { ...state, authError:null}
        case SIGN_UP_ERROR:
            console.log('Signup Error');
            return { ...state, authError:action.payload.message}
        
        default:
            return state;
    }

}

export default authReducer;