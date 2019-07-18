import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header'
import LogIn from './components/pages/LogIn';
import Home from './components/pages/Home';
import About from './components/pages/About';
import 'semantic-ui-less/semantic.less'
// import axios from 'axios';

const App = () => {
  // localStorage.clear();
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
          </div> 
      </div>
    </Router>
  );
}

export default App;