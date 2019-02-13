import React, { Component } from 'react';
import NewTrip from '../NewTrip';
import TripPage from '../TripPage';
import TripList from '../TripList';
import EditTrip from '../EditTrip';
import AddNote from '../AddNote';


class TripContainer extends Component {
	constructor() {
		super();
		this.state = {
			trips: [],
			newTripScreen: false,
			currentTrip: {},
			showTripScreen: false,
			showTripEdit: false,
			showNoteAdd: false,
			tripToEdit: {
				name: '',
				state: '',
				country: '',
				dateArrived: '',
				dateLeft: '',
				notes: [],
				_id: null
			},
			noteToAdd: {
				note: ''
			}
		}
	}

	componentDidMount () {
		this.getTrips();
	}

	addTrip = async (trip, e) => {
		e.preventDefault();
		trip.notes = [trip.notes];
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
			console.log(parsedResponse);
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

	showEditTrip = (trip, e) => {
		console.log(trip.dateArrived);
		this.setState({
			showTripEdit: true,
			showTripScreen: false,
			tripToEdit: {
				name: trip.name,
				state: trip.state,
				country: trip.country,
				dateArrived: trip.dateArrived,
				dateLeft: trip.dateLeft,
				notes: trip.notes,
				_id: trip._id
			}
		})
	}

	addNote = (trip, e) => {
		this.setState({
			showNoteAdd: true,
			tripToEdit: {
				_id: trip._id
			}
		})
	}

	handleTripEditSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:9000/trips/${this.state.tripToEdit._id}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.tripToEdit),
				headers:{
					'Content-Type': 'application/json'
				}
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			const mappedTrips = this.state.trips.map((trip) => {
				if(trip._id === this.state.tripToEdit._id) {
					return parsedResponse.data;
				} else {
					return trip;
				}
			});
			console.log(mappedTrips);
			this.setState({
				trips: mappedTrips,
				showTripEdit: false
			});
		} catch(err) {
			console.log(err);
		}
	}

	handleEditFormInput = (e) => {
		this.setState({
			tripToEdit: {
				...this.state.tripToEdit,
				[e.target.name]: e.target.value
			}
		})
	}

	handleNoteChange = (e) => {
		this.setState({
			noteToAdd: {
				note: e.target.value
			}
		})
	}

	handleAddNote = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:9000/trips/${this.state.tripToEdit._id}/addNote`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.noteToAdd),
				headers:{
					'Content-Type': 'application/json'
				}
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			console.log(parsedResponse);
			const mappedTrips = this.state.trips.map((trip) => {
				if(trip._id === this.state.tripToEdit._id) {
					return parsedResponse.data;
				} else {
					return trip;
				}
			});
			console.log(mappedTrips);
			this.setState({
				trips: mappedTrips,
				showNoteAdd: false,
				currentTrip: parsedResponse.data
			});
		} catch(err) {
			console.log(err);
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
			<div id="trip-container">
				{this.state.newTripScreen ? <NewTrip history={this.props.history} addTrip={this.addTrip} /> : <button onClick={this.newTrip}>Make a NewTrip</button>}
				{this.state.showNoteAdd ? <AddNote handleAddNote={this.handleAddNote} handleNoteChange={this.handleNoteChange}/> : null}
				{this.state.showTripEdit ? <EditTrip handleEditFormInput={this.handleEditFormInput} tripToEdit={this.state.tripToEdit} handleTripEditSubmit={this.handleTripEditSubmit}/> : <div>{this.state.showTripScreen ? <TripPage currentTrip={this.state.currentTrip} hideTrip={this.hideTrip} deleteTrip={this.deleteTrip} showEditTrip={this.showEditTrip} addNote={this.addNote}/> : <TripList trips={this.state.trips} showTrip={this.showTrip} />}</div>}
			</div>

		)
	}
}



export default TripContainer;