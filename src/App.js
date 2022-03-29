import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Add } from './components/add';
import { Events } from './components/events';
import { Home } from './components/home';
import {Navbar, Nav} from 'react-bootstrap';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Add} from './components/add';



class App extends Component {
  render(){
    return (
      <Router>
      <div className='="App'>

        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Ticket App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/add">Create Event</Nav.Link>
            </Nav>
          </Navbar>

          <br/>
          <Switch>
            <Route path='/' component={Home} exact></Route>
            <Route path='/events' component={Events} exact></Route>
            <Route path='/add' component={Add} exact></Route>
          </Switch>
      </div>
      </Router>
    );
  }
}
export default App;