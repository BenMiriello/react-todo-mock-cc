import React from 'react'
import ToDoCard from './ToDoCard'

const CompletedContainer = (props) => {
    // console.log('completed container: ', props)

    let renderCompletedToDos = () => {
        return props.completedToDos.map(todo => <ToDoCard todo={todo} controlStatus={props.controlStatus} deleteToDo={props.deleteToDo} />)
    }

    return (
        <div>
            <h1>Completed Todos</h1>
            {/* Render ToDo Card for each ToDo */}
             {/* Which Array method can you use? */}
             {renderCompletedToDos()}
        </div>
    )
}

export default CompletedContainer