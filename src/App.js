import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import GroupsContainer from './components/GroupsContainer'
import ContactsContainer from './components/ContactsContainer'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom'

import Auth from './components/modules/Auth'

class App extends Component {

  constructor(){

    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    };

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    fetch('http://localhost:3001/logout', { 
    method: 'DELETE',

    headers: {
      token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
    }
    }).then(res => {
      Auth.deauthenticateToken();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })

    }).catch(err => console.log(err));
  }

  handleRegisterSubmit(e,data){
    e.preventDefault();
    axios.post("http://localhost:3001/users", {
        user: data
    }).then(res => {
        Auth.authenticateToken(res["data"].token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
        });
      }).catch(err => {
        console.log(err);
      })
  }

  handleLoginSubmit(e,data){
    e.preventDefault();
    axios.post("http://localhost:3001/login", {
      'username': data["username"],  
      'password': data["password"]
    }).then(res => {
        Auth.authenticateToken(res["data"].token)
        console.log(Auth.getToken());
        this.setState({
          auth: Auth.isUserAuthenticated(),
        });
      }).catch(err => {
        console.log(err);
      })
  }


  render() {
    return (
      <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Contacts Application</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      { (this.state.auth) ?
           <li><span onClick={this.handleLogout}>Logout</span> </li>
               : 
               <li><Link to="/login">Login </Link></li>
               }
           
               {(this.state.auth) ?
               <li><Link to="/groups">Groups</Link> </li>
               : 
               <li><Link to="/register"> Register</Link></li>
               }

    </ul>

  </div>
</nav>
<br/>
<div className="container">
     {this.state.auth ?
        <Route exact path='/groups/:group_id/contacts' component={ContactsContainer}/> : ""}
        <Route exact path="/groups" render={() => (this.state.auth) ?  <GroupsContainer/> : <Redirect to="/login"/>} />
        <Route exact path="/register" render={() => (this.state.auth) ? <Redirect to="/groups"/> : <RegisterForm handleRegisterSubmit ={this.handleRegisterSubmit}/>} />
        <Route exact path="/login" render={() => (this.state.auth) ? <Redirect to="/groups"/> : <LoginForm handleLoginSubmit ={this.handleLoginSubmit}/>} />
        <Route exact path="/dashboard" render={() => <Dashboard/>}/>
        </div>
     </div>
      </Router>
    );
  }
}

export default App
