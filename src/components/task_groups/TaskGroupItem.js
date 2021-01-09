import React, { useState } from 'react';
import TaskGroupForm from './TaskGroupForm';
import TaskListItem from '../tasks/TaskListItem';
import LinearProgressWithLabel from '../shared/LinearProgressWithLabel';

function TaskGroupItem(props) {
	const [showForm, setForm] = useState(false);
	const [completedPercentage, setCompletedPercentage] = useState(0);

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

						<LinearProgressWithLabel value={completedPercentage} />
					</React.Fragment>
				}
			</div>
			<TaskListItem taskGroupId={props.taskGroup.id}/>
		</div>
	)
}

export default TaskGroupItem;
