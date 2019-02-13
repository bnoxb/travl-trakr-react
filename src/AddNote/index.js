import React from 'react';


const AddNote = (props) => {

	return (
			<div>
				<div>Add Note</div>
				<form onSubmit={props.handleAddNote}>
					<label>Add notes about your trip:</label><br/>
						<textarea name='notes' rows='8' columns='100' onChange={props.handleNoteChange}></textarea>
					<button>Add Notes</button>

				</form>
			</div>
		)
}


export default AddNote;