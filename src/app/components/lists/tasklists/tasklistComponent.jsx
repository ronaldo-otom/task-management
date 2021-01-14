import axios from 'axios';
import React, { useEffect } from 'react';
import { Table, Button, Modal, Container, Form, Spinner, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';

const DisplayModal = (props) => {
	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
			<Form>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Add New Task</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid">
					<Container>
						<Form.Group>
							<Form.Label>Task Name</Form.Label>
							<Form.Control
								type="text"
								name="task_name"
								placeholder="Task Name"
								required
								onChange={(e) => props.handlechange(e)}
								size="sm"
							/>
							{Object.keys(props.task.task_name).length !== 0 ? (
								''
							) : (
								<p style={{ fontSize: 10, color: 'red', padding: 4 }}>Task Name Required</p>
							)}
						</Form.Group>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.submitform} size="sm">
						Submit
					</Button>
					<Button onClick={props.onHide} variant="danger" size="sm">
						Cancel
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

const DisplayUpdateModal = (props) => {
	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
			<Form>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Update Task</Modal.Title>
				</Modal.Header>
				<Modal.Body className="show-grid">
					<Container>
						<Form.Group>
							<Form.Label>Task Name</Form.Label>
							<Form.Control
								type="text"
								name="task_name"
								placeholder={props.task}
								required
								onChange={(e) => props.handlechange(e)}
								size="sm"
							/>
							{Object.keys(props.task).length !== 0 ? (
								''
							) : (
								<p style={{ fontSize: 10, color: 'red', padding: 4 }}>Task Name Required</p>
							)}
						</Form.Group>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.submitformUpdate} size="sm">
						Submit
					</Button>
					<Button onClick={props.onHide} variant="danger" size="sm">
						Cancel
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

function TasklistComponent(props) {
	const tasksInitialState = {
		isLoading: true,
		tasks: [],
	};

	const [showModal, setShowModal] = React.useState(false);
	const [showModalUpdate, setShowModalUpdate] = React.useState(false);
	const [taskInput, setTaskInput] = React.useState({ task_name: '' });
	const [taskInputUpdate, setTaskInputUpdate] = React.useState({ id: '', task_name: '', is_completed: false });
	const [tasks, setTasks] = React.useState(tasksInitialState);

	useEffect(() => {
		axios
			.get('https://simple-task-management-api.herokuapp.com/task')
			.then((result) => {
				setTasks({ isLoading: false, tasks: result.data.data });
			})
			.catch((err) => console.log(err.message));
	}, [tasks]);

	const addTask = (data) => {
		axios
			.post('https://simple-task-management-api.herokuapp.com/task/addtask', data)
			.then((result) => console.log('Task Added'))
			.catch((err) => console.log(err.message));
		setShowModal(false);
	};
	const deleteTask = (id) => {
		axios
			.delete(`https://simple-task-management-api.herokuapp.com/task/${id}`)
			.then((result) => console.log('Task Deleted'))
			.catch((err) => console.log(err.message));
	};
	const updateTask = (id, task, status) => {
		axios
			.patch(`https://simple-task-management-api.herokuapp.com/task/${id}`, {
				is_completed: status,
				task_name: task,
			})
			.then((result) => console.log('Task Updated'))
			.catch((err) => console.log(err.message));
	};

	const handleUpdate = (id, task, status) => {
		setShowModalUpdate(true);
		setTaskInputUpdate({ id, task_name: task, is_completed: status });
	};
	const handlechange = (e) => {
		const { name, value } = e.target;
		setTaskInput((prevState) => ({ ...prevState, [name]: value }));
		setTaskInputUpdate((prevState) => ({ ...prevState, [name]: value }));
	};

	const submitForm = () => {
		addTask(taskInput);
	};
	const submitformUpdate = () => {
		updateTask(taskInputUpdate.id, taskInputUpdate.task_name, taskInputUpdate.is_completed);
		setShowModalUpdate(false);
	};
	return (
		<div style={{ textAlign: 'center', padding:	15 }}>
			<h1>Simple Task Manager</h1>
			<hr />
			<div style={{ padding: 15, display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					variant="primary"
					size="sm"
					onClick={() => {
						setShowModal(true);
					}}
				>
					Add New Task
				</Button>
				<DisplayModal
					show={showModal}
					onHide={() => {
						setShowModal(false);
					}}
					submitform={submitForm}
					handlechange={handlechange}
					task={taskInput}
				/>
				<DisplayUpdateModal
					show={showModalUpdate}
					onHide={() => {
						setShowModalUpdate(false);
					}}
					submitformUpdate={submitformUpdate}
					handlechange={handlechange}
					task={taskInputUpdate.task_name}
				/>
			</div>
			<Table striped hover>
				<thead>
					<tr>
						<th>Status</th>
						<th>Task Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{tasks.isLoading ? (
						<tr>
							<td colSpan={3}>
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							</td>
						</tr>
					) : tasks.tasks.length === 0 ? <tr><td colSpan={3}><strong>No Tasks For Today</strong></td></tr> : (
						tasks.tasks.map((task, index) => (
							<tr key={index}>
								<td>
									{task.is_completed ? (
										<span style={{ color: 'blue', fontWeight: 'bold' }}>Completed</span>
									) : (
										<span style={{ color: 'red', fontWeight: 'bold' }}>Incomplete</span>
									)}
								</td>
								{task.is_completed ? (
									<td>
										<span style={{ color: 'lightgray' }}>
											<strike>{task.task_name}</strike>
										</span>
									</td>
								) : (
									<td>
										<strong>{task.task_name}</strong>
									</td>
								)}
								<td style={{ display: 'flex', justifyContent: 'center' }}>
									{task.is_completed ?
									<div className="actionIcon">										<Button
											size="sm"
											variant="info"
											onClick={() => handleUpdate(task._id, task.task_name, task.is_completed)}
											disabled
										>
											<i className="fa fa-edit"></i>
										</Button>
									</div> : 
									<OverlayTrigger placement='top' overlay={<Tooltip>Update Task Name</Tooltip>}>
									<div className="actionIcon">
									<Button
										size="sm"
										variant="info"
										onClick={() => handleUpdate(task._id, task.task_name, task.is_completed)}
									>
											<i className="fa fa-edit"></i>
										</Button>
									</div></OverlayTrigger>}
									<OverlayTrigger placement='top' overlay={<Tooltip>Delete Task</Tooltip>}>
									<div className="actionIcon">
										<Button size="sm" variant="danger" onClick={() => deleteTask(task._id)}>
											<i className="fa fa-trash"></i>
										</Button>
									</div></OverlayTrigger>
									{task.is_completed ? (
										<OverlayTrigger placement='top' overlay={<Tooltip>Mark as Incomplete Task</Tooltip>}>
										<div className="actionIcon">
											<Button
												size="sm"
												variant="warning"
												onClick={() => updateTask(task._id, task.task_name, false)}
											>
												<i className="fa fa-times"></i>
											</Button>
										</div></OverlayTrigger>
									) : (
										<OverlayTrigger placement='top' overlay={<Tooltip>Mark as Complete Task</Tooltip>}>
										<div className="actionIcon">
											<Button
												size="sm"
												variant="success"
												onClick={() => updateTask(task._id, task.task_name, true)}
											>
												<i className="fa fa-check"></i>
											</Button>
										</div></OverlayTrigger>
									)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
}

export default TasklistComponent;
