import React, { useRef } from 'react';
import '../../App.css';

function nextTaskGroupId() {
	let nextTGId = 1;

	let taskGroupId = localStorage.getItem('taskGroupId');
	if (taskGroupId) {
		nextTGId = parseInt(taskGroupId) + 1;
		localStorage.setItem('taskGroupId', nextTGId);
	} else {
		localStorage.setItem('taskGroupId', nextTGId);
	}

	return nextTGId;
}

export default function TaskGroupForm(props) {
	const nameRef = useRef(null);

	const setTaskGroupObj = () => {
		return { id: nextTaskGroupId(), name: nameRef.current.value }
	}

	const newTaskGroup = () => {
		let taskGroups = localStorage.getItem('taskGroups');
		if (taskGroups) {
			taskGroups = JSON.parse(taskGroups);
			taskGroups.push(setTaskGroupObj());
			localStorage.setItem('taskGroups', JSON.stringify(taskGroups) );
		} else {
			localStorage.setItem('taskGroups', JSON.stringify([setTaskGroupObj()]) );
		}
		props.checkTaskGroupStorage();
		props.changeShowForm(false);
	}

	const updateTaskGroup = () => {
		let taskGroups = JSON.parse(localStorage.getItem('taskGroups'));
		let indx = taskGroups.findIndex((i) => { return i.id === props.taskGroupId });
		taskGroups[indx] = { id: props.taskGroupId, name: nameRef.current.value }
		localStorage.setItem('taskGroups', JSON.stringify(taskGroups) );
		props.checkTaskGroupStorage();
		props.changeShowForm(false);
	}

	const submit = (e) => {
		if (e) { e.preventDefault(); }
		if (props.taskGroupId) {
			updateTaskGroup();
		} else {
			newTaskGroup();
		}
	}

	return (
		<form className="Task-Group-Form"
					onSubmit={(e) => submit(e)}>
			<label>
				Task Group Name:
				<input ref={nameRef}
							 type="text"
							 placeholder="Name here..."
							 defaultValue={ props.taskGroupName || "" }/>
			</label>

			<div>
				<input className="Button mgrght" type="button" value="Save" onClick={() => submit()} />
				<button className="Button" type="button" onClick={() => props.changeShowForm(false)}>Cancel</button>
			</div>
		</form>
	)
}
