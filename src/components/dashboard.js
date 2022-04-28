import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { formatDate } from "../utils";
import { FaTicketAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { API_ROOT } from '../settings';

const Dashboard = () => {
    const [name, setName] = useState('');
    // const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [events, setEvents] = useState([]);
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['token'])

    useEffect(() => {
        refreshToken();
        getLatestEvents();
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get(API_ROOT+'token');
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
            setCookie('token', response.data.accessToken);
            // setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getLatestEvents = async () => {
        const response = await axiosJWT.get(API_ROOT+'events/latest', {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        });
        setEvents(response.data);
    }
   
    const buy = async () => {
        console.log("Buy clicked");
    }
   
    return (
        <div className="container mt-5">
            <h1>Welcome Back {name} - see list of upcoming events below</h1>
            <table className="table is-striped ">
                <thead>
                <tr>
                <th>ID:</th>
                <th>Organisation Name</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Opening Date</th>
                <th>Closing Date</th>
                <th>Max Tickets</th>
                <th>Ticket Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {events.map((event, index) => (
                    <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.event_organisation.name}</td>
                    <td>{event.name}</td>
                    <td>{formatDate(event.event_date)}</td>
                    <td>{formatDate(event.open_date)}</td>
                    <td>{formatDate(event.closing_date)}</td>
                    <td>{event.max_tickets}</td>
                    <td>{event.ticket_price}</td>
                    <td><Button className="align-middle" onClick={buy}><FaTicketAlt className="mr-1" ></FaTicketAlt> Buy</Button></td>
                </tr>
            ))}
                </tbody>
            </table>
        </div>
    )
}
 
export default Dashboard