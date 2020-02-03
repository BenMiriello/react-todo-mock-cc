import SearchBarComponent from './SearchBarComponent'
import ToDoCard from './ToDoCard'
import React, { Component } from 'react';

export default class ToDoSubContainer extends Component {

    // When implementing the search bar, consider implementing state here to make it dynamic. 
    // i.e everytime you type in the input field, the ToDos are immediately filtered
    
    
    // When implementing the search bar, consider implementing a function that handles setState and pass this function down to 
    // SearchBarComponent
    

    // When implementing the search term, consider implementing a function that FILTERs the todos.
    // To determine which to filter, find out which ToDo title INCLUDES the search term typed.

  renderToDos = () => {
      return this.props.todos.map(todo => 
        <ToDoCard 
          key={
            todo.id 
            + '-' 
            + todo.title.split(' ')[0] 
            + '...' 
            + todo.title.length 
            + '-chars' 
          } 
          todo={todo} 
          changeStatus={this.props.changeStatus} 
          deleteToDo={this.props.deleteToDo} 
        />)
  }

  render() {
    return (
      <div>
        <h1>{ this.props.completeContainer ? "Complete" : "Incomplete" } Todos</h1>
        { this.props.completeContainer ? null : <SearchBarComponent searchTerm={this.props.searchTerm} handleOnChange={this.props.handleOnChange}/> }
        {/* Render ToDo Card for each ToDo */} 
        {/* Which Array method can you use? */}
        {this.renderToDos()}
      </div>
    )
  }
}
