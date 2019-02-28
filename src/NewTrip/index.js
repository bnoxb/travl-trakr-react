// Connects to TripContainer
import React, { Component } from 'react';

class NewTrip extends Component {
	constructor() {
		
		super();

		this.state = {
			name: '',
			country: '',
			dateArrived: '',
			dateLeft: '',
			initialNote: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	render() {
		return (
			<div id='new-trip-page'>
				<div>NewTrip</div><br/>
				<form onSubmit={this.props.addTrip.bind(null, this.state)}>
					<input type='text' name='name' placeholder='City of Trip' onChange={this.handleChange} /><br/>
					<input type='text' name='state' placeholder='State of Trip' onChange={this.handleChange} /><br/>
					<input type='text' name='country' placeholder='Country of Trip' onChange={this.handleChange} /><br/>
					<label>
						Date of Arrival
						<input type='date' name='dateArrived' onChange={this.handleChange}/>
					</label><br/>
					<label>
						Date Left
						<input type='date' name='dateLeft' onChange={this.handleChange}/>
					</label><br/>
					<label>Some notes about your trip:</label><br/>
					<textarea name='initialNote' onChange={this.handleChange}></textarea>
					<button>Make your trip</button>
				</form>
				<button onClick={this.props.hideNewTrip}>Undo New Trip</button>
			</div>
		)
	}
}


export default NewTrip;