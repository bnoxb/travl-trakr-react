import React from 'react';

const TripList = (props) => {

	const tripList = props.trips.map((trip, i) => {
		return <li key={trip._id}>
				{trip.name} {trip.state}<br/>
				{trip.country}<br/>
				<button onClick={props.showTrip.bind(null, trip)}>Show</button><br/>
			</li>
	});
	return(
		<div>
			<h3 id='your-trips'>Your Trips</h3>
			<ul id='trip-list'>
				{tripList}
			</ul>
		</div>
	)
}


export default TripList;