import React, { useState, useEffect } from 'react';
import '../../App.css';
import TaskGroupItem from './TaskGroupItem';
import AddTaskGroupForm from "./AddTaskGroupForm";
// import App from '../../App';

function List() {
	const [taskGroups, setTaskGroup] = useState([]);

  const checkTaskGroupStorage = () => {
  	let taskGroups = localStorage.getItem('taskGroups');
		if (!taskGroups) { return; }
		setTaskGroup(JSON.parse(taskGroups));
  }

	useEffect(() => {
		checkTaskGroupStorage();
  }, []);

	return (
		<React.Fragment>
			<h2 className="App-title">Task Groups</h2>
			<div className="List-Cont">
				{
					taskGroups.map((taskGroup) => {
						return <TaskGroupItem key={taskGroup.id}
																	taskGroup={ taskGroup }
																	checkTaskGroupStorage={ checkTaskGroupStorage }/>
					})
				}
				<AddTaskGroupForm checkTaskGroupStorage={ checkTaskGroupStorage }/>
			</div>
		</React.Fragment>
	)
}

export default List;
