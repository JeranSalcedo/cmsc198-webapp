import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
// import axios from 'axios';

const Profile = () => {
	return (
		<Segment inverted>
			<Form inverted>
			<Form.Group widths='equal'>
				<Form.Input fluid label='First Name' value={localStorage.getItem('firstName')} disabled />
				<Form.Input fluid label='Last Name' value={localStorage.getItem('lastName')} disabled />
				<Form.Input fluid label='Student Id' value={localStorage.getItem('username')} disabled />
				<Form.Input fluid label='Email' value={localStorage.getItem('email')} disabled />
			</Form.Group>
			</Form>
		</Segment>
	)
}

export default Profile;