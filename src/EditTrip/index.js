// Connects into TripContainer
import React from 'react';


const EditTrip = (props) => {

	return (
			<div id='edit-trip-page'>
				<div>EditTrip</div>
				<form onSubmit={props.handleTripEditSubmit}>
					<input type='text' name='name' onChange={props.handleEditFormInput} value={props.tripToEdit.name}/><br/>
					<input type='text' name='state' onChange={props.handleEditFormInput} value={props.tripToEdit.state}/><br/>
					<input type='text' name='country' onChange={props.handleEditFormInput} value={props.tripToEdit.country}/><br/>
					<label>
						Date of Arrival
						<input type='date' name='dateArrived' onChange={props.handleEditFormInput} value={props.tripToEdit.dateArrived}/>
					</label><br/>
					<label>
						Date Left
						<input type='date' name='dateLeft' onChange={props.handleEditFormInput} value={props.tripToEdit.dateLeft}/>
					</label><br/>
					<button>Edit your trip</button>
				</form>
				<button onClick={props.undoEdit}>Undo Edit</button>
			</div>
		)
}


export default EditTrip;