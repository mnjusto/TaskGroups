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
		return { id: nextTaskId(), task_group_id: props.taskGroupId, name: taskNameVal, completed: false }
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
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		let indx = tasks.findIndex((task) => { return task.id === props.taskId });
		let taskNameVal = taskName.current.value;
		tasks[indx] = { ...tasks[indx], name: taskNameVal }
		localStorage.setItem("tasks", JSON.stringify(tasks));
		props.checkTaskstorage();
		props.cancel(false);
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
			<input ref={taskName} type="text" defaultValue={ props.taskName || "" } placeholder="task here..."/>
			<input type="button" className="Button" value="Save" onClick={(e) => submit(e)}/>
			<button type="button" className="Button" onClick={(e) => props.cancel()}>Cancel</button>
		</form>
	)
}
