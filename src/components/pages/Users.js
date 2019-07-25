import React, { useState, useEffect } from 'react';
import { Button, Container, Icon, Table } from 'semantic-ui-react';
import axios from 'axios';

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get(`/api/user`).then(res => {
			setUsers(res.data);
		}, err => {
			throw err;
		});
	}, []);

	return (
		<React.Fragment>
			<Container align='middle'>
				<Table inverted>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								<Icon name='user circle' />
								Manage Users
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<Button size='mini'>
									<Icon name='user add' />
									ADD USER
								</Button>
							</Table.Cell>
						</Table.Row>
						{
							users.map(user => (
								<Table.Row key={user.id} >
									<Table.Cell>
										{user.username}
										<Button floated='right' icon='user times' size='mini' />
										<Button floated='right' icon='edit' size='mini' />
									</Table.Cell>
								</Table.Row>
							))
						}
					</Table.Body>
				</Table>
			</Container>
		</React.Fragment>
	)
}

export default Users;