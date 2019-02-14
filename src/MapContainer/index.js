import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


const style = {
	width: '100%',
	height: '100%'
}


export class MapContainer extends Component {

	render() {
		const yelpsList = this.props.yelps.map((yelp, i) => {
			return <Marker 
						key= {i}
						position={{
							lng: yelp.coordinates.longitude,
							lat: yelp.coordinates.latitude
						}}
						icon={{
							url: `mapicons/number_${i + 1}.png`
						}}
					/>
		});
		return (
			<div id="map" style={{width: '100%', height: '50vh', position: 'relative', 'marginLeft': 'auto', display: 'flex', 'flexDirection': 'column'}}>
				<Map
					google={this.props.google}
					style={style}
					zoom={10}
					initialCenter={{
						lat: this.props.lat,
						lng: this.props.lng
					}}
					>

					{yelpsList}
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(MapContainer);