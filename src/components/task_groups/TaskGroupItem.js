import React, { useState } from 'react';
import TaskGroupForm from './TaskGroupForm';

function TaskGroupItem(props) {
	const [showForm, setForm] = useState(false);

	const deleteTaskGroup = (e) => {
		e.preventDefault();
  	let taskGroups = localStorage.getItem('taskGroups');
		taskGroups = JSON.parse(taskGroups);
		let newtaskGroups = taskGroups.filter((task) => task.id !== props.taskGroup.id)
  	localStorage.setItem('taskGroups', JSON.stringify(newtaskGroups));
  	props.checkTaskGroupStorage();
	}

	return(
		<div className="Task-Group-Item-Cont">
			<div className="Tgitem-Head">
				{
					showForm ?
					<TaskGroupForm taskGroupId={props.taskGroup.id}
												 taskGroupName={props.taskGroup.name}
												 changeShowForm={setForm}
												 checkTaskGroupStorage={props.checkTaskGroupStorage}/>
					:
					<React.Fragment>
						<div className="Btn-Cont">
							<a href="#" onClick={(e) => setForm(true)}>Edit</a>
							<a href="#" onClick={(e) => deleteTaskGroup(e)}>Delete</a>
						</div>

						<span>
							{props.taskGroup.name}
						</span>
					</React.Fragment>
				}
			</div>
		</div>
	)
}

export default TaskGroupItem;
