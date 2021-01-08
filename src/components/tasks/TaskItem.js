export default function TaskItem(props) {
	return (
		<div>
			<span>{props.task.id}</span>
			<span>{props.task.name}</span>
		</div>
	)
}
