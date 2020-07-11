import {FETCH_MESSAGES, FETCH_MESSAGES_ERROR} from '../actions/types';

const intialState = {

};


const messagesReducer = (state = intialState, action) => {

    switch(action.type){

        case FETCH_MESSAGES:
            return {...state, msg:action.payload}
        case FETCH_MESSAGES_ERROR:
            return {...state}
        default:
            return state
    }

}


export default messagesReducer;