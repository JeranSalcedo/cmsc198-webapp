import React, { /*useState, */useEffect } from 'react';
// import { Button, Container, Modal } from 'semantic-ui-react';
// import axios from 'axios';

const ClassesCount = ({semester}) => {
	// const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		// axios.get(`/api/semester/${N}`).then(res => {
		// 	// console.log(res.data);
		// 	setSemesters(res.data);
		// }, err => {
		// 	throw err;
		// });
	}, []);

	// const onClick = e => {
	// 	// e.target.setAttribute('disabled', 'disabled');
	// 	console.log(e.target.id);
	// } 

	return (
		<h1>{semester}</h1>
	)
}

export default ClassesCount;