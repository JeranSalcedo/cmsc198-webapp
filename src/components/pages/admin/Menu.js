import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Container, Divider, Dropdown, Form, Input, List, Modal, Table } from 'semantic-ui-react';
import axios from 'axios';
import SubjectsList from './SubjectsList';
import ClassesCount from './ClassesCount';

const Menu = () => {
	const [semesters, setSemesters] = useState({});
	const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		updateSemesters();
		updateSubjectsList();
	}, []);

	const updateSemesters = () => {
		axios.get(`/api/semester`).then(res => {
			console.log(res.data);
			setSemesters(res.data);
		}, err => {
			throw err;
		});
	}

	const updateSubjectsList = () => {
		axios.get(`/api/subject`).then(res => {
			console.log(res.data);
			setSubjects(res.data);
		}, err => {
			throw err;
		});
	}

	const onClick = e => {
		const newSemester = {
			year: e.target.id,
			length: semesters[e.target.id].data.length
		}

		axios.post(`/api/semester/new/`, newSemester).then(res => {
			updateSemesters();
		});
	}

	return (
		<React.Fragment>
			<Container align='middle'>
				<SubjectsList subjects={subjects} updateSubjectsList={updateSubjectsList} />
			</Container>
			{
				Object.keys(semesters).reverse().map(year => (
					<Container key={year} text={true} >
						{
							semesters[year].active?
								<Divider horizontal>Current School Year</Divider>
							:
								<Divider />
						}
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
									semesters[year].data.map(semester => (
										<Table.Row key={semester.id} >
											<Table.Cell>
												{semester.title}
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
																					<Form.Field>
																						<Dropdown
																							placeholder='Select Subject'
																							fluid
																							search
																							selection
																							options={subjects}
																						/>
																					</Form.Field>
																					<Form.Field>
																						<Input label='Course Number' toggle />
																					</Form.Field>
																					<Form.Field>
																						<Checkbox label='Finals' toggle />
																					</Form.Field>
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
							</Table.Body>
							{
								semesters[year].data.length < 3?
								(
									<Table.Footer>
										<Table.Row align='middle'>
											<Table.HeaderCell>
												<Button id={year} onClick={onClick} >
													ADD SEMESTER
												</Button>
											</Table.HeaderCell>
										</Table.Row>
									</Table.Footer>
								) : null
							}
						</Table>
					</Container>
				))
			}
		</React.Fragment>
	)
}

export default Menu;