import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header'
import LogIn from './components/pages/LogIn';
import Home from './components/pages/Home';
import './App.css';
import axios from 'axios';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className='app'>
          <div className='container'>
            <Route exact path='/' render={() => (
              loggedIn? (
                <React.Fragment>
                  <Header />
                  <Home />
                </React.Fragment>
              ) :
                <Redirect to='/login' />
            )} />
            <Route path='/login' render={() => (
              <LogIn />
            )} />
          </div> 
      </div>
    </Router>
  );
}

export default App;