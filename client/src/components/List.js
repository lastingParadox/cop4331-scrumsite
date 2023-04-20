import React from 'react';
import Task from './Task';
import Card from 'react-bootstrap/Card';
import './list.css';

function List(props) {
	const tasks = props.tasks.map((task) => (
		<Task
			key={task.id}
			id={task.id}
			title={task.title}
			description={task.description}
			author={task.author}
		/>
	));

	return (
		<Card style={{ width: '18rem', border: '3px solid green' }}>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{tasks}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default List;
