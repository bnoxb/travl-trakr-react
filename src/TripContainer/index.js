// Goes to the UserContainer (because Trips are user specific), All the trip specific items then flow through here.
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
			currentTrip: {},
			// Modals to show screens when actions are going to be done to trips.
			newTripScreen: false,
			showTripScreen: false,
			showTripEdit: false,
			showNoteAdd: false,
			tripToEdit: {
				name: '',
				state: '',
				country: '',
				dateArrived: '',
				dateLeft: '',
				id: null
			},
			noteToAdd: {
				note: ''
			}
		}
	}
// Populating all the trips a User has.
	componentDidMount () {
		this.getTrips();
	}

	addTrip = async (trip, e) => {
		e.preventDefault();
		// Necessary to make sure trip notes are in an array, not just a loose string.
		// For now changing it to a string!
		// trip.notes = [trip.notes];
		try {
			const tripCreateResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/`, {
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
				trips: [...this.state.trips, parsedResponse],
				newTripScreen: false
			})

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

	hideNewTrip = (e) => {
		this.setState({
			newTripScreen: false
		})
	}

	showTrip = async (trip, e) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/${trip.id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const tripParsed = await response.json();
			this.setState({
				currentTrip: tripParsed,
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
			const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${this.props.id}/trips`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const userParsed = await response.json();
			
			await this.setState({
				trips: userParsed
				
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	showEditTrip = (trip, e) => {
		const newDateArrived = new Date(trip.dateArrived);
		const newDateLeft = new Date(trip.dateLeft);
		console.log(`Date Arrived: ${newDateArrived} and the date left: ${newDateLeft}`);
		this.setState({
			showTripEdit: true,
			showTripScreen: false,
			tripToEdit: {
				name: trip.name,
				state: trip.state,
				country: trip.country,
				// The slice is necessary to reformat so it pre-populates in the edit screen. It removes the '#Z' from the end of the date string
				// Slice can only happen if the dates actually exist, so a ternary is needed to avoid errors.
				dateArrived: newDateArrived, 
				//? trip.dateArrived.slice(0, -2) : '',
				dateLeft: newDateLeft,
				// ? trip.dateLeft.slice(0, -2) : '',
				notes: trip.notes,
				id: trip.id
			}
		})
	}
// This accesses the note adding screen.
	addNote = (trip, e) => {
		this.setState({
			showNoteAdd: true,
			tripToEdit: {
				id: trip.id
			}
		})
	}

	handleTripEditSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/${this.state.tripToEdit.id}`, {
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
				if(trip.id === this.state.tripToEdit.id) {
					return parsedResponse;
				} else {
					return trip;
				}
			});
			this.setState({
				trips: mappedTrips,
				showTripEdit: false,
				showTripScreen: true,
				currentTrip: parsedResponse
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
// Called as a type of "back" button from the edit screen.
	undoEdit = (e) => {
		this.setState({
			showTripScreen: true,
			showTripEdit: false
		})
	}

	handleAddNote = async (e) => {
		e.preventDefault();
		console.log(this.state.noteToAdd);
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/${this.state.tripToEdit.id}/notesAdd`, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state.noteToAdd.note),
				headers:{
					'Content-Type': 'application/json'
				}
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			console.log(parsedResponse);
			this.setState({
				showNoteAdd: false,
				showTripScreen: false,
			});
		} catch(err) {
			console.log(err);
		}
	}

	deleteTrip = async (e) => {
		e.preventDefault();
		try {
			await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/${this.state.currentTrip.id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.setState({
				trips: this.state.trips.filter(trip => trip.id !== this.state.currentTrip.id),
				showTripScreen: false

			})
		} catch(err) {
			console.log(err);
		}
	}

	
// There are a lot of ternaries just to determine what action the user is taking.
// If they are adding a trip, they shouldn't also be editing a trip and showing a different trip.
	render() {
		return(
			<div id="trip-container">
				{this.state.newTripScreen ? 
					<NewTrip history={this.props.history} addTrip={this.addTrip} hideNewTrip={this.hideNewTrip}/> : 
						<div>
							{this.state.showTripEdit ?
								null :
								<button id='new-trip-button' onClick={this.newTrip}>Make a NewTrip</button>
							}
						</div>
				}
				{this.state.showNoteAdd ? 
					<AddNote handleAddNote={this.handleAddNote} handleNoteChange={this.handleNoteChange}/> : 
					null
				}
				{this.state.showTripScreen ? 
					<div id='trip-nav'>
						<button onClick={this.hideTrip}>Back to List</button>
						<button onClick={this.addNote.bind(null, this.state.currentTrip)}>Add Note</button>
						<button onClick={this.showEditTrip.bind(null, this.state.currentTrip)}>Edit This Trip</button>
						<button onClick={this.deleteTrip}>Delete This Trip</button>
					</div> :
					null
				}
				{this.state.showTripEdit ? 
					<EditTrip undoEdit={this.undoEdit} handleEditFormInput={this.handleEditFormInput} tripToEdit={this.state.tripToEdit} handleTripEditSubmit={this.handleTripEditSubmit}/> : 
					<div>
						{this.state.showTripScreen ? 
							<TripPage currentTrip={this.state.currentTrip} hideTrip={this.hideTrip} deleteTrip={this.deleteTrip} showEditTrip={this.showEditTrip} addNote={this.addNote} deleteNote={this.deleteNote}/> : 
							<TripList trips={this.state.trips} showTrip={this.showTrip} />
						}
					</div>
				}
			</div>

		)
	}
}



export default TripContainer;