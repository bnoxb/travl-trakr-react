import React from 'react';


const AddNote = (props) => {

	return (
			<div>
				<div>Add Note</div>
				<form onSubmit={props.handleAddNote}>
					<textarea name='notes' onChange={props.handleNoteChange}></textarea>
					<button>Add Note</button>
				</form>
			</div>
		)
}


export default AddNote;