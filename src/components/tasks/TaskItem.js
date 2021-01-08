import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskItem(props) {
	const [showForm, setForm] = useState(false);

	const changeTaskStatus = (e) => {
		e.preventDefault();
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		let indx = tasks.findIndex((task) => { return task.id === props.task.id });
		tasks[indx] = { ...tasks[indx], completed: !props.task.completed }
		localStorage.setItem("tasks", JSON.stringify(tasks));
		props.checkTaskstorage();
	}

	const changeShowForm = (show, e) => {
		if (e) { e.preventDefault(); }
		setForm(show)
	}

	const deleteTask = (e) => {
		if (e) { e.preventDefault(); }
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		let newTasks = tasks.filter((task) => { return task.id !== props.task.id });
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		props.checkTaskstorage();
	}

	const { id: taskId, task_group_id: taskGroupId, name } = props.task;

	return (
		<div className={`Task-Item-Cont ${props.task.completed ? "Completed" : ""}`}>
			{
				showForm ?
					<TaskForm taskId={taskId}
										taskGroupId={taskGroupId}
										taskName={name}
										checkTaskstorage={ props.checkTaskstorage }
										cancel={ changeShowForm }/>
					:
					<React.Fragment>
						<span>{name}</span>

						<div className="Btn-Cont">
							<a href="#" onClick={(e) => {changeTaskStatus(e)}}>{ props.task.completed ? "Revive" : "Complete"}</a>
							<a href="#" onClick={(e) => {changeShowForm(true, e)}}>Edit</a>
							<a href="#" onClick={(e) => {deleteTask(e)}}>Delete</a>
						</div>
					</React.Fragment>
			}
		</div>
	)
}
