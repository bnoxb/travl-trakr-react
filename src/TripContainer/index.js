import React, { Component } from 'react';
import NewTrip from '../NewTrip';


class TripContainer extends Component {
	constructor() {
		super();

		this.state = {

		}
	}

	render() {
		return(
			<div>
				TripContainer
				<NewTrip />
			</div>

		)
	}
}



export default TripContainer;