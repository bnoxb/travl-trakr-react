import React, { Component } from 'react';
import MapContainer from '../MapContainer';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class TripPage extends Component {
	constructor() {
		super();

		this.state = {
			trip: {},
			yelps: []
		}
	}

	componentDidMount(){
		this.getYelp();
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
			console.log(parsedResponse, ' PARSED RESPONSE');
			this.setState({
				yelps: parsedResponse.data.jsonBody.businesses
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	getGoogleMap = async () => {
		try {

		} catch(err) {

		}
	}

	render() {
		const yelpList = this.state.yelps.map((yelp, i) => {
			return <li key={i}>
				{yelp.name}
			</li>
		})
		return(
			<div>
				<h1>SHOW TRIP</h1>
				<h3>{this.props.currentTrip.name}</h3>
				<button onClick={this.props.hideTrip}>Back to List</button>
				<ul>
					{yelpList}
				</ul>
				<MapContainer yelps={this.state.yelps}/>
			</div>


		)
	}
}

export default TripPage;