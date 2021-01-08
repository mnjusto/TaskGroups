import React, { useState } from 'react';
import TaskForm from "./TaskForm";

export default function AddTaskFormCont(props) {
	const [showForm, setForm] = useState(false);

	const changeShowForm = (show) => {
		setForm(show);
	}

	if (showForm) {
		return (
			<TaskForm taskGroupId={ props.taskGroupId }
							  cancel={ changeShowForm }
							  checkTaskstorage={props.checkTaskstorage}/>
		)
	} else {
		return (
			<button className="Button" onClick={(e) => changeShowForm(true)}>Add Task</button>
		)
	}

}
