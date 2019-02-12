import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const style = {
	width: '100%',
	height: '50%'
}


export class MapContainer extends Component {

	render() {
		console.log(this.props.lat);
		const yelpsList = this.props.yelps.map((yelp, i) => {
			let iconUrl;
			return <Marker 
						key= {i}
						position={{
							lng: yelp.coordinates.longitude,
							lat: yelp.coordinates.latitude
						}}
					/>
		});
		return (

			<Map
				google={this.props.google}
				style={style}
				zoom={10}
				initialCenter={{
					lat: this.props.lat,
					lng: this.props.lng
				}}
				>
				<Marker onClick={this.onMarkerClick}
						name={'Current location'} />
				{yelpsList}
			</Map>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDVsJgiL0yPXQQJWNQztdG2YJYzROdZ8Mg'
})(MapContainer);