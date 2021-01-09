import React, { useState, useEffect, useCallback } from 'react';
// import { useDrop } from "react-dnd";
// import { ItemTypes } from '../../util/itemTypes';
import TaskItem from "./TaskItem";
import AddTaskFormCont from './AddTaskFormCont';

export default function TaskListItem(props) {
	const [tasks, setTasks] = useState([]);

	// const [{  }, drop] = useDrop({
	// 	accept: ItemTypes.TASK,
	// 	drop(item, monitor) {
	// 		console.log(item)
	// 	},
	// 	hover(item, monitor) {
	// 		console.log(item)
	// 	},
	// 	collect: monitor => ({
	// 		// isOver: monitor.isOver(),
	// 	})
	// })

	const sortTask = useCallback((draggedIndex, hoverIndex) => {
		let newTasks = [];
		let taskCopy = [...tasks];

		if (draggedIndex > hoverIndex) {
			newTasks = [...taskCopy.slice(0, hoverIndex)];
			newTasks[hoverIndex] = taskCopy[draggedIndex];
			newTasks = [...newTasks, ...taskCopy.slice(hoverIndex, draggedIndex),...taskCopy.slice(draggedIndex + 1, taskCopy.length)];
		} else {
			newTasks = [...taskCopy.slice(0, draggedIndex)];
			newTasks = [...newTasks, ...taskCopy.slice(draggedIndex + 1, hoverIndex + 1)];
			newTasks[hoverIndex] = taskCopy[draggedIndex];
			newTasks = [...newTasks, ...taskCopy.slice(hoverIndex + 1, taskCopy.length )]
		}

		setTasks(newTasks);
  }, [tasks]);

  const taskDropped = () => {
		let tasksStorage = localStorage.getItem('tasks');
		let newTasks = JSON.parse(tasksStorage).filter((task) => { return task.task_group_id !== props.taskGroupId });
		localStorage.setItem('tasks', JSON.stringify([...newTasks, ...tasks]));
  }

	const checkTaskstorage = () => {
		let tasksStorage = localStorage.getItem('tasks');
		if (!tasksStorage) { return; }
		let newTasks = JSON.parse(tasksStorage).filter((task) => { return task.task_group_id === props.taskGroupId })
		setTasks(newTasks);
	}

	useEffect(() => {
		checkTaskstorage();
  }, []);

	return (
		<React.Fragment>
			<div className="Task-List-Item-Cont">
			{
				//<div ref={drop} className="Task-List-Item-Cont">--
			}
				{
					tasks.map((task, indx) => {
						return <TaskItem key={task.id}
														 indx={indx}
														 task={task}
														 checkTaskstorage={checkTaskstorage}
														 sortTask={sortTask}
														 taskDropped={taskDropped}/>
					})
				}
			</div>
			{ tasks.length ? <hr/> : null }
			<AddTaskFormCont taskGroupId={ props.taskGroupId }
											 checkTaskstorage={checkTaskstorage}/>
		</React.Fragment>
	)
}
