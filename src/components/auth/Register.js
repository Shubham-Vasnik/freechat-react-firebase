import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {signUp} from '../../actions/auth';

class Register extends React.Component{


    onSubmit = (formValues) =>{
        this.props.signUp(formValues);
    }  


    renderError({touched,error}){

        if(touched && error){
            return (
                <div class="alert alert-danger mt-2" role="alert">
                    <i className="far fa-times-circle" style={{color: 'red'}}></i> {error} 
                </div>
            );
        }
    }

    renderInput = ({input,label,meta,type}) => {
        const className = `form-group ${meta.touched && meta.error ? 'alert alert-danger' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input className="form-control" autoComplete="false" {...input} type={type}/>
                {this.renderError(meta)}
            </div>
            
        )
    }


    renderCheckbox = ({input,label,meta,type}) => {

       return (
                <div className="form-group">
                    <label>{label}</label>
                    <input className="checkbox" autocomplete="false" {...input} type={type}/>
                    {this.renderError(meta)}
                </div>
       );
    }



    render(){
        return(

            <div className="container register-container">
               <h1>Create A New Account</h1>
               <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="register-form">
                    <Field name="username"  component={this.renderInput} label="Username" type="text"/>
                    <Field name="email"  component={this.renderInput} label="Email" type="email"/>
                    <Field name="password" component={this.renderInput} label="Password" type="password"/>
                    <Field name="confirmPassword" component={this.renderInput} label="Re-enter Password" type="password"/>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn-lg" id="submit-btn">Sign up</button>
                    </div>
                    {this.props.authError ? 
                        (<div class="alert alert-danger mt-2" role="alert">
                            <i className="far fa-times-circle" style={{color: 'red'}}></i> {this.props.authError} 
                        </div>)
                    :''}
                </form>
            </div>
        );

    }

}


const validate = (formValues) => {
    const errors = {};

    if(!formValues.username){
        errors.username = "You must enter a valid Username";
    }

    if(!formValues.email){
        errors.email = "You must enter a valid Email address";
    }

    if(!formValues.password){
        errors.password = "You must enter a valid Password";
    }

    if(!formValues.confirmPassword){
        errors.confirmPassword = "You must enter a valid Password";
    }

    if(formValues.password !== formValues.confirmPassword){
        errors.confirmPassword = "Password and Confirm Password did not match";
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}

const wrapedForm = reduxForm({
    form:'SignUpForm',
    validate,
})(Register);

export default connect(mapStateToProps,{signUp})(wrapedForm);