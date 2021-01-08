import React, { useRef } from 'react';

function nextTaskId() {
	let nextId = 1;

	let taskId = localStorage.getItem('taskId');
	if (taskId) {
		nextId = parseInt(taskId) + 1;
		localStorage.setItem('taskId', nextId);
	} else {
		localStorage.setItem('taskId', nextId);
	}

	return nextId;
}

export default function TaskForm(props) {
	const taskName = useRef();

	const setTaskObj = () => {
		let taskNameVal = taskName.current.value;
		console.log(taskNameVal);
		return { id: nextTaskId(), task_group_id: props.taskGroupId, name: taskNameVal }
	}

	const createTask = () => {
		let tasks = localStorage.getItem("tasks");
		if (tasks) {
			tasks = JSON.parse(tasks);
			tasks.push(setTaskObj());
			localStorage.setItem("tasks", JSON.stringify(tasks));
		} else {
			localStorage.setItem("tasks", JSON.stringify([setTaskObj()]));
		}

		props.checkTaskstorage();
		props.cancel(false);
	}

	const updateTask = () => {

	}

	const submit = (e) => {
		e.preventDefault();
		if (props.taskId) {
			updateTask();
		} else {
			createTask();
		}
	}

	return (
		<form onSubmit={(e) => submit(e)}>
			<input ref={taskName} type="text"/>

			<input type="button" className="Button" value="Save" onClick={(e) => submit(e)}/>
			<button type="button" className="Button" onClick={(e) => props.cancel()}>Cancel</button>
		</form>
	)
}
