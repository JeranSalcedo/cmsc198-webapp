import React, { useState } from 'react';
import { Button, Container, Form, Input, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';

const CoursesList = () => {
	const [showAddForm, setShow] = useState(false);

	const [newCode, setCode] = useState('');
	const [newTitle, setTitle] = useState('');

	const onClick = () => {
		// if(showAddForm){
		// 	const newSubject = {
		// 		code: newCode,
		// 		title: newTitle
		// 	}

		// 	axios.post(`/api/subject/new/`, newSubject).then(res => {
		// 		updateSubjectsList();
		// 		setCode('');
		// 		setTitle('');
		// 	}, err => {
		// 		throw err;
		// 	});
		// }

		// setShow(!showAddForm);
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
				VIEW COURSES
			</Button>
		}>
			<Modal.Header>
				Courses
			</Modal.Header>
			<Modal.Content>
				<Segment inverted>
					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<List.Header>
									TOTAL: 
								</List.Header>
								<Button onClick={onClick} floated='right' disabled={false}>
									ADD SUBJECT
								</Button>
							</List.Content>
						</List.Item>
					</List>
				</Segment>
			</Modal.Content>
		</Modal>
	)
}

/*
							{
								showAddForm?
									(
										<List.Item>
											<List.Content>
												<List.Header>
													ADD NEW SUBJECT
												</List.Header>
													<Form inverted>
														<Form.Field required>
															<Input
																id='code'
																label='Code'
																labelPosition='left corner'
																onChange={onChange}
																value={newCode}
															/>
														</Form.Field>
														<Form.Field required>
															<Input
																id='title'
																label='Title'
																labelPosition='left corner'
																onChange={onChange}
																value={newTitle}
															/>
														</Form.Field>
													</Form>
											</List.Content>
										</List.Item>
									)
								: 
									subjects.map(subject =>(
										<List.Item key={subject.key}>
											<List.Content>
												<List.Header>
													{subject.value}
												</List.Header>
												{subject.text}
												<Button size='mini' floated='right'>
													EDIT
												</Button>
											</List.Content>
										</List.Item>
									))
							}*/
export default CoursesList;