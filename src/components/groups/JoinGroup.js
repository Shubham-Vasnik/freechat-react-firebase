import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
 
import {joinGroup} from '../../actions/groups';

class JoinGroup extends React.Component{

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
        this.props.joinGroup(formValues);
    }
    

    renderInput = ({input,label,meta,type,placeholder}) => {
        const className = `form-group ${meta.touched && meta.error ? 'alert alert-danger' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input className="form-control" placeholder={placeholder} {...input} type={type}/>
                {this.renderError(meta)}
            </div>
            
        )
    }


    render(){

        if(!this.props.auth.uid) return <Redirect to='/login'/>

        return(
            <div className="container create-group-container">
                <h1>Join A New Group</h1>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="create-group-form">
                    <Field name="groupname"  component={this.renderInput} label="Group Name" type="text" placeholder="Group Name" required/>
                    <button type="submit" className="btn btn-success">Join</button>
                </form>
            </div>
        )
    }

}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.groupname){
        errors.groupname = "You must enter a Group Name";
    }

    return errors;
}


const mapStateToProps = (state) => {
    return {auth:state.firebase.auth}
}

const wrapedForm = reduxForm({
    form:'JoinGroupForm',
    validate,
})(JoinGroup);

export default connect(mapStateToProps,{joinGroup})(wrapedForm);