import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Item, Label, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';

const ViewClassSection = ({ title, section }) => {
	const [classData, setCLassData] = useState({section: 'Loading'});
	const [absences, setAbsences] = useState(0);

	useEffect(() => {
		axios.get(`/api/class/section/${section}`).then(res => {
			setAbsences(res.data.absences);


			setCLassData(res.data);
		}, err => {
			throw err;
		});
	}, [section]);

	const addAbsences = () => {
		if(absences < classData.allowable_absences){
			axios.put(`/api/class/section/updateAbsences`, {
				operation: 'add',
				section
			}).then(res => {
				setAbsences(absences + 1);
			}, err => {
				throw err;
			});
		}
	}

	const subAbsences = () => {
		if(absences > 0){
			axios.put(`/api/class/section/updateAbsences`, {
				operation: 'sub',
				section
			}).then(res => {
				setAbsences(absences - 1);
			}, err => {
				throw err;
			});
		}
	}

	return (
		<Modal size='tiny' trigger={
			<Button size='mini' floated='right'>
				<Icon name='external alternate' />
				{classData.section}
			</Button>
		}>
			<Modal.Header>
				{title} {classData.section}
			</Modal.Header>
			<Modal.Content>
				<Segment inverted>
					<Item.Group divided>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '90px' }}>
									TEACHER
								</Label>
								<Header size='small' style={{ color: 'white', paddingLeft: '40px' }}>
									{classData.teacher}
								</Header>
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '90px' }}>
									ABSENCES
								</Label>
								<Header size='tiny' style={{ color: 'white', paddingLeft: '40px', paddingRight: '10px' }}>
									{absences} / {classData.allowable_absences}
								</Header>
								<Button circular size='mini' icon='add' onClick={addAbsences} />
								<Button circular size='mini' icon='minus' onClick={subAbsences} />
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '100px' }}>
									QUIZZES
								</Label>
								<Button circular size='mini' icon='add' />
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '100px' }}>
									ASSIGNMENTS
								</Label>
								<Button circular size='mini' icon='add' />
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '100px' }}>
									EXAMS
								</Label>
								<Button circular size='mini' icon='add' />
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Modal.Content>
		</Modal>
	)
}

export default ViewClassSection;