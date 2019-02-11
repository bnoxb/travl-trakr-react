import React, { Component } from 'react';

class NewTrip extends Component {
	constructor() {
		
		super();

		this.state = {

		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const tripCreateResponse = await fetch('http://localhost:9000/trips/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if(!tripCreateResponse.ok) {
				throw Error(tripCreateResponse.statusText);
			}

			const parsedResponse = await tripCreateResponse.json();

			if(parsedResponse.data.message === 'created successfully') {
				this.props.history.push('/');
			}

			console.log(parsedResponse);




		} catch(err) {
			console.log(err);
		}
	}




	render() {
		return (
			<div>
				<div>NewTrip</div>
				<form onSubmit={this.handleSubmit}>
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
					<button>Make your trip</button>

				</form>
			</div>
		)
	}
}


export default NewTrip;