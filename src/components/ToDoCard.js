import React from 'react'

const ToDoCard = (props) => {
  // console.log(props)

  let handleStatusClick = () => {
    props.changeStatus(props.todo)
  }

  return (
  <div className="ui card">
      <div className="content">
        <div className="header">{props.todo.title}</div>
        {/* The button will require some conditional rendering. 
          If the button is under the Incomplete Container, button should be blue and text should say Complete
          If the button is under Complete Container, button should be orange and text should say Incomplete 
          */}
        {props.todo.completed ? <button onClick={handleStatusClick} className="ui button yellow">Incomplete</button> : <button onClick={handleStatusClick} className="ui button blue">Complete</button>}
        <button onClick={() => props.deleteToDo(props.todo)} className="ui button red">Delete</button>
      </div>
      
  </div>
  )
}

export default ToDoCard

