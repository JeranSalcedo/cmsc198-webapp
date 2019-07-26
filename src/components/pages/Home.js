import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import SubjectsList from '../layout/admin/SubjectsList';
import Menu from '../layout/Menu';

const Home = () => {
	const [semesters, setSemesters] = useState({});
	const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		updateSemesters();
		updateSubjectsList();
	}, []);

	const updateSemesters = () => {
		axios.get(`/api/semester`).then(res => {
			setSemesters(res.data);
		}, err => {
			throw err;
		});
	}

	const updateSubjectsList = () => {
		axios.get(`/api/subject`).then(res => {
			setSubjects(res.data);
		}, err => {
			throw err;
		});
	}

	return (
		<React.Fragment>
			{
				localStorage.getItem('admin') === 'true'?
					(
						<Container align='middle'>
							<SubjectsList subjects={subjects} updateSubjectsList={updateSubjectsList} />
						</Container>
					)
				: null
			}
			<Menu semesters={semesters} updateSemesters={updateSemesters} subjects={subjects} />
			<br />
		</React.Fragment>
	)
}

export default Home;