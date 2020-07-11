import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';


import history from '../history';
import Header from './header/Header';
import Register from './auth/Register';
import Login from './auth/Login';
import CreateGroup from './groups/CreateGroup';
import Groups from './groups/Groups';
import Chat from './groups/Chat';
import JoinGroup from './groups/JoinGroup';
import Home from './Home';


class App extends React.Component{
    render(){
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/register" exact component={Register} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/groups/create" exact component={CreateGroup} />
                            <Route path="/groups" exact component={Groups} />
                            <Route path="/groups/join" exact component={JoinGroup} />
                            <Route path="/group/:id" exact component={Chat} />
                            
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}





export default App;