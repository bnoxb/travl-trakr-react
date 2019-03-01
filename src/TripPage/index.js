// In the trip container.
import React, { Component } from 'react';
import MapContainer from '../MapContainer';
import Calendar from 'react-calendar';

class TripPage extends Component {
	constructor() {
		super();

		this.state = {
			trip: {},
			yelps: [],
			lat: 0,
			lng: 0,
			loading: true,
			left: null,
			arrived: null,
			yelpResults: '',
			notes: [],
		}
	}

	componentDidMount() {
		this.getNotes();
		this.getYelp();
		this.checkForDate();
	}
// This is needed to make sure the Calendar can load properly. If the dates are in any other format, it throws a lot of errors.
	checkForDate = async () => {
		if(this.props.currentTrip.dateLeft && this.props.currentTrip.dateArrived) {
			const newDateArrived = new Date(this.props.currentTrip.dateArrived);
			const newDateLeft = new Date(this.props.currentTrip.dateLeft);
			await this.setState({
				left: newDateLeft,
				arrived: newDateArrived
			})
		} else if (this.props.currentTrip.dateLeft || this.props.currentTrip.dateArrived) {
			const leftCheck = this.props.currentTrip.dateLeft === null ? 
				new Date(`${this.props.currentTrip.dateArrived}`) : 
				new Date(`${this.props.currentTrip.dateLeft}`);
			const arrivedCheck = this.props.currentTrip.dateArrived === null ? 
				new Date(`${this.props.currentTrip.dateLeft}`) : 
				new Date(`${this.props.currentTrip.dateArrived}`);
			this.setState({
				left: leftCheck,
				arrived: arrivedCheck
			})
		}
	}
	// Random comment to redeploy
	getNotes = async () => {
		console.log(`CHECKING CURRENTTRIP in TRIPPAGE: ${this.props.currentTrip}`);
		try{
			const notesResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/${this.props.currentTrip.id}/notes`);
			if(!notesResponse.ok){
				throw Error(notesResponse.statusText);
			}
			const parsedNotes = await notesResponse.json();
			console.log(parsedNotes);
			this.setState({
				notes: parsedNotes
			})
		}catch(err){
			console.log(err);
			return err;
		}
	}

	deleteNote = async (id, e) => {
		e.preventDefault();
		// const currentNotes = this.state.currentTrip.notes;
		// currentNotes.splice(i, 1);
		try {
			await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/notes/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			// const mappedTrips = this.state.trips.map((trip) => {
			// 	if(trip._id === this.state.currentTrip._id) {
			// 		return parsedResponse.data;
			// 	} else {
			// 		return trip;
			// 	}
			// });
			// this.setState({
			// 	showTripScreen: true,
			// });
			this.getNotes();
		} catch(err) {
			console.log(err);
		}
	}
// Calls the Yelp API to produce suggestions on where to go. Randomly picks from 3 types of results
	getYelp = async () => {
		const random = Math.floor(Math.random() * (3)) + 1;
		let note;
		let response;
		const location = this.props.currentTrip.name + "," + this.props.currentTrip.state + "," + this.props.currentTrip.country;
		try {
			if (random === 3) {
				response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/call/${location}/hot_and_new`, {
					credentials: 'include'
				});
				note = 'What is Hot and New';
			} else if (random === 2) {
				response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/call/${location}/most_reviewed`, {
					credentials: 'include'
				});
				note = 'What is the Most Reviewed';
			} else {
				response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trips/call/${location}/best_match`, {
					credentials: 'include'
				});
				note = 'Best Matches for the Trip';
			}
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			this.setState({
				yelps: parsedResponse.businesses,
				lat: parsedResponse.region.center.latitude,
				lng: parsedResponse.region.center.longitude,
				yelpResults: note,
				loading: false
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	render() {
		// Takes the information from yelp, and makes a list out of it. Links to the yelp page for the business.
		const yelpList = this.state.yelps.map((yelp, i) => {
			return <li key={i}>
				{i + 1}: {yelp.categories[0].title} at <a href={yelp.url} target='_blank' rel='noopener noreferrer'>{yelp.name}</a><br/>
				Rated {yelp.rating} out of 5
			</li>
		})
		//Displays notes made by the user about their trip
		const noteList = this.state.notes.map((note, i) => {
			if(note) {
				return <li key={i}>
					{note.notes}
					<button onClick={this.deleteNote.bind(null, note.id)}>Delete</button>
				</li>
			} else {
				return null
			}
		})
		//Passing the yelp returns into the MapContainer so that the coordinates can be used on the map.
		return(
			<div>
				<h3 id='trip-title'>{this.props.currentTrip.name} {this.props.currentTrip.state}<br/>{this.props.currentTrip.country}</h3>
				<ul id='note-list'>
					{noteList}
				</ul>
				<div id='map-and-calendar'>
					<Calendar value={[this.state.arrived, this.state.left]} />
					{this.state.loading ? 
						null : 
						<div id='map-container'>
							<MapContainer yelps={this.state.yelps} lat={this.state.lat} lng={this.state.lng}/>
						</div>
					}
				</div>

				<h4 id='yelp-title'>{this.state.yelpResults}</h4>
				<ul id='yelp-list'>
					{yelpList}
				</ul>
			</div>
		)
	}
}

export default TripPage;