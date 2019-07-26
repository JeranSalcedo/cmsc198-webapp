import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form, Icon, Input, Item, Label, List, Segment } from 'semantic-ui-react';
import axios from 'axios';

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
							<Label>
								FINALS
							</Label>
						</Item.Content>
						<Item.Content>
							<Label>
								REQUIRED
							</Label>
						</Item.Content>
					</Item>
					<Item>
						<Item.Content>
							<Label>
								EXEMPTION
							</Label>
						</Item.Content>
						<Item.Content>
							<Label>
								EXEMPTED
							</Label>
						</Item.Content>
					</Item>
					<Item>
						<Item.Content>
							<Label>
								PASSING
							</Label>
						</Item.Content>
						<Item.Content>
							<Label>
								PASSED
							</Label>
						</Item.Content>
					</Item>
				</Item.Group>
			</Accordion.Content>
		</React.Fragment>
	)
}

export default ClassData;