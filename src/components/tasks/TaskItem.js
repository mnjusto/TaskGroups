import React, { useState, useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../util/itemTypes';
import { TaskGroupItemContext } from '../task_groups/TaskGroupItem';
import TaskForm from './TaskForm';

export default function TaskItem(props) {
	const ref = useRef();
	const { updateCompetedPercentage } = useContext(TaskGroupItemContext);
	const [showForm, setForm] = useState(false);

	const removeTask = () => (
  	props.removeTask(props.task.id)
	)

	const [, drag] = useDrag({
	  item: {
	  	type: ItemTypes.TASK,
	  	task: props.task,
	  	removeTask: removeTask,
	  	indx: props.indx,
	  	updateCompetedPercentage: () => updateCompetedPercentage()
	  },
	  collect: (monitor) => ({
	    isDragging: !!monitor.isDragging()
	  })
	});

	const [, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop(item, monitor) {
			props.taskDropped(item.task.id);
			item.updateCompetedPercentage();
		},
		hover(item, monitor) {
			const dragIndex = item.indx;
			const hoverIndex = props.indx;
			if (item.task.id === props.task.id) { item.removeTask = removeTask }
			if (dragIndex === hoverIndex && item.task.task_group_id === props.task.task_group_id) { return; }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
			if (item.task.task_group_id !== props.task.task_group_id) {
				if (props.task.task_group_id > item.task.task_group_id
						&& (hoverBoundingRect.left + (hoverBoundingRect.width / 2) < clientOffset.x)) {
	      	props.sortTask(dragIndex, hoverIndex, item.task);
					item.removeTask();
	      	item.indx = hoverIndex;
	      	item.task = { ...item.task, task_group_id: props.task.task_group_id };
				} else if (props.task.task_group_id < item.task.task_group_id
									 && (hoverBoundingRect.right - (hoverBoundingRect.width / 2) > clientOffset.x)) {
	      	props.sortTask(dragIndex, hoverIndex, item.task);
					item.removeTask();
	      	item.indx = hoverIndex;
	      	item.task = { ...item.task, task_group_id: props.task.task_group_id };
				}
			} else {
	      if (dragIndex > hoverIndex
	      		&& (hoverBoundingRect.top + (hoverBoundingRect.height / 2) > clientOffset.y) ) {
	      	props.sortTask(dragIndex, hoverIndex, item.task);
	      	item.indx = hoverIndex;
	      } else if (dragIndex < hoverIndex
	      					 && (hoverBoundingRect.top + (hoverBoundingRect.height / 2) < clientOffset.y) ) {
	      	props.sortTask(dragIndex, hoverIndex, item.task);
	      	item.indx = hoverIndex;
	      }
			}

		},
		collect: monitor => ({
			isOver: monitor.isOver(),
		})
	});

	const changeTaskStatus = (e) => {
		e.preventDefault();
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		let indx = tasks.findIndex((task) => { return task.id === props.task.id });
		tasks[indx] = { ...tasks[indx], completed: !props.task.completed }
		localStorage.setItem("tasks", JSON.stringify(tasks));
		props.checkTaskstorage();
		updateCompetedPercentage();
	}

	const changeShowForm = (show, e) => {
		if (e) { e.preventDefault(); }
		setForm(show)
	}

	const deleteTask = (e) => {
		if (e) { e.preventDefault(); }
		let tasks = JSON.parse(localStorage.getItem("tasks"));
		let newTasks = tasks.filter((task) => { return task.id !== props.task.id });
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		props.checkTaskstorage();
	}

	const { id: taskId, task_group_id: taskGroupId, name } = props.task;

	drag(drop(ref));
	return (
		<div ref={ref}
				 className={`Task-Item-Cont ${props.task.completed ? "Completed" : ""}`}
				 // style={{ opacity: (isDragging ? 0.4 : 1)}}
				 >
			{
				showForm ?
					<TaskForm taskId={taskId}
										taskGroupId={taskGroupId}
										taskName={name}
										checkTaskstorage={ props.checkTaskstorage }
										cancel={ changeShowForm }/>
					:
					<React.Fragment>
						<span>{name}</span>

						<div className="Btn-Cont">
							<a href="#" onClick={(e) => {changeTaskStatus(e)}}>{ props.task.completed ? "Revive" : "Complete"}</a>
							<a href="#" onClick={(e) => {changeShowForm(true, e)}}>Edit</a>
							<a href="#" onClick={(e) => {deleteTask(e)}}>Delete</a>
						</div>
					</React.Fragment>
			}
		</div>
	)
}
