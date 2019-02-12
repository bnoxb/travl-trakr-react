import React from 'react';

const TripList = (props) => {

	const tripList = props.trips.map((trip, i) => {
		return <li key={trip._id}>
				{trip.name}<br/>
				{trip.country}<br/>
				<button onClick={props.showTrip.bind(null, trip)}>Show</button>
			</li>
	});
	return(
		<div>
			<ul>
				{tripList}
			</ul>
		</div>
	)
}


export default TripList;