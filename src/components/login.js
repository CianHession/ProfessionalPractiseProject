import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import { API_ROOT } from '../settings';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [admin, setAdmin] = useState(false);
    const history = useHistory();
    const [token, setToken] = useCookies();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(API_ROOT+'login', {
                email: email,
                password: password,
                isAdmin: admin
            });

            setToken(res.data.accessToken);
            if(admin) {
                history.push("/admin/dashboard");
            } else {
                history.push("/dashboard");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">

                        <div className="column is-4-desktop">

                            <form onSubmit={Auth} className="box">
                            <img src="/logo.png" width="333" height="93" alt="logo" />
                            <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Select For Admin Login</label>
                                    <Form.Check 
                                        type="switch"
                                        id="custom-switch"
                                        onChange={(e) => {setAdmin(!admin);}}
                                    />
                                    {admin && "Logging in as Event Organisation Admin"}
                                </div>
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                            <a type="button" className="button is-info is-fullwidth mb-3" href="/register">Register User</a>
                            <a type="button" className="button is-info is-fullwidth" href="/registerorg">Register Event Organiser</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Login