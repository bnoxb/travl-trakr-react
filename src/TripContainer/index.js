import React, { Component } from 'react';
import NewTrip from '../NewTrip';
import TripPage from '../TripPage';


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
				<TripPage />
			</div>

		)
	}
}



export default TripContainer;