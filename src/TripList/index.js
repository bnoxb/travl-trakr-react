import React, { Component} from 'react';

class TripList extends Component {
	constructor() {
		super();

		this.state = {

		}
	}

	render() {
		let tripList;
		if(this.props.trips) {
			tripList = this.props.trips.map((trip, i) => {
				return <li key={trip._id}>
						<span>{trip.name}</span><br/>
						<small>{trip.country}</small><br/>
					</li>
				});
		} else {
			tripList = null;
		}
		return(
			<ul>
				{tripList}
			</ul>
		)
	}
}


export default TripList;