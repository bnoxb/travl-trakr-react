// Connects into UserContainer
import React from 'react';


const EditUser = (props) => {

	return (
			<div className='user-page edit-user-page'>
				<div>Edit User</div>
				<form id='edit-user-form' onSubmit={props.handleUserEditSubmit}>
					<input type='text' name='username' onChange={props.handleEditFormInput} value={props.userToEdit.username}/><br/>
					<input type='password' name='password' onChange={props.handleEditFormInput}/><br/>
					<input type='text' name='email' onChange={props.handleEditFormInput} value={props.userToEdit.email}/><br/>
					<button>Edit yourself</button>

				</form>
			</div>
		)
}


export default EditUser;