import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ClassesList = () => {
	const [classes, setClasses] = useState([]);
	// const [openModal, setModalStatus] = useState(false);

	// const [subject, setSubject] = useState('');
	// const [finals, setFinals] = useState(false);
	// const [required, setRequired] = useState('');
	// const [exemption, setExemption] = useState(0);
	// const [passing, setPassing] = useState(0);

	// const [sectionLecture, setSectionLecture] = useState('');
	// const [teacherLecture, setTeacherLecture] = useState('');
	// const [absencesLecture, setAbsencesLecture] = useState(0);
	// const [allowableAbsencesLecture, setAllowableAbsencesLecture] = useState(0);

	// const [hasRecitLab, setRecitLab] = useState(false);
	// const [isLab, setLab] = useState(false);
	// const [sectionRecitLab, setSectionRecitLab] = useState('');
	// const [teacherRecitLab, setTeacherRecitLab] = useState('');
	// const [absencesRecitLab, setAbsencesRecitLab] = useState(0);
	// const [allowableAbsencesRecitLab, setAllowableAbsencesRecitLab] = useState(0);

	useEffect(() => {
		axios.get(`/api/user/1/class`).then(res => {
			setClasses(res.data);
		}, err => {
			throw err;
		});
	}, []);

	// const openClass = e => {
	// 	// e.target.setAttribute('disabled', 'disabled');
	// 	console.log(e.target.id);
	// }

	// const toggleOpen = e => {
	// 	setModalStatus(!openModal);
	// }

	// const onChange = e => {
		// switch(e.target.id){
		// 	case 'subject':
		// 		setSubject(e.target.value);
		// 		break;
		// 	case 'finals':
		// 		setFinals(!finals);
		// 		break;
		// 	case 'required':
		// 		setRequired(!required);
		// 		break;
		// 	case 'exemption':
		// 		if(e.target.validity.valid){
		// 			setExemption(e.target.value);
		// 		}
		// 		break;
		// 	case 'passing':
		// 		if(e.target.validity.valid){
		// 			setPassing(e.target.value);
		// 		}
		// 		break;
		// 	case 'sectionLecture':
		// 		if(e.target.validity.valid){
		// 			setSectionLecture(e.target.value);
		// 		}
		// 		break;
		// 	case 'lecturer':
		// 		setTeacherLecture(e.target.value);
		// 		break;
		// 	case 'recit':
		// 		setRecitLab(true);
		// 		setLab(false);
		// 		break;
		// 	case 'lab':
		// 		setRecitLab(true);
		// 		setLab(true);
		// 		break;
		// 	case 'recitLab':
		// 		setRecitLab(false);
		// 		break;
		// 	default:
		// 		console.log(e.target.id);
		// }
	// }

	// const onSubmit = e => {
		// e.preventDefault();

		// const credentials = {
		// 	studentId,
		// 	password
		// };

		// axios.post('/api/account', credentials).then(res => {
		// 	console.log(res);
		// 	setStudentId('');
		// 	setPassword('');
		// }, err => {
		// 	setPassword('');
		// });
	// }

	return (
		<React.Fragment>
			{
				classes.map(cls => (
					<h1>cls</h1>
				))
			}
			<Modal trigger={
				<Button primary>
					ADD CLASS
				</Button>
			}>
				<Modal.Header>
					Add Class
				</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								id='subject'
								label='Subject'
							/>
						</Form.Group>
					</Form>
				</Modal.Content>
			</Modal>
		</React.Fragment>
	);
}

export default ClassesList;