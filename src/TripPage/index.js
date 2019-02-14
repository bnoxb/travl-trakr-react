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
			arrived: null
		}
	}

	componentDidMount() {
		this.getYelp();
		this.checkForDate();
	}
// This is needed to make sure the Calendar can load properly. If the dates are in any other format, it throws a lot of errors.
	checkForDate() {
		if(this.props.currentTrip.dateLeft && this.props.currentTrip.dateArrived) {
			this.setState({
				left: new Date(`${this.props.currentTrip.dateLeft}`),
				arrived: new Date(`${this.props.currentTrip.dateArrived}`)
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
// Calls the Yelp API to produce suggestions on where to go.
	getYelp = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_ROUTE}api/v1/trips/yelp/${this.props.currentTrip._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			this.setState({
				yelps: parsedResponse.data.jsonBody.businesses,
				lat: parsedResponse.data.jsonBody.region.center.latitude,
				lng: parsedResponse.data.jsonBody.region.center.longitude,
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
		// Displays notes made by the user about their trip
		const noteList = this.props.currentTrip.notes.map((note, i) => {
			if(note) {
				return <li key={i}>
					>{note}
				</li>
			} else {
				return null
			}
		})
		// Passing the yelp returns into the MapContainer so that the coordinates can be used on the map.
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

				<h4 id='yelp-title'>What is Hot and New?</h4>
				<ul id='yelp-list'>
					{yelpList}
				</ul>
			</div>
		)
	}
}

export default TripPage;