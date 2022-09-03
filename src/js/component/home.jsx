import React, { useState } from "react";
import ToDo from "./ToDo.jsx";

//create your first component
const Home = () => {
	const [toDoList, setToDoList]=useState([]);
	const [value, setValue]=useState("");
	const [id, setId] = useState(1);

	const handleKeyDown = (e) =>{
		if(e.key === 'Enter' && value!==""){
			const item = {
				id: id,
				string: value
			}
			setToDoList([...toDoList,item])
			setValue("")
			setId(id => id + 1)
		}
	}
console.log(toDoList)
	return (
		<div className="w-50 m-auto">
			<h1 className="text-center">todos</h1>
			<ul className="list-group">
				<input className="list-group-item" 
					onKeyDown={handleKeyDown}
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
				{toDoList.length > 0 ?
				toDoList.map(toDo => {
					return <ToDo 
					toDo={toDo} 
					toDoList={toDoList}
					key={toDo.id} 
					handleSetToDoList={value=>setToDoList(value)}/>
					})
					:
					<li className="list-group-item">No tasks, add a task</li>
					}
				{toDoList.length > 0 && <li className="list-group-item">{toDoList.length} items left</li>}
			</ul>
		</div>
	);
};

export default Home;
