import React, { Component } from 'react';
import CompletedContainer from './CompletedContainer'
import IncompleteContainer from './IncompleteContainer'
import NewToDoForm from './NewToDoForm'

export default class ToDoContainer extends Component {

  state={
    inputValue: "",
    todos: []
  }

  controlForm = (e) => {
    this.setState({inputValue: e.target.value}
      // , () => {console.log(this.state.inputValue)}
    )
  }

  componentDidMount(){
    fetch('http://localhost:3000/todos')
    .then(r => r.json())
    .then(todos => this.setState({todos})
      // , () => {console.log(this.state)}
    )
  }

  controlSubmit = () => {
    console.log('haha u submitted me' + this.state.inputValue)
  }

  completedToDos = () => {
    return this.state.todos.filter(todo => todo.completed)
  }

  incompleteToDos = () => {
    return this.state.todos.filter(todo => !todo.completed)
  }
  
  render() {
    return (
      <div id="todo-container">
        <NewToDoForm controlForm={this.controlForm} inputValue={this.state.inputValue} controlSubmit={this.controlSubmit} />
        <CompletedContainer completedToDos={this.completedToDos()} />
        <IncompleteContainer incompleteToDos={this.incompleteToDos()} />
      </div>
    );
  }
}
