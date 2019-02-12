import React, { Component } from 'react';
import NewTrip from '../NewTrip';
import TripPage from '../TripPage';
import TripList from '../TripList';


class TripContainer extends Component {
	constructor() {
		super();
		this.state = {
			trips: [],
			newTripScreen: false,
			currentTrip: {},
			showTripScreen: false
		}
	}

	componentDidMount () {
		this.getTrips();
	}

	addTrip = async (trip, e) => {
		e.preventDefault();
		try {
			const tripCreateResponse = await fetch('http://localhost:9000/trips/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(trip),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if(!tripCreateResponse.ok) {
				throw Error(tripCreateResponse.statusText);
			}

			const parsedResponse = await tripCreateResponse.json();
			this.setState({
				trips: parsedResponse.data.user.trips,
				newTripScreen: false
			})

			console.log(parsedResponse);

		} catch(err) {
			console.log(err);
		}
	}

	newTrip = () => {
		this.setState({
			newTripScreen: true,
			showTripScreen: false
		})
	}

	showTrip = async (trip, e) => {
		try {
			const response = await fetch(`http://localhost:9000/trips/${trip._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const tripParsed = await response.json();
			console.log('ShowTrip triggered');
			this.setState({
				currentTrip: tripParsed.data,
				showTripScreen: true,
				newTripScreen: false
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	hideTrip = () => {
		this.setState({
			showTripScreen: false
		})
	}

	getTrips = async () => {
		try {
			const response = await fetch(`http://localhost:9000/api/v1/users/${this.props._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const userParsed = await response.json();
			this.setState({
				trips: userParsed.data.trips
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	deleteTrip = async (e) => {
		e.preventDefault();
		console.log(this.state.currentTrip._id);
		try {
			const response = await fetch(`http://localhost:9000/trips/${this.state.currentTrip._id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.setState({
				trips: this.state.trips.filter(trip => trip._id !== this.state.currentTrip._id),
				showTripScreen: false

			})
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		return(
			<div>
				{this.state.newTripScreen ? <NewTrip history={this.props.history} addTrip={this.addTrip} /> : <button onClick={this.newTrip}>Make a NewTrip</button>}
				{this.state.showTripScreen ? <TripPage currentTrip={this.state.currentTrip} hideTrip={this.hideTrip} deleteTrip={this.deleteTrip} /> : <TripList trips={this.state.trips} showTrip={this.showTrip} />}
			</div>

		)
	}
}



export default TripContainer;