import React, { useState } from 'react';
import { Button, Checkbox, Container, Dropdown, Icon, Input, Form, Label, Modal, Pagination, Popup } from 'semantic-ui-react';
import axios from 'axios';

const AddClass = ({ semesterId, subjects }) => {
	const [openModal, setOpen] = useState(false);
	const [currentPage, setPage] = useState(1);

	const [smallClass, setSmallClass] = useState(true);

	const [selectedSubject, setSelectedSubject] = useState('Select Subject');
	const [selectedCourse, setSelectedCourse] = useState('Select Course');

	const [courses, setCourses] = useState([]);
	const [courseId, setCourse] = useState(0);
	const [finals, setFinals] = useState(true);
	const [required, setRequired] = useState(false);
	const [percentageFinals, setPercentageFinals] = useState(20);
	const [exemption, setExemption] = useState('');
	const [passing, setPassing] = useState('');

	const [sectionLecture, setSectionLecture] = useState('');
	const [lecturer, setLecturer] = useState('');
	const [maxAbsencesLecture, setMaxAbsencesLecture] = useState('');
	const [percentageLecture, setPercentageLecture] = useState(50);

	const [sectionSmall, setSectionSmall] = useState('');
	const [instructor, setInstructor] = useState('');
	const [maxAbsencesSmall, setMaxAbsencesSmall] = useState('');
	const [percentageSmall, setPercentageSmall] = useState(50);

	const [recit, setRecit] = useState(true);

	const resetState = () => {
		setSelectedSubject('Select Subject');
		setSelectedCourse('Select Course');
		setPage(1);
		setSmallClass(true);
		setCourses([]);
		setCourse(0);
		setFinals(true);
		setRequired(false);
		setPercentageFinals(20);
		setExemption('');
		setPassing('');
		setSectionLecture('');
		setLecturer('');
		setRecit(true);
		setMaxAbsencesLecture('');
		setPercentageLecture(50);
		setSectionSmall('');
		setInstructor('');
		setMaxAbsencesSmall('');
		setPercentageSmall(50);
		setOpen(false);
	}

	const open = () => {
		setOpen(true);
	}

	const updateCoursesList = (e, data) => {
		const subject = data.options.find(opt => (
			opt.value === data.value
		));
		const subjectId = subject.key;

		setSelectedSubject(subject.text);

		axios.get(`/api/subject/${subjectId}/course`).then(res => {
			res.data.forEach(data => {
				data.text = data.value + ': ' + data.text;
			});

			setCourses(res.data);
		}, err => {
			throw err;
		});
	}

	const updateCourseId = (e, data) => {
		const course = data.options.find(opt => (
			opt.value === data.value
		));
		const courseId = course.key;

		setSelectedCourse(course.text)
		setCourse(courseId);
	}

	const toggleFinals = () => {
		setFinals(!finals);
		setRequired(false);
	} 

	const toggleRequired = () => {
		setRequired(!required);
	} 

	const onPageChange = (e, { activePage }) => {
		setPage(activePage);
	}

	const toggleSmallClass = () => {
		setPercentageLecture(smallClass? 100 : 50);
		setPercentageSmall(smallClass? 0 : 50);
		setSmallClass(!smallClass);
	}

	const radioChange = (e, { value }) => {
		setRecit(value === 'rec');
	}

	const onChange = e => {
		switch(e.target.id){
			case 'percentageFinals':
				if(e.target.value > -1 && e.target.value < 101){
					setPercentageFinals(e.target.value);
				}
				break;
			case 'exemption':
				setExemption(e.target.value);
				break;
			case 'passing':
				setPassing(e.target.value);
				break;
			case 'sectionLecture':
				setSectionLecture(e.target.value);
				break;
			case 'lecturer':
				setLecturer(e.target.value);
				break;
			case 'maxAbsencesLecture':
				setMaxAbsencesLecture(e.target.value);
				break;
			case 'sectionSmall':
				setSectionSmall(e.target.value);
				break;
			case 'instructor':
				setInstructor(e.target.value);
				break;
			case 'maxAbsencesSmall':
				setMaxAbsencesSmall(e.target.value);
				break;
			case 'percentageLecture':
				if(e.target.value > -1 && e.target.value < 101){
					setPercentageLecture(e.target.value);
					setPercentageSmall(100 - e.target.value);
				}
				break;
			case 'percentageSmall':
				if(e.target.value > -1 && e.target.value < 101){
					setPercentageLecture(100 - e.target.value);
					setPercentageSmall(e.target.value);
				}
				break;
			default:
				console.log(e.target.id);
		}
	}

	const submit = () => {
		const data = {
			userId: localStorage.getItem('id'),
			semesterId,
			courseId,
			finals,
			required,
			percentageFinals,
			exemption,
			passing,
			sectionLecture,
			lecturer,
			maxAbsencesLecture,
			percentageLecture,
			smallClass,
			recit,
			sectionSmall,
			instructor,
			maxAbsencesSmall,
			percentageSmall
		};

		axios.post(`/api/class/new`, data).then(res => {
			resetState();
			setOpen(false);
		}, err => {
			throw err;
		});
	}

	return (
		<React.Fragment>
			<Button size='mini' onClick={open} >
				<Icon name='add' />
				ADD CLASS
			</Button>
			<Modal open={openModal} closeOnDimmerClick onClose={resetState} >
				<Modal.Header>
					Add Class
				</Modal.Header>
				<Modal.Content>
					{
						currentPage === 1?
							(
								<Form>
									<Form.Field>
										<Label horizontal>
											Subject
										</Label>
										<Dropdown
											placeholder={selectedSubject}
											fluid
											search
											selection
											options={subjects}
											onChange={updateCoursesList}
										/>
									</Form.Field>
									<Form.Field>
										<Label horizontal>
											Course
										</Label>
										<Dropdown
											placeholder={selectedCourse}
											fluid
											search
											selection
											options={courses}
											onChange={updateCourseId}
										/>
									</Form.Field>
									<Form.Field>
										<Popup content='Does this class have a final exam?' trigger={
											<Checkbox checked={finals} onChange={toggleFinals} label='Finals' toggle />
										} />
									</Form.Field>
									{
										finals?	
											(
												<React.Fragment>
													<Form.Field>
														<Popup content='Is the final exam required regardless of prefinal percentage?' trigger={
															<Checkbox checked={required} onChange={toggleRequired} label='Required' toggle />
														} />
													</Form.Field>
													<Form.Field>
														<Input
															id='percentageFinals'
															label='Finals Percent'
															labelPosition='left corner'
															type='number'
															onChange={onChange}
															value={percentageFinals}
														/>
													</Form.Field>
													{
														required?
															null
														:
															(
																<Form.Field>
																<Popup content='Prefinal grade required to get exmpted from the final exam' trigger={
																	<Input
																		id='exemption'
																		label='Exemption'
																		labelPosition='left corner'
																		type='number'
																		onChange={onChange}
																		value={exemption}
																	/>
																} />
																</Form.Field>
															)
													}
												</React.Fragment>
											)
										: null
									}
									<Form.Field>
										<Input
											id='passing'
											label='Passing'
											labelPosition='left corner'
											type='number'
											onChange={onChange}
											value={passing}
										/>
									</Form.Field>
								</Form>
							)
						: currentPage === 2?
							(
								<Form>
									<Form.Field>
										<Input
											id='sectionLecture'
											label='Section'
											labelPosition='left corner'
											type='text'
											onChange={onChange}
											value={sectionLecture}
										/>
									</Form.Field>
									<Form.Field>
										<Input
											id='lecturer'
											label='Lecturer'
											labelPosition='left corner'
											type='text'
											onChange={onChange}
											value={lecturer}
										/>
									</Form.Field>
									<Form.Field>
										<Input
											id='maxAbsencesLecture'
											label='Number of Allowable Absences'
											labelPosition='left corner'
											type='number'
											onChange={onChange}
											value={maxAbsencesLecture}
										/>
									</Form.Field>
									{
										smallClass?
											(
												<Form.Field>
													<Input
														id='percentageLecture'
														label='Lecture Percent'
														labelPosition='left corner'
														type='number'
														onChange={onChange}
														value={percentageLecture}
													/>
												</Form.Field>
											)
										: null
									}
								</Form>
							)
						: 
							(
								<Form>
									<Form.Field>
										<Popup content='Has a Recitation/Laboratory class?' trigger={
											<Checkbox checked={smallClass} onChange={toggleSmallClass} toggle />
										} />
									</Form.Field>
									{
										smallClass?
											(
												<React.Fragment>
													<Form.Field>
														<Checkbox
															radio
															label='Recitation'
															value='rec'
															checked={recit}
															onChange={radioChange}
														/>
													</Form.Field>
													<Form.Field>
														<Checkbox
															radio
															label='Laboratory'
															value='lab'
															checked={!recit}
															onChange={radioChange}
														/>
													</Form.Field>
													<Form.Field>
														<Input
															id='sectionSmall'
															label='Section'
															labelPosition='left corner'
															type='text'
															onChange={onChange}
															value={sectionSmall}
														/>
													</Form.Field>
													<Form.Field>
														<Input
															id='instructor'
															label='Instructor'
															labelPosition='left corner'
															type='text'
															onChange={onChange}
															value={instructor}
														/>
													</Form.Field>
													<Form.Field>
														<Input
															id='maxAbsencesSmall'
															label='Number of Allowable Absences'
															labelPosition='left corner'
															type='number'
															onChange={onChange}
															value={maxAbsencesSmall}
														/>
													</Form.Field>
													<Form.Field>
														<Input
															id='percentageSmall'
															label={(recit? 'Recitation' : 'Laboratory') + ' Percent'}
															labelPosition='left corner'
															type='number'
															onChange={onChange}
															value={percentageSmall}
														/>
													</Form.Field>
												</React.Fragment>
											)
										: null
									}
								</Form>
							)

					}
					<Container align='middle' style={{ paddingTop: '1em' }}>
						<Pagination
							defaultActivePage={1}
							totalPages={3}
							firstItem={null}
							lastItem={null}
							prevItem={null}
							nextItem={null}
							onPageChange={onPageChange}
						/>
					</Container>
					<Container align='middle' style={{ paddingTop: '1em' }}>
						<Button onClick={submit} size='small'>
							<Icon name='add' />
							ADD CLASS
						</Button>
					</Container>
				</Modal.Content>	
			</Modal>
		</React.Fragment>
	)
}

export default AddClass;