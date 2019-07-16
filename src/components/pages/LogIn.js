import React, { useState } from 'react';
import axios from 'axios';

const LogIn = () => {
	const [studentId, setStudentId] = useState('');
	const [password, setPassword] = useState('');

	const onChange = e => {
		switch(e.target.name){
			case 'studentId':
				setStudentId(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			default:
				console.log(e.target.name);
		}
	}

	const onSubmit = e => {
		e.preventDefault();

		const credentials = {
			studentId,
			password
		};

		axios.post('/api/account', credentials).then(res => {
			console.log(res);
			setStudentId('');
			setPassword('');
		}, err => {
			setPassword('');
		});
	}

	return (
		<React.Fragment>
			<h1>Log In</h1>
			<form onSubmit={onSubmit}>
				<input type='text' name='studentId' placedholder='' onChange={onChange} value={studentId} />
				<input type='password' name='password' placedholder='' onChange={onChange} value={password} />
				<input type='submit' onClick={onSubmit} />
			</form>
		</React.Fragment>
	)
}

export default LogIn;