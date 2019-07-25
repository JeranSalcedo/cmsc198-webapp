import React, { useState } from 'react';
import { Button, Form, Icon, Input, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';
import CoursesList from './CoursesList';

const SubjectsList = ({ subjects, updateSubjectsList }) => {
	const [showForm, setShow] = useState(false);
	const [formTitle, setFormTitle] = useState('ADD');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [targetId, setTargetId] = useState(0);

	const [newCode, setCode] = useState('');
	const [newTitle, setTitle] = useState('');

	const addSubject = () => {
		if(showForm){
			const newSubject = {
				code: newCode,
				title: newTitle
			}

			switch(formTitle){
				case 'ADD':
					axios.post(`/api/subject/new`, newSubject).then(res => {
						updateSubjectsList();
						setCode('');
						setTitle('');
					}, err => {
						throw err;
					});
					break;
				case 'EDIT':
					newSubject.id = targetId;
					axios.put(`/api/subject/edit`, newSubject).then(res => {
						updateSubjectsList();
						setCode('');
						setTitle('');
					}, err => {
						throw err;
					});
					break;
				default:
					console.log(formTitle);
			}
		}
		setFormTitle('ADD');

		setShow(!showForm);
	}

	const editSubject = e => {
		setTargetId(subjects[e.target.id].key);
		setFormTitle('EDIT');

		setShow(!showForm);
	}

	const openDeleteVal = e => {
		setTargetId(e.target.id);
		setShowDeleteModal(true);
	}

	const closeDeleteVal = () => {
		setShowDeleteModal(false);
	}

	const deleteSubject = () => {
		axios.delete(`/api/subject/${targetId}`).then(res => {
			updateSubjectsList();
		}, err => {
			throw err;
		});
		closeDeleteVal();
	}

	const onChange = e => {
		const string = e.target.value;
			
		switch(e.target.id){
			case 'code':
				setCode(string.toUpperCase());
				break;
			case 'title':
				setTitle(string);
				break;
			default:
				console.log(e.target.id);
		}
	}

	return (
		<Modal size='tiny' trigger={
			<Button>
				VIEW SUBJECTS
			</Button>
		}>
			<Modal open={showDeleteModal} basic size='small'>
				<Modal.Content>
					<p>
						Are you sure you want to delete this subject?
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='grey' name='cancel' onClick={closeDeleteVal} inverted>
						CANCEL
					</Button>
					<Button basic color='red' name='delete' onClick={deleteSubject} inverted>
						<Icon name='remove' /> DELETE
					</Button>
				</Modal.Actions>
			</Modal>
			<Modal.Header>
				Subjects
			</Modal.Header>
			<Modal.Content>
				<Segment inverted>
					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								{
									!showForm?
									(
										<List.Header>
											TOTAL : {subjects.length}
										</List.Header>
									)
									: null
								}
								<Button icon onClick={addSubject} floated='right' disabled={false}>
									{formTitle} SUBJECT
								</Button>
							</List.Content>
						</List.Item>
						{
							showForm?
								(
									<List.Item>
										<List.Content>
											<List.Header>
												{formTitle} SUBJECT
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
								subjects.map((subject, ind) =>(
									<List.Item key={subject.key}>
										<List.Content>
											<List.Header>
												{subject.value}
											</List.Header>
											{subject.text}
											<Button icon size='mini' floated='right' id={subject.key} onClick={openDeleteVal}>
												<Icon id={subject.key} name='close' />
											</Button>
											<Button icon size='mini' floated='right' id={ind} onClick={editSubject}>
												<Icon id={ind} name='edit' />
											</Button>
											<CoursesList subjectCode={subject.value} subjectId={subject.key} />
										</List.Content>
									</List.Item>
								))
						}
					</List>
				</Segment>
			</Modal.Content>
		</Modal>
	)
}

export default SubjectsList;