import React, { useState } from 'react';
import '../../App.css';
import TaskGroupForm from './TaskGroupForm';

export default function AddTaskGroupForm(props) {
	const [showForm, setShowForm] = useState(false)

	const changeShowForm = (showForm) => {
		setShowForm(showForm)
	}

	if (showForm) {
		return (
			<div className="Task-Group-Form-Cont">
				<TaskGroupForm changeShowForm={ changeShowForm }
													checkTaskGroupStorage={props.checkTaskGroupStorage}/>
			</div>
		)
	} else {
		return (
			<div className="Task-Group-Add-Btn-Cont">
				<button className="Button"
								onClick={(e) => changeShowForm(true)}>Add Task Group</button>
			</div>
		)
	}
}
