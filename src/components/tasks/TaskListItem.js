import React, { useState, useEffect } from 'react';
import TaskItem from "./TaskItem";
import AddTaskFormCont from './AddTaskFormCont';

export default function TaskListItem(props) {
	const [tasks, setTasks] = useState([]);

	const checkTaskstorage = () => {
		let tasksStorage = localStorage.getItem('tasks');
		if (!tasksStorage) { return; }
		let tasks = JSON.parse(tasksStorage).filter((task) => { return task.task_group_id === props.taskGroupId })
		setTasks(tasks);
	}

	useEffect(() => {
		checkTaskstorage();
  }, []);

	return (
		<React.Fragment>
			<div>
				{
					tasks.map(task => {
						return <TaskItem key={task.id}
														 task={task}
														 checkTaskstorage={checkTaskstorage}/>
					})
				}
			</div>
			{ tasks.length ? <hr/> : null }
			<AddTaskFormCont taskGroupId={ props.taskGroupId }
											 checkTaskstorage={checkTaskstorage}/>
		</React.Fragment>
	)
}
