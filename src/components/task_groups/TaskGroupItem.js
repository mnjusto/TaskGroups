import React, { useState, createContext } from 'react';
import TaskGroupForm from './TaskGroupForm';
import TaskListItem from '../tasks/TaskListItem';
import LinearProgressWithLabel from '../shared/LinearProgressWithLabel';

export const TaskGroupItemContext = createContext({
	updateCompetedPercentage: null
})

function TaskGroupItem(props) {
	const [showForm, setForm] = useState(false);
	const [completedPercentage, setCompletedPercentage] = useState(0);

	const deleteTaskGroup = (e) => {
		e.preventDefault();
  	let taskGroups = localStorage.getItem('taskGroups');
		taskGroups = JSON.parse(taskGroups);
		let newtaskGroups = taskGroups.filter((taskGroup) => taskGroup.id !== props.taskGroup.id)
  	localStorage.setItem('taskGroups', JSON.stringify(newtaskGroups));
  	props.checkTaskGroupStorage();
	}

	const updateCompetedPercentage = () => {
		let taskGroups = JSON.parse(localStorage.getItem('tasks'));
		let currTaskGroupTasks = taskGroups.filter((taskGroup) => taskGroup.task_group_id === props.taskGroup.id);
		if (!currTaskGroupTasks.length) {
			setCompletedPercentage(0);
			return;
		}
		let completedTaskCount = currTaskGroupTasks.filter(task => { return task.completed }).length
		let newPercentage = (completedTaskCount / currTaskGroupTasks.length) * 100;
		setCompletedPercentage(newPercentage);
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
			<TaskGroupItemContext.Provider value={{updateCompetedPercentage}}>
				<TaskListItem taskGroupId={props.taskGroup.id}/>
			</TaskGroupItemContext.Provider>
		</div>
	)
}

export default TaskGroupItem;
