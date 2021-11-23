import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import Home from './pages/home';
import DoctorDashboard from './pages/doctorDashboard';
import PacienteDashBoard from './pages/pacienteDashoard';
import Login from './pages/login';
import Register from './pages/register';
import RegisterUserAWS from './Components/RegisterUserAWS';

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/Home'>
          <Home/>
        </Route>
        <Route exact path='/DoctorDashboard/'>
          <DoctorDashboard/>
        </Route>
        <Route exact path='/PacienteDashboard/'>
          <PacienteDashBoard/>
        </Route>
        <Route exact path='/Login' >
          <Login/>
        </Route>
        <Route exact path='/Register'>
          <Register/>
        </Route>
        <Route exact path='/RegisterAWS'>
          <RegisterUserAWS/>
        </Route>
        <Route exact path='*'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
