import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Input, Item, Label, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';

const ViewClassSection = ({ title, section, active }) => {
	const [classData, setCLassData] = useState({section: 'Loading'});
	const [absences, setAbsences] = useState(0);
	const [standing, setStanding] = useState(0);

	const [showEditQuiz, setShowEditQuiz] = useState(false);
	const [quizPercentageText, setQuizPercentageText] = useState(1);
	const [quizPercentage, setQuizPercentage] = useState(0);

	const [assignmentPercentage, setAssignmentPercentage] = useState(0);
	const [examPercentage, setExamPercentage] = useState(0);

	const [quizzes, setQuizzes] = useState([]);
	const [assignments, setAssignments] = useState([]);
	const [exams, setExams] = useState([]);

	const [showQuizForm, setShowQuizForm] = useState(false);
	const [quizTitle, setQuizTitle] = useState('');
	const [quizScore, setQuizScore] = useState(0);
	const [quizTotal, setQuizTotal] = useState(1);

	const [showAssignmentForm, setShowAssignmentForm] = useState(false);
	const [assignmentTitle, setAssignmentTitle] = useState('');
	const [assignmentScore, setAssignmentScore] = useState(0);
	const [assignmentTotal, setAssignmentTotal] = useState(1);

	const [showExamForm, setShowExamForm] = useState(false);
	const [examTitle, setExamTitle] = useState('');
	const [examScore, setExamScore] = useState(0);
	const [examTotal, setExamTotal] = useState(1);

	useEffect(() => {
		axios.get(`/api/class/section/${section}`).then(res => {
			setAbsences(res.data.absences);
			setStanding(res.data.standing);
			setQuizPercentage(res.data.percentage_quiz);
			setAssignmentPercentage(res.data.percentage_assignment);
			setExamPercentage(res.data.percentage_exam);

			setCLassData(res.data);
		}, err => {
			throw err;
		});
	}, [section]);

	const loadData = () => {
		axios.get(`/api/class/section/${section}/classWork`).then(res => {	
			setQuizzes(res.data[0]);
			setAssignments(res.data[1]);
			setExams(res.data[2]);
		}, err => {
			throw err;
		});
	}

	const addAbsences = () => {
		axios.put(`/api/class/section/updateAbsences`, {
			operation: 'add',
			section
		}).then(res => {
			setAbsences(absences + 1);
		}, err => {
			throw err;
		});
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

	const openQuizForm = e => {
		setQuizTitle('Quiz Title');
		setShowQuizForm(true);
	}

	const closeQuizForm = () => {
		setShowQuizForm(false);
	}

	const openAssignmentForm = () => {
		setAssignmentTitle('Assignment Title');
		setShowAssignmentForm(true);
	}

	const closeAssignmentForm = () => {
		setShowAssignmentForm(false);
	}

	const openExamForm = () => {
		setExamTitle('Exam Title');
		setShowExamForm(true);
	}

	const closeExamForm = () => {
		setShowExamForm(false);
	}

	const updateQuizTitle = e => {
		setQuizTitle(e.target.value);
	}

	const updateQuizScore = e => {
		if(e.target.value > -1 && e.target.value <= parseInt(quizTotal)){
			setQuizScore(e.target.value);
		}
	}

	const updateQuizTotal = e => {
		if(e.target.value > 0){
			setQuizTotal(e.target.value);
		}
	}

	const updateAssignmentTitle = e => {
		setAssignmentTitle(e.target.value);
	}

	const updateAssignmentScore = e => {
		if(e.target.value > -1 && e.target.value <= parseInt(assignmentTotal)){
			setAssignmentScore(e.target.value);
		}
	}

	const updateAssignmentTotal = e => {
		if(e.target.value > 0){
			setAssignmentTotal(e.target.value);
		}
	}

	const updateExamTitle = e => {
		setExamTitle(e.target.value);
	}

	const updateExamScore = e => {
		if(e.target.value > -1 && e.target.value <= parseInt(examTotal)){
			setExamScore(e.target.value);
		}
	}

	const updateExamTotal = e => {
		if(e.target.value > 0){
			setExamTotal(e.target.value);
		}
	}

	const updateQuizPercentage = e => {
		if(e.target.value > -1 && e.target.value < 101){
			setQuizPercentageText(e.target.value);
		}
	}

	const editQuizPercentage = () => {
		if(showEditQuiz){
			const data = {
				section,
				percentage: quizPercentageText
			}

			axios.put(`api/class/section/quiz/percentage/edit`, data).then(res => {
				console.log(res);
				// setQuizPercentage(quizPercentageText);
			}, err => {
				throw err;
			});
		}

		setShowEditQuiz(!showEditQuiz);
	}

	const submitQuiz = () => {
		if(quizTotal > 0){
			const data = {
				section,
				title: quizTitle,
				score: quizScore,
				total: quizTotal
			}

			axios.post(`api/class/section/quiz/new`, data).then(res => {
				setQuizScore(0);
				setQuizTotal(0);
				setShowQuizForm(false);

				updateQuizzes();
			}, err => {
				throw err;
			});
		}
	}

	const submitAssignment = () => {
		if(assignmentTotal > 0){
			const data = {
				section,
				title: assignmentTitle,
				score: assignmentScore,
				total: assignmentTotal
			}

			axios.post(`api/class/section/assignment/new`, data).then(res => {
				setAssignmentScore(0);
				setAssignmentTotal(0);
				setShowAssignmentForm(false);

				updateAssignments();
			}, err => {
				throw err;
			});
		}
	}

	const submitExam = () => {
		if(examTotal > 0){
			const data = {
				section,
				title: examTitle,
				score: examScore,
				total: examTotal
			}

			axios.post(`api/class/section/exam/new`, data).then(res => {
				setExamScore(0);
				setExamTotal(0);
				setShowExamForm(false);

				updateExams();
			}, err => {
				throw err;
			});
		}
	}

	const updateQuizzes = () => {
		axios.get(`api/class/section/${section}/quiz`).then(res => {
			setQuizzes(res.data);
		}, err => {
			throw err;
		});
	}

	const updateAssignments = () => {
		axios.get(`api/class/section/${section}/assignment`).then(res => {
			setAssignments(res.data);
		}, err => {
			throw err;
		});
	}

	const updateExams = () => {
		axios.get(`api/class/section/${section}/exam`).then(res => {
			setExams(res.data);
		}, err => {
			throw err;
		});
	}

	return (
		<Modal size='tiny' trigger={
			<Button size='mini' floated='right' onClick={loadData}>
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
								{
									active?
										(
											<React.Fragment>
												<Button circular size='mini' icon='add' onClick={addAbsences} />
												<Button circular size='mini' icon='minus' onClick={subAbsences} />
											</React.Fragment>
										)
									: null
								}
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '90px' }}>
									STANDING
								</Label>
								<Header size='tiny' style={{ color: 'white', paddingLeft: '40px', paddingRight: '10px' }}>
									{standing} / 100
								</Header>
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '100px' }}>
									QUIZZES
								</Label>
								<Header size='tiny' style={{ color: 'white', paddingLeft: '30px' }}>
									{standing}
								</Header>
								<Header size='tiny' style={{ color: 'grey', paddingLeft: '10px', paddingRight: '10px' }}>
									{'( ' + quizPercentage + '% )'}
								</Header>
								{
									active?
										(
											showQuizForm?
												(
													<React.Fragment>
														<Input size='mini' inverted transparent style={{ marginLeft: '10px', width: '50px' }} onChange={updateQuizTitle} value={quizTitle}/>
														<Input size='mini' type='number' inverted transparent style={{ marginLeft: '10px', width: '29px' }} onChange={updateQuizScore} value={quizScore}/>
														{' / '}
														<Input size='mini' type='number' inverted transparent style={{ marginRight: '10px', width: '29px' }} onChange={updateQuizTotal} value={quizTotal}/>
														<Button size='mini' circular icon='check' onClick={submitQuiz}/>
														<Button size='mini' circular icon='cancel' onClick={closeQuizForm}/>
													</React.Fragment>
												)
											:
												(
													<Button size='mini' style={{ marginLeft: '50px', width: '150px' }} onClick={openQuizForm}>
														<Icon name='add' />
														ADD QUIZ
													</Button>
												)
										)
									: null
								}
								{
									quizzes.length > 0?
										(
											<List inverted style={{ paddingLeft: '150px' }}>
												{
													quizzes.map(quiz => (
														<List.Item key={quiz.id}>
															{quiz.title}: {quiz.score} / {quiz.total}
														</List.Item>
													))
												}
											</List>
										)
									: null
								}
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '100px' }}>
									ASSIGNMENTS
								</Label>
								{
									active?
										(
											showAssignmentForm?
												(
													<React.Fragment>
														<Input size='mini' inverted transparent style={{ marginLeft: '10px', width: '50px' }} onChange={updateAssignmentTitle} value={assignmentTitle}/>
														<Input size='mini' type='number' inverted transparent style={{ marginLeft: '10px', width: '29px' }} onChange={updateAssignmentScore} value={assignmentScore}/>
														{' / '}
														<Input size='mini' type='number' inverted transparent style={{ marginRight: '10px', width: '29px' }} onChange={updateAssignmentTotal} value={assignmentTotal}/>
														<Button size='mini' circular icon='check' onClick={submitAssignment}/>
														<Button size='mini' circular icon='cancel' onClick={closeAssignmentForm}/>
													</React.Fragment>
												)
											:
												(
													<Button size='mini' style={{ marginLeft: '50px', width: '150px' }} onClick={openAssignmentForm}>
														<Icon name='add' />
														ADD ASSIGNMENT
													</Button>
												)
										)
									: null
								}
								{
									assignments.length > 0?
										(
											<List inverted style={{ paddingLeft: '150px' }}>
												{
													assignments.map(assignment => (
														<List.Item key={assignment.id}>
															{assignment.title}: {assignment.score} / {assignment.total}
														</List.Item>
													))
												}
											</List>
										)
									: null
								}
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Label style={{ textAlign: 'center', width: '100px' }}>
									EXAMS
								</Label>
								{
									active?
										(
											showExamForm?
												(
													<React.Fragment>
														<Input size='mini' inverted transparent style={{ marginLeft: '10px', width: '50px' }} onChange={updateExamTitle} value={examTitle}/>
														<Input size='mini' type='number' inverted transparent style={{ marginLeft: '10px', width: '29px' }} onChange={updateExamScore} value={examScore}/>
														{' / '}
														<Input size='mini' type='number' inverted transparent style={{ marginRight: '10px', width: '29px' }} onChange={updateExamTotal} value={examTotal}/>
														<Button size='mini' circular icon='check' onClick={submitExam}/>
														<Button size='mini' circular icon='cancel' onClick={closeExamForm}/>
													</React.Fragment>
												)
											:
												(
													<Button size='mini' style={{ marginLeft: '50px', width: '150px' }} onClick={openExamForm}>
														<Icon name='add' />
														ADD EXAM
													</Button>
												)
										)
									: null
								}
								{
									exams.length > 0?
										(
											<List inverted style={{ paddingLeft: '150px' }}>
												{
													exams.map(exam => (
														<List.Item key={exam.id}>
															{exam.title}: {exam.score} / {exam.total}
														</List.Item>
													))
												}
											</List>
										)
									: null
								}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Modal.Content>
		</Modal>
	)
}

export default ViewClassSection;