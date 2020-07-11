import _ from 'lodash';

import {CREATE_GROUP, CREATE_GROUP_ERROR, FETCH_GROUP, FETCH_GROUPS, JOIN_GROUP, LEAVE_GROUP} from '../actions/types'

const intialState = {

};


const groupReducer = (state = intialState, action) => {

    switch(action.type){

        case CREATE_GROUP:
            console.log('Group Created');
            return { ...state}
        case CREATE_GROUP_ERROR:
            console.log('Group Create Error');
            return { ...state}
        case FETCH_GROUPS:
            return {...state,  ..._.mapKeys(action.payload,'id')}
        case FETCH_GROUP:
            return {...state, [action.payload.id] : action.payload};
        case JOIN_GROUP:
            console.log("JOIN GROUP ",action.payload);
            return {...state};
        case LEAVE_GROUP:
            console.log("Leave GROUP ",action.payload);
            return {...state};
        default:
            return state;
    }

}

export default groupReducer;