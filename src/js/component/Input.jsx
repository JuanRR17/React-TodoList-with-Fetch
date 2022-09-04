import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
    handleSetTodoList
}) => {

const pressEnterToInput = (evt) =>{
    if(evt.key === 'Enter' && inputValue !== '')
        {
        const item = newItem(inputValue);
        handleSetTodoList([...todoList, item])
        setInputValue("")
        }
    }
  return (
    <input 
    className="list-group-item"
    onKeyDown={pressEnterToInput} 
    onChange={ e => setInputValue(e.target.value)} 
    value={inputValue} 
    type="text" 
    placeholder="Add a task to do"
    />
  )
}

Input.propTypes = {}

export default Input