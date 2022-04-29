import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { API_ROOT } from '../../settings';

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [openDate, setOpenDate] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [numTickets, setNumTickets] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [msg, setMsg] = useState('');
    const [admin, setAdmin] = useState(false);
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['token'])

    const validate = () => {
        if (name == "" || eventDate == "" || closingDate == "" || openDate == "" || numTickets == "" || ticketPrice == "" )  {
            return "You must provide a value for all fields";
        }

        return "";
    };

    const Create = async (e) => {
        e.preventDefault();

        let valid = validate();
        if (valid != "") {
            setMsg(valid);
            return;
        }
        console.log("Sending post with token:", cookies.token);
        try {
            await axios.post(API_ROOT+'event', {
                name: name,
                event_date: eventDate,
                open_date: openDate,
                closing_date: closingDate,
                max_tickets: numTickets,
                ticket_price: ticketPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            if(admin) {
                history.push("/admin/dashboard");
            } else {
                history.push("/admin/dashboard");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <div className="container mt-5">
                    <form onSubmit={Create} className="box">
                        <div className="row">
                            <div className="col">
                                <div className="field mt-5">
                                    <label className="label">Event Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Event Date</label>
                                    <div className="controls">
                                        <input type="date" className="input" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Opening Date</label>
                                    <div className="controls">
                                        <input type="date" className="input" placeholder="Date When Tickets Go On Sale" value={openDate} onChange={(e) => setOpenDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="field mt-5">
                                    <label className="label">Closing Date</label>
                                    <div className="controls">
                                        <input type="date" className="input" placeholder="Date When Ticket Sales Close" value={closingDate} onChange={(e) => setClosingDate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Total Tickets Available</label>
                                    <div className="controls">
                                        <input type="number" step="1" className="input" placeholder="Number of Tickets to be sold" value={numTickets} onChange={(e) => setNumTickets(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Ticket Price</label>
                                    <div className="controls">
                                        <input type="number" className="input" placeholder="Price of Ticket (Euros)" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col">
                            <p className="has-text-centered" style={{color:"red"}}>{msg}</p>
                            <div className="field mt-5">
                                <button className="button is-success is-fullwidth">Create</button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
    )
}
 
export default CreateEvent;