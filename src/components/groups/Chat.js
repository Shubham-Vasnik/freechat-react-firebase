import React from 'react';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import { animateScroll } from "react-scroll";
import {Redirect} from 'react-router-dom';

import Message from './Message';
import {fetchGroup, sendMessage, fetchMessages, leaveGroup} from '../../actions/groups'




class Chat extends React.Component{

    constructor(props) {
        super(props);
        this.chatMessagesRef = React.createRef();
      }

    state = {msg:''};

    onInputChange = (event) =>{
        this.setState({msg:event.target.value});
    }

    onFormSubmit = (event) => {
        console.log(this.props.match.params.id,this.state.msg);
        event.preventDefault();
        this.props.sendMessage(
            this.props.match.params.id,
            {
            text:this.state.msg,
            author:this.props.user,
            time: new Date(),
        });
        document.querySelector('#msg').value='';
        // this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight;
        this.scrollToBottom();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "chat-messages"
        });
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.fetchGroup(id);
        // this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight;
        this.scrollToBottom();
    }

    onLeaveGroup(groupId){
        this.props.leaveGroup(groupId);
    }


    renderMembers(group){

        if(group){

            if(group.members){

                console.log(group.members)

                return  group.members.map((member)=>{
                return( <li key={member.id}> {member.username} <span  id= {member.username}  className=""></span></li>)
                })
        }
    }
    }

    renderMessages(messages){


            if(messages){
                return messages.map((message)=>{
                     return (<Message key={message.id} message={message}/>)
            });
        }
        

    }
        

    render(){

        const {group} = this.props;

        if(!this.props.auth.uid) return <Redirect to='/login'/>

        return (
            <div className="container">
                <div className="chat-container">
                    <header className="chat-header">
                    <h1><img src={group?group.groupicon:''} alt=""/> <span id="group-name">{group?group.groupname:''}</span></h1>
                    <button className="btn btn-danger btn-lg" onClick= { () => this.onLeaveGroup(group.id)}>Leave Group</button>
                    </header>
                    <main className="chat-main">
                    <div className="chat-sidebar">
                        <h3><i className="fas fa-comments"></i> Group Description:</h3>
                        <h2>{group?group.description:''}</h2>
                        <h3><i className="fas fa-users"></i> Users</h3>
                        <ul id="users">
                            {this.renderMembers(group)}
                        </ul>
                    </div>
                    <div className="chat-messages" id="chat-messages" ref={this.chatMessagesRef}> 
                        {this.renderMessages(this.props.messages)}
                    </div>
                    </main>
                    <div className="chat-form-container">
                    <form id="chat-form" onSubmit={this.onFormSubmit}>
                        <input
                        id="msg"
                        name="message"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        onChange={this.onInputChange}
                        />
                        <button id="submit-btn" className="btn btn-primary btn-lg"><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                    </div>
                </div>
                {this.scrollToBottom()}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        group:state.groups[ownProps.match.params.id],
        user:{id:state.firebase.auth.uid,username:state.firebase.profile.username},
        messages:state.firestore.ordered.messages,
        auth:state.firebase.auth,
    }
}

export default  compose(
    connect(mapStateToProps,{fetchGroup,sendMessage,fetchMessages,leaveGroup}),
    firestoreConnect((props) => [
        {collection:'groups',
             doc:props.match.params.id,
            subcollections:[{collection:'messages', orderBy: ['time']}],
            storeAs:'messages',
        },
        
    ]),
)(Chat);