import React, { useState } from 'react';
import TaskForm from "./TaskForm";
import AddIcon from '@material-ui/icons/Add';

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
			<button className="Button Add-Task" onClick={(e) => changeShowForm(true)}>
				<AddIcon/> Add Task
			</button>
		)
	}

}
