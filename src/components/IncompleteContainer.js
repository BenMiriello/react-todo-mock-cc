import SearchBarComponent from './SearchBarComponent'
import ToDoCard from './ToDoCard'
import React, { Component } from 'react';

export default class IncompleteContainer extends Component {

    // When implementing the search bar, consider implementing state here to make it dynamic. 
    // i.e everytime you type in the input field, the ToDos are immediately filtered
    
    
    // When implementing the search bar, consider implementing a function that handles setState and pass this function down to 
    // SearchBarComponent
    

    // When implementing the search term, consider implementing a function that FILTERs the todos.
    // To determine which to filter, find out which ToDo title INCLUDES the search term typed.

  renderIncompleteToDos = () => {
    return this.props.incompleteToDos.map(todo => <ToDoCard key={`${todo.id}${todo.title}`} todo={todo} changeStatus={this.props.changeStatus} deleteToDo={this.props.deleteToDo} />)
  }

  render() {
    // console.log(this.props)
    return (
        <div>
            <h1>Incomplete Todos</h1>
            <SearchBarComponent searchTerm={this.props.searchTerm} handleOnChange={this.props.handleOnChange}/>
            {/* Render ToDo Card for each ToDo */} 
            {/* Which Array method can you use? */}
            {this.renderIncompleteToDos()}
        </div>
    )
  }
}
