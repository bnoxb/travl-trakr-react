import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const style = {
	width: '40%',
	height: '100%'
}


export class MapContainer extends Component {

	render() {
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
				zoom={4}
				>
				<Marker onClick={this.onMarkerClick}
						name={'Current location'} />
				{yelpsList}
			</Map>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg'
})(MapContainer);