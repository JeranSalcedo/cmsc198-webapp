import React, { useState } from 'react';
import { Accordion, Button, Icon, List, Modal, Segment } from 'semantic-ui-react';
import axios from 'axios';
import ClassData from './ClassData';
import ViewClassSection from './ViewClassSection';

const ViewClasses = ({ semesterId }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [classes, setClasses] = useState([]);
	const [targetId, setTargetId] = useState(0);

	const updateClasses = () => {
		axios.get(`/api/class/${localStorage.getItem('id')}/${semesterId}`).then(res => {
			setClasses(res.data);
		}, err => {
			throw err;
		});
	}

	const openDeleteVal = e => {
		setTargetId(e.target.id);
		setShowDeleteModal(true);
	}

	const closeDeleteVal = () => {
		setShowDeleteModal(false);
	}

	const deleteClass = () => {
		axios.delete(`/api/class/${targetId}`).then(() => {
			updateClasses();
		}, err => {
			throw err;
		});

		closeDeleteVal();
	}

	return (
		<Modal size='tiny' trigger={
			<Button onClick={updateClasses} size='mini'>
				<Icon name='table' />
				VIEW CLASSES
			</Button>
		}>
			<Modal open={showDeleteModal} basic size='small'>
				<Modal.Content>
					<p>
						Are you sure you want to delete this class?
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='grey' name='cancel' onClick={closeDeleteVal} inverted>
						CANCEL
					</Button>
					<Button basic color='red' name='delete' onClick={deleteClass} inverted>
						<Icon name='remove' /> DELETE
					</Button>
				</Modal.Actions>
			</Modal>
			<Modal.Header>
				Classes
			</Modal.Header>
			<Modal.Content>
				<Segment inverted>
					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<List.Header>
									TOTAL : {classes.length}
								</List.Header>
							</List.Content>
						</List.Item>
						{
							classes.map((cls, ind) =>(
								<List.Item key={cls.id}>
									<List.Content>
										<List.Header>
											{cls.code} {cls.number}
										</List.Header>
										{cls.title}
										<Button icon size='mini' floated='right' id={cls.id} onClick={openDeleteVal}>
											<Icon id={cls.id} name='close' />
										</Button>
										{
											cls.recit_lab !== null?
												<ViewClassSection title={cls.fullName + ' ' + cls.number} section={cls.recit_lab} />
											: null
										}
										<ViewClassSection title={cls.fullName + ' ' + cls.number} section={cls.lecture} />
										<Accordion inverted exclusive={false} fluid style={{ marginTop: '15px' }}>
											<ClassData data={{
												fullName: cls.fullName,
												number: cls.number,
												finals: cls.finals === 1,
												required: cls.required === 1,
												exemption: cls.exemption,
												exempted: cls.exempted === 1,
												passing: cls.passing,
												passed: cls.passed === 1
											}} />
										</Accordion>
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

export default ViewClasses;