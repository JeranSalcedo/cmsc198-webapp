import React from 'react';
import SemestersList from './SemestersList';
import ClassesList from './ClassesList';
import Menu from './admin/Menu';

const Home = () => {
	return (
		localStorage.getItem('admin')?
			<Menu />
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