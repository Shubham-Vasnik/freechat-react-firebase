import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {logout} from '../../actions/auth';

class Header extends React.Component{


  userLinks = (auth) => auth.uid ? (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/groups">My Groups</Link>
      </li>
      <li className="nav-item">
          <Link className="nav-link" to="/groups/create"> Create A New Group</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/groups/join"> Join A Group</Link>
      </li>
    </ul>
  ):""

  loggedInLinks = (auth, profile) => auth.uid ? (
    <>
        <li className="nav-item">
            <Link className="nav-link" to="#">Welcome {profile.username}</Link>
        </li>
        <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={this.props.logout}>Logout</button>
        </li>
    </>
  ):(
    <>
          <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/register">Signup</Link>
          </li>
    </>
  )


    render(){

      const {auth, profile}  = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Free Chat</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {this.userLinks(auth)}
              <ul className="navbar-nav ml-auto">
                {this.loggedInLinks(auth, profile)}   
              </ul>
            </div>
          </nav>
        )
    }
}

const mapStateToProps = state => {
  return {
    auth:state.firebase.auth,
    profile:state.firebase.profile
  }
}

export default connect(mapStateToProps, {logout})(Header);