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
		this.checkForDate();
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
			const response = await fetch(`http://localhost:9000/api/v1/trips/yelp/${this.props.currentTrip._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			console.log(parsedResponse);
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
				{i + 1}: {yelp.categories[0].title} at <a href={yelp.url} target='_blank' rel='noopener noreferrer'>{yelp.name}</a><br/>
				Rated {yelp.rating} out of 5
			</li>
		})
		const noteList = this.props.currentTrip.notes.map((note, i) => {
			if(note) {
				return <li key={i}>
					>{note}
				</li>
			} else {
				return null
			}
		})
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