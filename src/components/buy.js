import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { API_ROOT } from '../settings';

const BuyTicket = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [msg, setMsg] = useState('');
    const [admin, setAdmin] = useState(false);
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['token'])

    const validate = () => {
        if (amount == "" || name == "" || totalPrice == "")  {
            return "You must provide a value for all fields";
        }

        return "";
    };

    const Buy = async (e) => {
        e.preventDefault();

        let valid = validate();
        if (valid != "") {
            setMsg(valid);
            return;
        }
        console.log("Sending post with token:", cookies.token);
        try {
            await axios.post(API_ROOT+'payment', {
                amount: amount,
                name: name,
                totalPrice: totalPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            if(!admin) {
                history.push("/dashboard");
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
    <div className="container mt-5">
                <form onSubmit={Buy} className="box">
                    <div className="row">
                        <div className="col">
                            <div className="field mt-5">
                                <label className="label">Amount of Tickets</label>
                                <div className="controls">
                                    <input type="number" className="input" placeholder="Ticket Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Name on Tickets</label>
                                <div className="controls">
                                    <input type="name" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Total Price</label>
                                <div className="controls">
                                    <input type="number" className="input" placeholder="Price of Tickets (Euros)" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col">
                        <p className="has-text-centered" style={{color:"red"}}>{msg}</p>
                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth">Buy</button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
)
}

export default BuyTicket;