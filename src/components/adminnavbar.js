import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_ROOT } from '../settings';
 
const AdminNavbar = () => {
    const history = useHistory();
 
    const Logout = async () => {
        try {
            await axios.delete(API_ROOT+'logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="">
                    <img src="/small-logo.png" width="111" height="31" alt="logo" />
                    </a>
 
                    <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="nav-item mt-2">
                        <a href="/admin/dashboard" className="navbar-item">
                            Our Events
                        </a>
                    </div>

                    
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default AdminNavbar