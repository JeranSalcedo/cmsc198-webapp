import React from 'react';
import { Button, Container, Divider, Icon, List, Table } from 'semantic-ui-react';
import axios from 'axios';
import AddClass from './student/AddClass';
import ViewClasses from './student/ViewClasses';

const Menu = ({
	semesters, updateSemesters,
	subjects
}) => {
	const onClick = e => {
		const newSemester = {
			year: e.target.id,
			length: semesters[e.target.id].data.length
		}

		axios.post(`/api/semester/new/`, newSemester).then(res => {
			updateSemesters();
		});
	}

	return Object.keys(semesters).reverse().map(year => (
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
							<Icon name='calendar alternate outline' />
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
												<ViewClasses />
												{
													localStorage.getItem('admin') === 'false' && semester.active?
														<AddClass subjects={subjects} />
													: null
												}
											</List.Content>
										</List.Item>
									</List>
								</Table.Cell>
							</Table.Row>
						))
					}
				</Table.Body>
				{
					localStorage.getItem('admin') === 'true' && semesters[year].data.length < 3?
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

export default Menu;