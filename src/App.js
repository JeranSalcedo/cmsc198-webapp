import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header'
import LogIn from './components/pages/LogIn';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import Users from './components/pages/Users';
import 'semantic-ui-less/semantic.less'
// import axios from 'axios';

const App = () => {
  console.log(window.localStorage);
  return (
    <Router>
      <div className='app'>
          <div className='container'>
            <Route exact path='/' render={() => (
              localStorage.length !== 0? (
                <React.Fragment>
                  <Header />
                  <Home />
                </React.Fragment>
              ) :
                <Redirect to='/login' />
            )} />
            <Route path='/login' render={() => (
              localStorage.length !== 0? (
                <Redirect to='/' />
              ) :
                <LogIn />
            )} />
            <Route path='/about' render={() => (
              localStorage.length !== 0? (
                <React.Fragment>
                  <Header />
                  <About />
                </React.Fragment>
              ) :
                <Redirect to='/login' />
            )} />
            <Route path='/profile' render={() => (
              localStorage.length !== 0? (
                <React.Fragment>
                  <Header />
                  <Profile />
                </React.Fragment>
              ) :
                <Redirect to='/login' />
            )} />
            <Route path='/users' render={() => (
              localStorage.length !== 0? (
                <React.Fragment>
                  <Header />
                  <Users />
                </React.Fragment>
              ) :
                <Redirect to='/login' />
            )} />
          </div> 
      </div>
    </Router>
  );
}

export default App;