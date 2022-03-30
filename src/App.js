import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './App.css';

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from './components/AuthHelperMethods';

//Our higher order component
import withAuth from './components/withAuth';

class App extends Component {

  state = {
    username: ''
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  //Render the protected component
  render() {
    let name = null;
    if (this.props.confirm) {
      name = this.props.confirm.username;
    }
    //let name = this.props.confirm.username;
    console.log("Rendering Appjs!")
    return (

      <div className="App">
        <div className="App">
          <div className="main-page">
            <div className="top-section">
              <h1>Welcome, {name}</h1>
            </div>
            <div className="bottom-section">
              <button onClick={this._handleLogout}>LOGOUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.

export default withAuth(App);

// import React, { Component } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Add } from './components/add';
// import { Events } from './components/events';
// import { Home } from './components/home';
// import {Navbar, Nav} from 'react-bootstrap';
// /*
// Authentication JSON Web Token Imports
// */
// import AuthHelperMethods from './components/AuthHelperMethods';
// import withAuth from './components/withAuth';

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// //import {Add} from './components/add';

// Auth = new AuthHelperMethods();
// /* Add the following into _handleLogout*/
// _handleLogout = () => {
// this.Auth.logout()
// this.props.history.replace('/login');
// }

// class App extends Component {
//   render(){
//     return (
//       <Router>
//       <div className='="App'>

//         <Navbar bg="primary" variant="dark">
//             <Navbar.Brand href="#home">Ticket App</Navbar.Brand>
//             <Nav className="mr-auto">
//               <Nav.Link href="/">Home</Nav.Link>
//               <Nav.Link href="/events">Events</Nav.Link>
//               <Nav.Link href="/add">Create Event</Nav.Link>
//             </Nav>
//           </Navbar>

//           <br/>
//           <Switch>
//             <Route path='/' component={Home} exact></Route>
//             <Route path='/events' component={Events} exact></Route>
//             <Route path='/add' component={Add} exact></Route>
//           </Switch>
//       </div>
//       </Router>
//     );
//   }
// }

// export default App;
