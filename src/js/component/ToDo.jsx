import React from 'react'
import PropTypes from 'prop-types'

const ToDo = ({
    toDo,
    toDoList,
    handleSetToDoList
}) => {

    const handleRemoveButton = () =>{
        handleSetToDoList(toDoList.filter(item=>item.id!==toDo.id))
    }
   
  return (
    <li className="list-group-item">
        <div className='d-flex justify-content-between'>
            {toDo.string} 
            <button 
            onClick={handleRemoveButton} 
            type="button" 
            className="btn-close closeButton" 
            aria-label="Close">
            </button>
        </div>
    </li>
  )
}

ToDo.propTypes = {
    toDo:PropTypes.object,
    toDoList:PropTypes.array,
    handleSetToDoList:PropTypes.func
}

export default ToDo