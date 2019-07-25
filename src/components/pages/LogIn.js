import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);

	const onChange = e => {
		switch(e.target.name){
			case 'username':
				setUsername(e.target.value);
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
			username,
			password
		};

		axios.post('/api/login', credentials).then(res => {
			localStorage.setItem('id', res.data.id);
			localStorage.setItem('username', res.data.username);
			localStorage.setItem('firstName', res.data.firstName);
			localStorage.setItem('lastName', res.data.lastName);
			localStorage.setItem('email', res.data.email);
			localStorage.setItem('admin', res.data.admin);

			setUsername('');
			setPassword('');

			setRedirect(true);
		}, err => {
			setPassword('');
		});
	}

	return (
		<React.Fragment>
			{
				redirect?
					<Redirect to='/' />
				: null
			}
			<h1>Log In</h1>
			<form onSubmit={onSubmit}>
				<input type='text' name='username' placedholder='' onChange={onChange} value={username} />
				<input type='password' name='password' placedholder='' onChange={onChange} value={password} />
				<input type='submit' onClick={onSubmit} />
			</form>
		</React.Fragment>
	)
}

export default LogIn;