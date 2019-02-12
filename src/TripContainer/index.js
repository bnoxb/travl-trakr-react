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
			newTripScreen: true
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
			this.setState({
				currentTrip: tripParsed.data,
				showTripScreen: true
			})
		} catch(err) {
			console.log(err);
			return err;
		}
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

	render() {
		return(
			<div>
				{this.state.newTripScreen ? <NewTrip history={this.props.history} addTrip={this.addTrip} /> : <button onClick={this.newTrip}>Make a NewTrip</button>}
				<TripList trips={this.state.trips} showTrip={this.showTrip} />
				{this.state.showTripScreen ? <TripPage currentTrip={this.state.currentTrip}/> : null}
			</div>

		)
	}
}



export default TripContainer;