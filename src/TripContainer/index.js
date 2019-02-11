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
				<NewTrip history={this.props.history}/>
			</div>

		)
	}
}



export default TripContainer;