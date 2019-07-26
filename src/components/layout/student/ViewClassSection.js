import React, { useState, useEffect } from 'react';
import { Button, Form, Icon, Input, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';

const ViewClassSection = ({ section }) => {
	const [classData, setCLassData] = useState({section: 'Loading'});

	useEffect(() => {
		axios.get(`/api/class/section/${section}`).then(res => {
			console.log(res.data);
			setCLassData(res.data);
		}, err => {
			throw err;
		});
	}, []);

	const openClassSection = e => {
		// setTargetId(subjects[e.target.id].key);
		// setFormTitle('EDIT');

		// setShow(!showForm);
	}

	const onChange = e => {
		// const string = e.target.value;
			
		// switch(e.target.id){
		// 	case 'code':
		// 		setCode(string.toUpperCase());
		// 		break;
		// 	case 'title':
		// 		setTitle(string);
		// 		break;
		// 	default:
		// 		console.log(e.target.id);
		// }
	}

	return (
		<Modal size='tiny' trigger={
			<Button size='mini' floated='right'>
				<Icon name='external alternate' />
				{classData.section}
			</Button>
		}>
			<Modal.Header>
			</Modal.Header>
			<Modal.Content>
				<Segment inverted>
					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<List.Header>
								</List.Header>
							</List.Content>
						</List.Item>
					</List>
				</Segment>
			</Modal.Content>
		</Modal>
	)
}

export default ViewClassSection;