import React, { Component } from 'react';
import MapContainer from '../MapContainer';
import Calendar from 'react-calendar';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
	}
// This is needed to make sure the Calendar can load properly
	checkForDate() {
		if (this.props.currentTrip.dateArrived && this.props.currentTrip.dateArrived) {
			this.setState({
				left: new Date(`${this.props.currentTrip.dateLeft}`),
				arrived: new Date(`${this.props.currentTrip.dateArrived}`)
			})
		}
	}

	getYelp = async () => {
		try {
			const response = await fetch(`http://localhost:9000/trips/yelp/${this.props.currentTrip._id}`, {
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
		const yelpList = this.state.yelps.map((yelp, i) => {
			return <li key={i}>
				{i + 1} {yelp.name}
			</li>
		})
		return(
			<div>
				<h1>SHOW TRIP</h1>
				<h3>{this.props.currentTrip.name}</h3>
				<p>{this.props.currentTrip.state}</p>
				<p>{this.props.currentTrip.country}</p>
				<p>{this.props.currentTrip.notes}</p>
				<Calendar value={[this.state.arrived, this.state.left]} />
				<ul>
					{yelpList}
				</ul>
				<button onClick={this.props.hideTrip}>Back to List</button>
			
				<button onClick={this.props.deleteTrip}>DELETE THIS TRIP</button>
		
				{this.state.loading ? null : <MapContainer yelps={this.state.yelps} lat={this.state.lat} lng={this.state.lng}/>}

			</div>


		)
	}
}

export default TripPage;