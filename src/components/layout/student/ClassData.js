import React, { useState } from 'react';
import { Accordion, Header, Icon, Item, Label } from 'semantic-ui-react';

const ClassData = ({ data }) => {
	const [active, setActive] = useState(false);
	const [iconName, setIconName] = useState('folder');

	const toggle = () => {
		setActive(!active);
		setIconName(iconName === 'folder'? 'folder open' : 'folder');
	}

	return (
		<React.Fragment>
			<Accordion.Title onClick={toggle} >
				<Icon name={iconName} />
				CLASS RECORD
			</Accordion.Title>
			<Accordion.Content active={active}>
				<Item.Group divided>
					<Item>
						<Item.Content>
							<Label style={{ textAlign: 'center', width: '90px' }} >
								FINALS
							</Label>
							<Icon name={data.finals? 'check' : 'times'} style={{ paddingLeft: '40px', paddingRight: '13px' }} />
						</Item.Content>
						{
							data.finals?
								(
									<Item.Content>
										<Label style={{ textAlign: 'center', width: '90px' }}>
											REQUIRED
										</Label>
										<Icon name={data.required? 'check' : 'times'} style={{ paddingLeft: '40px' }} />
									</Item.Content>
								)
							: null
						}
					</Item>
					{
						data.finals && !data.required?
							(
								<Item>
									<Item.Content>
										<Label style={{ textAlign: 'center', width: '90px' }}>
											EXEMPTION
										</Label>
										<Header size='small' style={{ color: 'white', paddingLeft: '40px' }}>
											{data.exemption}
										</Header>
									</Item.Content>
									<Item.Content>
										<Label style={{ textAlign: 'center', width: '90px' }}>
											EXEMPTED
										</Label>
										<Icon name={data.exempted? 'check' : 'times'} style={{ paddingLeft: '40px' }} />
									</Item.Content>
								</Item>
							)
						: null
					}
					<Item>
						<Item.Content>
							<Label style={{ textAlign: 'center', width: '90px' }}>
								PASSING
							</Label>
							<Header size='small' style={{ color: 'white', paddingLeft: '40px' }}>
								{data.passing}
							</Header>
						</Item.Content>
						<Item.Content>
							<Label style={{ textAlign: 'center', width: '90px' }}>
								PASSED
							</Label>
							<Icon name={data.passed? 'check' : 'times'} style={{ paddingLeft: '40px' }} />
						</Item.Content>
					</Item>
					<Item>
						<Item.Content>
							<Label style={{ textAlign: 'center', width: '90px' }}>
								{data.finals && !data.required? 'PREFINAL' : ''} STANDING
							</Label>
							<Header size='small' style={{ color: 'white', paddingLeft: '40px' }}>
								{data.standing}
							</Header>
						</Item.Content>
					</Item>
				</Item.Group>
			</Accordion.Content>
		</React.Fragment>
	)
}

export default ClassData;