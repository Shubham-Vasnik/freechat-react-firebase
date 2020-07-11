import firebase from '../config/firebaseConfig';
import history from '../history';

import {CREATE_GROUP, CREATE_GROUP_ERROR, FETCH_GROUPS, FETCH_GROUP, MESSAGE_SENT, MESSAGE_SENT_ERROR, FETCH_MESSAGES, JOIN_GROUP, LEAVE_GROUP} from './types'

export const createGroup = (group) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const username = getState().firebase.profile.username;
        const adminId = getState().firebase.auth.uid;
        firestore.collection('groups').add({
            ...group,
            adminId:adminId,
            adminUsername:username,
            createdAt:new Date(),
            members:[{id:adminId,
                    username:username}]
        }).then( (group) => {
            firestore.collection('users').doc(adminId).update({
                groups:firebase.firestore.FieldValue.arrayUnion(group.id)
            });

            dispatch({type:CREATE_GROUP, payload:group});
            history.push('/groups');
        }).catch( (err) => {
            dispatch({type:CREATE_GROUP_ERROR, payload:err});
        })
    }
}

export const fetchGroups = (groups) => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        // const groups = getState().firebase.profile.groups;
        
        console.log(groups);
        const data = [];
            if(groups){
                // eslint-disable-next-line
                    groups.map(group => {
            firestore.collection('groups').doc(group).get().then((doc) => {
                data.push(Object.assign({ id: doc.id }, doc.data()));
            }
            ).then(() => {
                dispatch({type:FETCH_GROUPS, payload:data})
        });
        })                                  
        // firestore.collection("groups").get()
        // .then(querySnapshot => {
        //     const data = querySnapshot.docs.map(doc => 
        //         Object.assign({ id: doc.id }, doc.data()));
        //     dispatch({type:FETCH_GROUPS, payload:data});
        // });
    }
    }
}


export const fetchGroup = (id) => {

    console.log(id);

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('groups').doc(id).get().then( (doc) => {
            const data = doc.data();
            data.id = doc.id;
            dispatch({type:FETCH_GROUP, payload:data});
        })
    }

}


export const sendMessage = (id, message) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('groups').doc(id).collection('messages').add({
            text:message.text,
            time:message.time,
            author:message.author
        }).then(() => {
            dispatch({type:MESSAGE_SENT,payload:message})
        }).catch((err) => {
            dispatch({type:MESSAGE_SENT_ERROR,payload:err})
        })
    }
}

export const fetchMessages = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("groups").doc(id).collection('messages').get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => 
                Object.assign({ id: doc.id }, doc.data()));
            dispatch({type:FETCH_MESSAGES, payload:data});
        });
}
}

export const joinGroup = (groupname) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const username = getState().firebase.profile.username;
        const userId = getState().firebase.auth.uid;
        const firestore = getFirestore();
        let groupId = '';
        console.log('join Grp', groupname)
        firestore.collection('groups').where('groupname','==',groupname.groupname).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data());
                groupId = doc.id;
                doc.ref.update({
                    members:firebase.firestore.FieldValue.arrayUnion({id:userId,username:username})
                }).then( () => {
                    firestore.collection('users').doc(userId).update({
                        groups:firebase.firestore.FieldValue.arrayUnion(groupId)
                    }).then(() => {
                        dispatch({type:JOIN_GROUP,payload:groupId});
                        history.push('/groups');
                    })
                })
            });
        
        
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}}

export const leaveGroup = (groupId) => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        firestore.collection('users').doc(userId).update({
            groups:firebase.firestore.FieldValue.arrayRemove(groupId)
        }).then(() => {
            dispatch({type:LEAVE_GROUP,payload:groupId});
            history.push('/groups');
        })
    }
}


