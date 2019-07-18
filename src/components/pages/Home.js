import React from 'react';
import AdminMenu from './AdminMenu';
import SemestersList from './SemestersList';
import ClassesList from './ClassesList';

const Home = () => {
	return (
		localStorage.getItem('admin')?
			<AdminMenu />
		:
			(
				<React.Fragment>
					<div style={semestersListStyle}>
						<SemestersList />
					</div>
					<div style={classesListStyle}>
						<ClassesList />
					</div>
				</React.Fragment>
			)
	)
}

const semestersListStyle = {
	display: 'flex',
	flexDirection: 'row'
}

const classesListStyle = {
	display: 'flex',
	flexDirection: 'column',
    alignItems: 'center'
}

export default Home;