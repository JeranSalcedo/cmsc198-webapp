import React, { useState } from 'react';
import { Button, Form, Icon, Input, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';

const CoursesList = ({ subjectCode, subjectId }) => {
	const [showForm, setShow] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [formTitle, setFormTitle] = useState('ADD');

	const [courses, setCourses] = useState([]);
	const [targetId, setTargetId] = useState(0);

	const [newNumber, setNumber] = useState('');
	const [newTitle, setTitle] = useState('');

	const updateCourses = () => {
		if(courses.length === 0){
			updateCoursesList();
		}
	}

	const updateCoursesList = () => {
		axios.get(`/api/subject/${subjectId}/course`).then(res => {
			setCourses(res.data);
		}, err => {
			throw err;
		});
	}

	const editCourse = e => {
		setTargetId(courses[e.target.id].key);
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

	const deleteCourse = () => {
		axios.delete(`/api/course/${targetId}`).then(res => {
			updateCoursesList();
		}, err => {
			throw err;
		});
		closeDeleteVal();
	}

	const addCourse = () => {
		if(showForm){
			const newCourse = {
				number: newNumber,
				title: newTitle
			}

			switch(formTitle){
				case 'ADD':
					newCourse.subjectId = subjectId;
					axios.post(`/api/course/new/`, newCourse).then(res => {
						updateCoursesList();
						setNumber('');
						setTitle('');
					}, err => {
						throw err;
					});
					break;
				case 'EDIT':
					newCourse.id = targetId;
					axios.put(`/api/course/edit`, newCourse).then(res => {
						updateCoursesList();
						setNumber('');
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

	const onChange = e => {
		const value = e.target.value;
			
		switch(e.target.id){
			case 'number':
				setNumber(value);
				break;
			case 'title':
				setTitle(value);
				break;
			default:
				console.log(e.target.id);
		}
	}

	return (
		<Modal size='tiny' trigger={
			<Button onClick={updateCourses} size='mini' floated='right'>
				<Icon name='book' />
				VIEW COURSES
			</Button>
		}>
			<Modal open={showDeleteModal} basic size='small'>
				<Modal.Content>
					<p>
						Are you sure you want to delete this course?
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='grey' name='cancel' onClick={closeDeleteVal} inverted>
						CANCEL
					</Button>
					<Button basic color='red' name='delete' onClick={deleteCourse} inverted>
						<Icon name='remove' /> DELETE
					</Button>
				</Modal.Actions>
			</Modal>
			<Modal.Header>
				Courses
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
											TOTAL : {courses.length}
										</List.Header>
									)
									: null
								}
								<Button onClick={addCourse} floated='right' disabled={false}>
									{formTitle} COURSE
								</Button>
							</List.Content>
						</List.Item>
						{
							showForm?
								(
									<List.Item>
										<List.Content>
											<List.Header>
												{formTitle} COURSE
											</List.Header>
												<Form inverted>
													<Form.Field required>
														<Input
															id='number'
															label='Course Number'
															labelPosition='left corner'
															onChange={onChange}
															value={newNumber}
															type='number'
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
							: courses.map((course, ind) =>(
								<List.Item key={course.key}>
									<List.Content>
										<List.Header>
											{subjectCode} {course.value}
										</List.Header>
										{course.text}
										<Button icon size='mini' floated='right' id={course.key} onClick={openDeleteVal}>
											<Icon id={course.key} name='close' />
										</Button>
										<Button icon size='mini' floated='right' id={ind} onClick={editCourse}>
											<Icon id={ind} name='edit' />
										</Button>
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

export default CoursesList;