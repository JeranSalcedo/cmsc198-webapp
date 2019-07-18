import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SemestersList = () => {
	const [semesters, setSemesters] = useState([]);

	useEffect(() => {
		const N = 3;

		axios.get(`/api/semester/${N}`).then(res => {
			// console.log(res.data);
			setSemesters(res.data);
		}, err => {
			throw err;
		});
	}, []);

	const onClick = e => {
		// e.target.setAttribute('disabled', 'disabled');
		console.log(e.target.id);
	}

	return semesters.map((sem, ind) => {
		return <button key={ind} id={sem.id} onClick={onClick} style={buttonStyle} >{sem.title}:<br />{sem.year_start}-{sem.year_end}</button>
	});
}

const buttonStyle = {
	width: '100px'
}

export default SemestersList;