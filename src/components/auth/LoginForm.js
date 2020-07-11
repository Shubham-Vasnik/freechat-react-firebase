import React from 'react';
import { Field, reduxForm} from 'redux-form';

class SignInForm extends React.Component{

    renderError({touched,error}){

        if(touched && error){
            return (
                <div className="alert alert-danger" role="alert">
                    {error} 
                </div>
            );
        }
    }

    onSubmit = (formValues)=>{
        this.props.onSubmit(formValues);
    }
    

    renderInput = ({input,label,meta,type}) => {
        const className = `form-group ${meta.touched && meta.error ? 'alert alert-danger' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input className="form-control" {...input} type={type}/>
                {this.renderError(meta)}
            </div>
            
        )
    }


    render(){
        return(
            <div className="container mt-5">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="register-form">
                    <Field name="email"  component={this.renderInput} label="Email" type="email" required/>
                    <Field name="password" component={this.renderInput} label="Password" type="password" required/>
                    <button type="submit" className="btn btn-success">Login</button>

                </form>
            </div>
        )
    }

}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.email){
        errors.email = "You must enter a valid Email";
    }

    if(!formValues.password){
        errors.password = "You must enter a valid Password";
    }

    return errors;
}


export default reduxForm({
    form:'SignInForm',
    validate,
})(SignInForm);