import React, { useState } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Main from './pages/Main'
import Home from './pages/Home'
import Login from './pages/Login'
import Statistics from './pages/Statistics'
import Axios from 'axios';
import Test from './pages/Test'


class App extends React.Component {
  render(){
    return(
      <div>
      <BrowserRouter>
        {/* <Link to="/">main</Link>
        <Link to="/home">home</Link> */}
        <Switch>
          <Route exact path='/'><Main {...this.props}/></Route>
          <Route path='/home'><Home /></Route>
          <Route path='/login'><Login {...this.props}/></Route>
          <Route path='/statistics'><Statistics /></Route>
          <Route path='/test'><Test {...this.props}/></Route>
        </Switch>
      </BrowserRouter>
      </div>
    )
  }
}

export default App
