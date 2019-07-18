import React, { useState, useEffect } from 'react';
import { Button, Container, Form, List, Modal, Table } from 'semantic-ui-react';
import axios from 'axios';
import SubjectsList from './SubjectsList';
import ClassesCount from './ClassesCount';

const AdminMenu = () => {
	const [semesters, setSemesters] = useState({});

	useEffect(() => {
		updateSemesters();
	}, []);

	const updateSemesters = () => {
		axios.get(`/api/semester`).then(res => {
			console.log(res);
			setSemesters(res.data);
		}, err => {
			throw err;
		});
	}

	const onClick = e => {
		axios.post(`/api/semester/new/${e.target.id}/${semesters[e.target.id].length}`).then(res => {
			updateSemesters();
		});
	}

	return (
		<React.Fragment>
			<SubjectsList />
			{
				Object.keys(semesters).reverse().map(year => (
					<Container key={year} >
						<Table inverted>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										{year - 1} - {year}
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{
									semesters[year].map(semester => (
										<Table.Row key={semester.id} >
											<Table.Cell>
												{semester.title}
											</Table.Cell>
											<Table.Cell>
												<List divided verticalAlign='middle'>
													<List.Item>
														<List.Content floated='right'>
															{
																semester.active?
																	(
																		<Modal trigger={
																			<Button>
																				ADD CLASS
																			</Button>
																		}>
																			<Modal.Header>
																				Add Class
																			</Modal.Header>
																			<Modal.Content>
																				<Form>
																					<Form.Group widths='equal'>
																						<Form.Input
																							fluid
																							id='subject'
																							label='Subject'
																						/>
																					</Form.Group>
																				</Form>
																			</Modal.Content>
																		</Modal>
																	)
																: null
															}		
														</List.Content>
														<List.Content floated='left'>
															<ClassesCount semester={semester.id} />
														</List.Content>
													</List.Item>
												</List>
											</Table.Cell>
										</Table.Row>
									))
								}
								<Table.Row align='middle'>
									<Table.Cell>
										{
											semesters[year].length < 3?
											(
												<Button id={year} onClick={onClick} >
													ADD SEMESTER
												</Button>
											) : null
										}
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Container>
				))
			}
		</React.Fragment>
	)
}

export default AdminMenu;