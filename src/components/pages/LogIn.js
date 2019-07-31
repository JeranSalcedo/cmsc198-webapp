import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Icon, Input, Form } from 'semantic-ui-react';
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
			<Container align='middle' style={{
				margin: '0',
				position: 'absolute',
				top: '25%',
				left: '25%',
				transform: 'translate(-25%, -25%)'
			}}>
				<h1>Log In</h1>
				<Form style={{
					width: '500px'
				}}>
					<Form.Field>
						<Input label='STUDENT ID' size='small' type='text' name='username' placedholder='' onChange={onChange} value={username} />
					</Form.Field>
					<Form.Field>
						<Input label='PASSWORD' size='small' type='password' name='password' placedholder='' onChange={onChange} value={password} />
					</Form.Field>
					<Form.Field>
		    			<Button type='submit' onClick={onSubmit}>
		    				<Icon name='sign in' />
		    				SIGN IN
		    			</Button>
					</Form.Field>
				</Form>
			</Container>
		</React.Fragment>
	)
}

export default LogIn;