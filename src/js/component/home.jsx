import React, { useEffect, useState } from "react";
import { userName } from "../index.js";
import Input from "./Input.jsx";

//create your first component
const Home = () => {
	const [todoList, setTodoList] = useState([]);

	//URL
	const url = `https://assets.breatheco.de/apis/fake/todos/user/${userName}`
		
	//CHECK IF THE USER IS CREATED and CREATE USER IF NOT
	useEffect(()=>{
		//GET
		function getFetch(){
			return fetch(url)
			.then(response =>{
				if(!response.ok){
					console.log("Response from GET is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.catch(error => {
				console.log('Looks like there was a problem doing GET: \n', error);
				return false
			})
	}
		//POST
		function postFetch(){
		return fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response from POST is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list initialized")
				)
			.catch(error => {
				console.log('Looks like there was a problem doing POST: \n', error);
				return false
			})
		}
        const getUserList = async () => {

			let userList = []
			let getFetchResult = await getFetch()
			
			if( getFetchResult === false){
				await postFetch()
			}else{
				userList = getFetchResult
			}
			setTodoList(userList)
		}
		getUserList();
    },[])

	// FUNCTION THAT DELETE TASKS FROM THE TODO LIST
	const deleteTask =  (index) =>
	{
		const newListOfTodos= todoList.filter((_, idx)=>idx !==index)
		setTodoList(newListOfTodos)
		//PUTFETCH
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(newListOfTodos),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response from PUT is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list initialized")
				)
			.catch(error => {
				console.log('Looks like there was a problem doing PUT: \n', error);
				return false
			})	
	}
	
	//FUNCTION THAT DELETS ALL TASKS FROM THE TODO LIST
	const cleanTasks = async () =>{
		await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		setTodoList([])
		//POSTFETCH
		await fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response from POST is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list initialized")
				)
			.catch(error => {
				console.log('Looks like there was a problem doing POST: \n', error);
				return false
			})	
	}

	// CREATING THE TASK THAT DISPLAYS AS "LI's" IN THE PAGE
	const listOfTodos= todoList.map((task, index)=>
	{
	return <li className="list-group-item d-flex justify-content-between" key={index}>{task.label}
	<button id={index} className="button btn-close justify-content-end" onClick={()=>deleteTask(index)}></button>
	</li>
	})
	console.log("todoList:", todoList)
	return (
		<div className="w-50 m-auto">
			<h1 className="text-center my-3">Todos</h1>
			<button
				className="btn btn-danger"
				onClick={cleanTasks}
			>
				Clean All Tasks
			</button>
			<ul className="list-group">
					<Input 
						todoList={todoList}
						handleSetTodoList={value=>setTodoList(value)}
						url={url}

					/>
				{
					listOfTodos.length > 0 ?
					listOfTodos
					:
					<li className="list-group-item">No tasks, add a task</li>
				}
				{(todoList.length > 0) ? <li className="list-group-item"><b>{todoList.length}</b> items left</li> : null }
			</ul>
		</div>
	);

};

export default Home;
