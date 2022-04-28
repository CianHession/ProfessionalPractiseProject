import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_ROOT } from '../settings';

const RegisterOrg = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();
 
    const RegisterOrg = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_ROOT+'users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                isAdmin: true
            });
            history.push("/");
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
                            <form onSubmit={RegisterOrg} className="box">
                            <img src="/logo.png" width="333" height="93" alt="logo" />
                            <p className="has-text-centered"><small>From here you can register as an
                            Event Organiser so that you can set up your own events and sell tickets for those events.</small></p>
                            <p className="has-text-centered small"><small>Please fill out the fields below and 
                            click the Register button to complete the process.</small></p>

                                <div className="field mt-5">
                                    <label className="label">Organisation Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <p className="has-text-centered bg-danger text-white" style={{color:"red"}}>{msg}</p>

                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default RegisterOrg;