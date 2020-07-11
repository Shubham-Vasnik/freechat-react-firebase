import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';
import {login} from '../../actions/auth';
 

class Login extends React.Component{

    onSubmit = (formValues) => {
        this.props.login(formValues);
    }

    render(){

        if(this.props.auth.uid) return <Redirect to='/groups'/>
        
        return(
            <div className="container register-container">
                <h1>Login To Your Account</h1>
                <LoginForm onSubmit = {this.onSubmit}/>
                <div className="">   
                    <span>Don't have an account? </span>
                    <Link to='/register'>Signup</Link>
                </div>
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {auth:state.firebase.auth}
}


export default connect(mapStateToProps,{login})(Login);