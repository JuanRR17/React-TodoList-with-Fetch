import React, { useEffect, useState } from "react";
import { userName } from "../index.js";

//create your first component
const Home = () => {
	const [inputValue, setInputValue ] = useState('');
	const [todoList, setTodoList] = useState([]);

	//CREATE NEW ITEM
	const newItem = (value) =>{
		return {
			label: value,
			done: false
		}
	}

	//URL
	const url = `https://assets.breatheco.de/apis/fake/todos/user/${userName}`
	

	
	//CHECK IF THE USER IS CREATED and CREATE USER IF NOT
	useEffect(()=>{
		//GET
		const getFetch = fetch(url)
		.then(response =>{
			if(!response.ok){
				console.log("Response is not ok")
				throw Error(response.statusText);
			}
			return response.json();
		})
		.catch(error => {
			console.log('Looks like there was a problem: \n', error);
			return null
		})

		//POST
		const postFetch = fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Response2 is not ok")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list initialized")
				)
			.catch(error => {
				console.log('Looks like there was a problem2: \n', error);
				return false
			})
		
        const getUserList = async () => {

			let userList = await getFetch
			console.log("userList1:",userList)
			if(!userList){
				await postFetch
			}

			console.log("userList2:",userList)
			setTodoList(userList)
		}
		getUserList();
    },[])

	useEffect(()=>{
		if(todoList.length>0){
		const userTodos = async ()=>{
			console.log("todoList useEffect", todoList)

			const response = fetch(url, {
				method: "PUT",
				body: JSON.stringify(
				todoList),
				headers: {
				"Content-Type": "application/json"
				}
			})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
			}
		userTodos();}
	},[todoList])

	// FUNCTION THAT ALLOWS PRESS ENTER CREATE AN ARRAY WITH THE VALUE OF THE INPUT

	const pressEnterToInput = (evt) =>{
		if(evt.key === 'Enter' && inputValue !== '')
			{
			const item = newItem(inputValue);
			setTodoList([...todoList, item])
			setInputValue("")
			}
		}
	
	// FUNCTION THAT DELETE TASKS FROM THE TODO LIST
	const deleteTask= (e) =>
	{
		const newListOfTodos= todoList.filter((item, idx)=>idx !== parseInt(e.target.id))
		setTodoList(newListOfTodos)
	}
	
	//FUNCTION THAT DELETS ALL TASKS FROM THE TODO LIST
	const cleanTasks = () =>{
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		setTodoList([])
	}

	// CREATING THE TASK THAT DISPLAYS AS "LI's" IN THE PAGE
	const listOfTodos= todoList.map((task, index)=>
	{
	return <li className="list-group-item d-flex justify-content-between" key={index}>{task.label}
	<button id={index} className="button btn-close justify-content-end" onClick={deleteTask}></button>
	</li>
	})
	
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
				<input 
					className="list-group-item"
					onKeyDown={pressEnterToInput} 
					onChange={ e => setInputValue(e.target.value)} 
					value={inputValue} 
					type="text" 
					placeholder="Add a task to do"
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
