import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
 
import {createGroup} from '../../actions/groups';

class CreateGroup extends React.Component{

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
        this.props.createGroup(formValues);
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
                <h1>Create A New Group</h1>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="create-group-form">
                    <Field name="groupname"  component={this.renderInput} label="Group Name" type="text" placeholder="Group Name" required/>
                    <Field name="groupicon"  component={this.renderInput} label="Group Icon" type="text" placeholder="Group Icon Url"/>
                    <Field name="description"  component={this.renderInput} label="Group Description" type="text" placeholder="Group Description"/>
                    <button type="submit" className="btn btn-success">Create</button>
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
    form:'CreateGroupForm',
    validate,
})(CreateGroup);

export default connect(mapStateToProps,{createGroup})(wrapedForm);