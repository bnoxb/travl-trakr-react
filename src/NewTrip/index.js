import React, { Component } from 'react';

class NewTrip extends Component {
	constructor() {
		
		super();

		this.state = {
			name: '',
			country: '',
			dateArrived: '',
			dateLeft: '',
			notes: null
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
						<input type='datetime-local' name='dateArrived' onChange={this.handleChange} />
					</label><br/>
					<label>
						Date Left
						<input type='datetime-local' name='dateLeft' onChange={this.handleChange} />
					</label><br/>
					<label>Some notes about your trip:</label><br/>
					<textarea name='notes' onChange={this.handleChange}></textarea>
					<button>Make your trip</button>

				</form>
			</div>
		)
	}
}


export default NewTrip;