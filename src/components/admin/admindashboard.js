import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import { formatDate } from "../../utils";
import { FaEdit, FaTicketAlt } from 'react-icons/fa';
import { API_ROOT } from '../../settings';

const AdminDashboard = () => {
    const [name, setName] = useState('');
    // const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [events, setEvents] = useState([]);
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        refreshToken();
        getEvents();
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get(API_ROOT+'token');
            // setToken(response.data.accessToken);
            setCookie('token', response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get(API_ROOT+'token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            // setToken(response.data.accessToken);
            setCookie('token', response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 

    const getEvents = async () => {
        const response = await axiosJWT.get(API_ROOT+'events', {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        });
        setEvents(response.data);
    };
 
    const createEvent = () => {
        console.log("Creating Event");
        history.push("/admin/createevent");
    };
 

    const edit = async () => {
        console.log("Edit clicked");
    }
   
    const view = async () => {
        console.log("View clicked");
    }
   


    return (
        <div className="container mt-5">
            <h1>Your Events:</h1>
            <p className="has-text-right"><Button variant="primary" onClick={createEvent}>Create Event</Button></p>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>ID:</th>
                        <th>Event Name</th>
                        <th>Event Date</th>
                        <th>Opening Date</th>
                        <th>Closing Date</th>
                        <th>Max Tickets</th>
                        <th>Ticket Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{formatDate(event.event_date)}</td>
                            <td>{formatDate(event.open_date)}</td>
                            <td>{formatDate(event.closing_date)}</td>
                            <td>{event.max_tickets}</td>
                            <td>{event.ticket_price}</td>
                            <td><Button className="align-middle"  onClick={edit}><FaEdit className="mr-1"></FaEdit> Edit</Button></td>
                            <td><Button className="align-middle" onClick={view}><FaTicketAlt className="mr-1" ></FaTicketAlt> View Tickets Sold</Button></td>
                            </tr>
                    ))}
 
                </tbody>
            </table>
        </div>
    )
}
 
export default AdminDashboard