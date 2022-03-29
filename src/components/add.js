import React, { Component } from 'react';
import axios from 'axios';

export class Add extends Component {
    constructor() {
        super();
        //Bind to Functions to Add Movie(s)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeTicketPrice = this.onChangeTicketPrice.bind(this);
        this.onChangeEventPoster = this.onChangeEventPoster.bind(this);

        //Set-up Blank State
        this.state = {
            Name: '',
            Price: '',
            Poster: ''
        }
    }

    handleSubmit(event) {
        //obj for new events addition
        const newEvent = {
            Name: this.state.Name,
            Price: this.state.Price,
            Poster: this.state.Poster
        }
        //URL + What to Send
        axios.post('http://localhost:4000/api/events', newEvent)
            .then((response) => { //callback function
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })

        //Stop handleSubmit refreshing page aka returning value to blank
        event.preventDefault();
        //Removes Values left in input boxes, does not reset values to default
        this.setState({
            Name: '',
            Price: '',
            Poster: ''
        })
    }

    //What data gets updated/added
    onChangeEventName(event) {
        this.setState({
            //Title add/change
            Name: event.target.value,
        })
    }

    //What data gets updated/added
    onChangeTicketPrice(event) {
        this.setState({
            //Year add/change
            Price: event.target.value
        })
    }

    //What data gets updated/added
    onChangeEventPoster(event) {
        this.setState({
            //Poster add/change
            Poster: event.target.value
        })
    }
    render() {
        return (
            <div>
                <h2>This is my add component!</h2>
                {/* Use form for adding movies using handleSubmit event */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Add Event Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Name}
                            //When changes oCMN
                            onChange={this.onChangeEventName}
                        />
                    </div>

                    {/* Movie Title */}
                    <div className="form-group">
                        <label>Add Ticket Price: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Price}
                            //When changes oCMY
                            onChange={this.onChangeTicketPrice}
                        />
                    </div>

                    {/* Movie Year */}
                    <div className="form-group">
                        <label>Add Poster URL: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Poster}
                            //When changes oCMT
                            onChange={this.onChangeEventPoster}
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <input type="submit"
                            value="Add Event"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

//Send for export
export default Add;