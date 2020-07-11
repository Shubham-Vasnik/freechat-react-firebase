import React from 'react';
import moment from 'moment';


class Message extends React.Component{

    render(){
        const {message} = this.props;
        return (
            <div className="message">
                <p className="meta">{message.author.username} <span> <small>{ moment(message.time.toDate()).format('llll') }</small></span></p>
                <p className="text">
                    { message.text }
                </p>
            </div>
        )
    }
}

export default Message;