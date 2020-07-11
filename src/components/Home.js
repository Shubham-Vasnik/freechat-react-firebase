import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component{

    render(){
        return (
            <div className="home-container container">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Free Chat</h1>
                    <p className="lead">A Free Group Chat Platform</p>
                    <hr className="my-4"/>
                    <p className="lead">Free Chat is the easiest way to communicate over text, whether you’re part of a school club, a nightly gaming group, a worldwide art community, or just a handful of friends that want to hang out.</p>
                    <div className="btn-container d-flex justify-content-center">
                        <div><Link  className="btn btn-lg btn-primary" to="/login">Login</Link></div>
                        <div><Link  className="btn btn-lg btn-primary" to="/register">Create A New Account</Link></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;