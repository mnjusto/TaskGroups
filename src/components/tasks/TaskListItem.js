import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDrop } from "react-dnd";
import { ItemTypes } from '../../util/itemTypes';
import { TaskGroupItemContext } from '../task_groups/TaskGroupItem';
import TaskItem from "./TaskItem";
import AddTaskFormCont from './AddTaskFormCont';

export default function TaskListItem(props) {
	const { updateCompetedPercentage } = useContext(TaskGroupItemContext);
	const [tasks, setTasks] = useState([]);

	const [{  }, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop(item, monitor) {
			// console.log(item)
		},
		hover(item, monitor) {
			// console.log(item)
		},
		collect: monitor => ({
			// isOver: monitor.isOver(),
		})
	});

	const sortTaskSameGroup = (draggedIndex, hoverIndex) => {
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
	}

	const sortTaskDiffGroup = (draggedTask, hoverIndex) => {
		console.log(props.taskGroupId, draggedTask.task_group_id)
		let newTasks = [];
		let taskCopy = [...tasks];
		newTasks = [...taskCopy.slice(0, hoverIndex)]
		newTasks[hoverIndex] = { ...draggedTask, task_group_id: props.taskGroupId };
		newTasks = [...newTasks, ...taskCopy.slice(hoverIndex, taskCopy.length)];
		setTasks(newTasks);
	}

	const sortTask = useCallback((draggedIndex, hoverIndex, draggedTask) => {
		if (draggedTask.task_group_id === props.taskGroupId) {
			sortTaskSameGroup(draggedIndex, hoverIndex)
		} else {
			sortTaskDiffGroup(draggedTask, hoverIndex)
		}
  }, [tasks]);

  const taskDropped = (taskId) => {
		let tasksStorage = JSON.parse(localStorage.getItem('tasks'));
		let currTask = tasksStorage.filter(task => { return task.id === taskId });
		if (currTask.task_group_id !== props.taskGroupId) {
			tasksStorage = tasksStorage.filter(task => { return task.id !== taskId });
		}

		let newTasks = tasksStorage.filter((task) => { return task.task_group_id !== props.taskGroupId });
		localStorage.setItem('tasks', JSON.stringify([...newTasks, ...tasks]));
  }

	const checkTaskstorage = () => {
		let tasksStorage = localStorage.getItem('tasks');
		if (!tasksStorage) { return; }
		let newTasks = JSON.parse(tasksStorage).filter((task) => { return task.task_group_id === props.taskGroupId })
		setTasks(newTasks);
		updateCompetedPercentage();
	}

	const removeTask = (taskId) => {
		setTasks(tasks.filter(task => { return task.id != taskId }));
	}

	useEffect(() => {
		checkTaskstorage();
  }, []);

	return (
		<React.Fragment>
			<div className="Task-List-Item-Cont">
			{
				//<div className="Task-List-Item-Cont">
				//<div ref={drop} className="Task-List-Item-Cont">
			}
				{
					tasks.map((task, indx) => {
						return <TaskItem key={task.id}
														 indx={indx}
														 task={task}
														 checkTaskstorage={checkTaskstorage}
														 removeTask={removeTask}
														 sortTask={sortTask}
														 sortTaskSameGroup={sortTaskSameGroup}
														 sortTaskDiffGroup={sortTaskDiffGroup}
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
