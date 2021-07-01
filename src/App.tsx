import React, {useEffect, useState} from 'react';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import Login from "./components/Login/Login";

import './App.css';
import AdminPage from './components/AdminPage/AdminPage';
import UserList from './components/UserList/UserList';
import UserProfile from './components/UserProfile/UserProfile';
import VideoPage from './components/VideoPage/VideoPage';
import CreateUser from './components/CreateUser/CreateUser';
import VideoList from './components/VideoList/VideoList';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={()=><Login/>} />
      <Route path="/Main" component={AdminPage} />
      <Route path="/UserList" component={UserList} />
      <Route path="/UserProfile" component={UserProfile} />
      <Route path="/VideoPage" component={VideoPage} />
      <Route path="/CreateUser" component={CreateUser} />
      <Route path="/Videos" component={VideoList} />
      <Route render={()=> <Redirect to={{pathname:"/"}}/> } />     
    </Switch> 
  );
}

export default withRouter(App);
