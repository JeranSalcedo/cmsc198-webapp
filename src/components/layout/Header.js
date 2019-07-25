import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon, Menu, Modal, Sticky } from 'semantic-ui-react';

const Header = ({ route }) => {
	const [logoutPromptVisible, setVisible] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const logOutPrompt = e => {
		setVisible(true);
	}
	
	const closeLogOutPrompt = e => {
		setVisible(false);
	}
	
	const LogOut = e => {
		closeLogOutPrompt();
		localStorage.clear();
		setRedirect(true);
	}

	return (
		<React.Fragment>
			{
				redirect?
					<Redirect to='/login' />
				: null
			}
			<Modal open={logoutPromptVisible} basic size='small'>
				<Modal.Content>
					<p>
						Are you sure you want to log out?
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='grey' name='cancel' onClick={closeLogOutPrompt} inverted>
						CANCEL
					</Button>
					<Button basic color='red' name='delete' onClick={LogOut} inverted>
						<Icon name='remove' /> Log out
					</Button>
				</Modal.Actions>
			</Modal>
			<div>
				<Sticky>
					<Menu fluid attached='top' tabular style={headerStyle} widths='4'>
						<Menu.Item as={Link} to='/'>
							<Icon name='home' />
							Home
						</Menu.Item>
						<Menu.Item as={Link} to={localStorage.getItem('admin') === 'true'? '/users' : '/profile'}>
							<Icon name='user' />
							{localStorage.getItem('admin') === 'true'? 'Users' : 'My Account'}
						</Menu.Item>
						<Menu.Item as={Link} to='/about'>
							<Icon name='info circle' />
							About
						</Menu.Item>
						<Menu.Item as={Button} onClick={logOutPrompt}>
							<Icon name='log out' />
							Log out
						</Menu.Item>
					</Menu>
				</Sticky>
			</div>
		</React.Fragment>
	)
}

const headerStyle = {
	backgroundColor: '#fff',
	paddingTop: '1em'
};

export default Header;