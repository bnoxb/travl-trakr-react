import React, { Component } from 'react';

class NewTrip extends Component {
	constructor() {
		
		super();

		this.state = {

		}
	}

	render() {
		return (
			<div>
				<div>NewTrip</div>
				<form>
					<input type='text' name='name' onChange={this.handleChange} /><br/>
					<label>
						Date of Arrival
						<input type='date' name='dateArrived' onChange={this.handleChange} />
					</label><br/>
					<label>
						Date of Left
						<input type='date' name='dateLeft' onChange={this.handleChange} />
					</label><br/>
					<label>Some notes about your trip:</label><br/>
					<textarea name='notes' rows='8' columns='50'></textarea>

				</form>
			</div>
		)
	}
}


export default NewTrip;