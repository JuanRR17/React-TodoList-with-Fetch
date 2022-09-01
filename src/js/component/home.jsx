import React, { useState } from "react";
import ToDo from "./ToDo.jsx";

//create your first component
const Home = () => {
	const [toDoList, setToDoList]=useState([]);
	const [value, setValue]=useState("");
	const [id, setId] = useState("1");

	const handleKeyDown = (e) =>{
		if(e.key === 'Enter'){
			let item = {
				id: id,
				string: e.target.value
			}
			setToDoList([...toDoList,item])
			setValue("")
			setId(id => id + 1)
		}
	}

	return (
			<div className="w-50 m-auto">
				<h1 className="text-center">todos</h1>
				<ul className="list-group">
					<input className="list-group-item" 
						onKeyDown={handleKeyDown}
						onChange={e => setValue(e.target.value)}
						value={value}
					/>
					{toDoList.map((toDo) => {
						return <ToDo 
						toDo={toDo} 
						toDoList={toDoList}
						key={toDo.id} 
						handleSetToDoList={value=>setToDoList(value)}/>
						})}
				</ul>
			</div>
	);
};

export default Home;
