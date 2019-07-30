import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Input, Item, Label, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';

const ViewClassSection = ({ title, section, active }) => {
	const [classData, setCLassData] = useState({section: 'Loading'});
	const [absences, setAbsences] = useState(0);
	const [standing, setStanding] = useState(0);

	const [showEditQuiz, setShowEditQuiz] = useState(false);
	const [quizScorePercentage, setQuizScorePercentage] = useState(0);
	const [quizPercentage, setQuizPercentage] = useState(0);
	const [quizScoreAll, setQuizScoreAll] = useState(0);
	const [quizTotalAll, setQuizTotalAll] = useState(0);

	const [assignmentScorePercentage, setAssignmentScorePercentage] = useState(0);
	const [assignmentPercentage, setAssignmentPercentage] = useState(0);
	const [assignmentScoreAll, setAssignmentScoreAll] = useState(0);
	const [assignmentTotalAll, setAssignmentTotalAll] = useState(0);
	
	const [examScorePercentage, setExamScorePercentage] = useState(0);
	const [examPercentage, setExamPercentage] = useState(0);
	const [examScoreAll, setExamScoreAll] = useState(0);
	const [examTotalAll, setExamTotalAll] = useState(0);

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

			setQuizScorePercentage(res.data.percentage_quiz_score);
			setQuizPercentage(res.data.percentage_quiz);
			setAssignmentScorePercentage(res.data.percentage_assignment_score);
			setAssignmentPercentage(res.data.percentage_assignment);
			setExamScorePercentage(res.data.percentage_exam_score);
			setExamPercentage(res.data.percentage_exam);

			setQuizScoreAll(res.data.quiz_score);
			setQuizTotalAll(res.data.quiz_total);
			setAssignmentScoreAll(res.data.assignment_score);
			setAssignmentTotalAll(res.data.assignment_total);
			setExamScoreAll(res.data.exam_score);
			setExamTotalAll(res.data.exam_total);

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
		// if(e.target.value > -1 && e.target.value < 101){
		// 	setQuizPercentageText(e.target.value);
		// }
	}

	const editQuizPercentage = () => {
		if(showEditQuiz){
			const data = {
				section
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
				setQuizTotal(1);
				setShowQuizForm(false);
				setQuizScorePercentage((quizScoreAll + parseInt(quizScore)) * quizPercentage / (quizTotalAll + parseInt(quizTotal)));
				setQuizScoreAll(quizScoreAll + parseInt(quizScore));
				setQuizTotalAll(quizTotalAll + parseInt(quizTotal));

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
				setAssignmentTotal(1);
				setShowAssignmentForm(false);
				setAssignmentScorePercentage((assignmentScoreAll + parseInt(assignmentScore)) * assignmentPercentage / (assignmentTotalAll + parseInt(assignmentTotal)));
				setAssignmentScoreAll(assignmentScoreAll + parseInt(assignmentScore));
				setAssignmentTotalAll(assignmentTotalAll + parseInt(assignmentTotal));

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
				setExamTotal(1);
				setShowExamForm(false);
				setExamScorePercentage((examScoreAll + parseInt(examScore)) * examPercentage / (examTotalAll + parseInt(examTotal)));
				setExamScoreAll(examScoreAll + parseInt(examScore));
				setExamTotalAll(examTotalAll + parseInt(examTotal));

				updateExams();
			}, err => {
				throw err;
			});
		}
	}

	const updateQuizzes = () => {
		updateStanding();
		axios.get(`api/class/section/${section}/quiz`).then(res => {
			setQuizzes(res.data);
		}, err => {
			throw err;
		});
	}

	const updateAssignments = () => {
		updateStanding();
		axios.get(`api/class/section/${section}/assignment`).then(res => {
			setAssignments(res.data);
		}, err => {
			throw err;
		});
	}

	const updateExams = () => {
		updateStanding();
		axios.get(`api/class/section/${section}/exam`).then(res => {
			setExams(res.data);
		}, err => {
			throw err;
		});
	}

	const editQuiz = e => {
		console.log(e.target.id);
	}

	const deleteQuiz = e => {
		axios.delete(`api/class/section/quiz/${e.target.id}`).then(res => {
			setQuizScorePercentage(res.data.newValue);
			setQuizScoreAll(res.data.score);
			setQuizTotalAll(res.data.total);
			updateQuizzes();
		}, err => {
			throw err;
		});
	}

	const editAssignment = e => {
		console.log(e.target.id);
	}

	const deleteAssignment = e => {
		axios.delete(`api/class/section/assignment/${e.target.id}`).then(res => {
			setAssignmentScorePercentage(res.data.newValue);
			setAssignmentScoreAll(res.data.score);
			setAssignmentTotalAll(res.data.total);
			updateAssignments();
		}, err => {
			throw err;
		});
	}

	const editExam = e => {
		console.log(e.target.id);
	}

	const deleteExam = e => {
		axios.delete(`api/class/section/exam/${e.target.id}`).then(res => {
			setExamScorePercentage(res.data.newValue);
			setExamScoreAll(res.data.score);
			setExamTotalAll(res.data.total);
			updateExams();
		}, err => {
			throw err;
		});
	}

	const updateStanding = () => {
		const data = {
			section
		}

		axios.put(`api/class/section/standing`, data).then(res => {
			setStanding(res.data.standing);
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
									{quizScorePercentage}
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
															<Button id={quiz.id} icon size='mini' onClick={editQuiz} style={{ marginLeft: '10px' }}>
																<Icon id={quiz.id} name='edit' />
															</Button>
															<Button id={quiz.id} icon size='mini' onClick={deleteQuiz}>
																<Icon id={quiz.id} name='delete' />
															</Button>
														</List.Item>
													))
												}
												<List.Item>
													TOTAL: {quizScoreAll} / {quizTotalAll}
												</List.Item>
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
								<Header size='tiny' style={{ color: 'white', paddingLeft: '30px' }}>
									{assignmentScorePercentage}
								</Header>
								<Header size='tiny' style={{ color: 'grey', paddingLeft: '10px', paddingRight: '10px' }}>
									{'( ' + assignmentPercentage + '% )'}
								</Header>
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
															<Button id={assignment.id} icon size='mini' onClick={editAssignment} style={{ marginLeft: '10px' }}>
																<Icon id={assignment.id} name='edit' />
															</Button>
															<Button id={assignment.id} icon size='mini' onClick={deleteAssignment}>
																<Icon id={assignment.id} name='delete' />
															</Button>
														</List.Item>
													))
												}
												<List.Item>
													TOTAL: {assignmentScoreAll} / {assignmentTotalAll}
												</List.Item>
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
								<Header size='tiny' style={{ color: 'white', paddingLeft: '30px' }}>
									{examScorePercentage}
								</Header>
								<Header size='tiny' style={{ color: 'grey', paddingLeft: '10px', paddingRight: '10px' }}>
									{'( ' + examPercentage + '% )'}
								</Header>
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
															<Button id={exam.id} icon size='mini' onClick={editExam} style={{ marginLeft: '10px' }}>
																<Icon id={exam.id} name='edit' />
															</Button>
															<Button id={exam.id} icon size='mini' onClick={deleteExam}>
																<Icon id={exam.id} name='delete' />
															</Button>
														</List.Item>
													))
												}
												<List.Item>
													TOTAL: {examScoreAll} / {examTotalAll}
												</List.Item>
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