import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import {fetchGroups} from '../../actions/groups';


class Groups extends React.Component{

    wait = time => new Promise((resolve) => setTimeout(resolve, time));

    componentDidMount(){
        if(this.props.profile.groups){
            this.props.fetchGroups(this.props.profile.groups);
        }
        else{
            this.wait(1000).then( () => this.props.fetchGroups(this.props.profile.groups));
        }
        
    }

    renderGroupList(){
        if(this.props.groups){
        return this.props.groups.map(group =>{
            return (
                <a href={`/group/${group.id}`} key={group.id}>
                    <div className="card mb-3" style={{maxWidth: "540px"}}>
                        <div className="row no-gutters">
                        <div className="col-md-4 card-img-div">
                            <img src={group.groupicon} className="card-img" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                            <h5 className="card-title">{group.groupname}</h5>
                            <p className="card-text">{group.description}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </a>
            )

        });
    }
    }
    

    render(){

        const {auth} = this.props;

        if(!auth.uid) return <Redirect to='/login'/>

        return (
            <div className="container groups-container mt-3">
                <h1>My Groups</h1>
                <ul className="group-list">
                    {this.renderGroupList()}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        groups:Object.values(state.groups),
        profile:state.firebase.profile,
        auth:state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps,{fetchGroups}),
    firestoreConnect([
    ]),
)(Groups);

