import React, { Component } from 'react';
import CompletedContainer from './CompletedContainer'
import IncompleteContainer from './IncompleteContainer'
import NewToDoForm from './NewToDoForm'

export default class ToDoContainer extends Component {

  state={
    inputValue: "",
    todos: [],
    searchTerm: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/todos')
    .then(r => r.json())
    .then(todos => this.setState({todos})
    )
  }

  controlSubmit = () => {
    fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({title: this.state.inputValue, completed: false})
    })
    // .then(this.fetchAllToDos)
    .then(r => r.json())
    .then(newToDo => {
      let todoArr = [...this.state.todos, newToDo]
      this.setState({
        todos: todoArr
      })
    })
  }

  changeStatus = (todo) => {
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({completed: !todo.completed})
    })
    // .then(this.fetchAllToDos)
    .then(r => r.json())
    .then(updatedToDo => {
      let todoArr = [...this.state.todos, updatedToDo]
      this.setState({
        todos: todoArr
      })
    })
  }

  deleteToDo = (todo) => {
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "DELETE"
    })
      .then(this.fetchAllToDos)
      // .then(r => r.json())
      // .then(todoFromDB => {
      //   delete this.state.todos.find(todo => todo.id === todoFromDB.id)
      //   // delete todoToDelete
      //   this.setState(this.state)
      // })
  }

  fetchAllToDos = () => {
    fetch('http://localhost:3000/todos')
      .then(r => r.json())
      .then(todos => this.setState({todos}, () => {console.log('state changed', this.state)} ))
  }

  controlForm = (e) => {
    this.setState({inputValue: e.target.value}
    )
  }

  completedToDos = () => {
    return this.state.todos.filter(todo => todo.completed)
  }

  incompleteToDos = () => {
    let allIncomplete = this.state.todos.filter(todo => !todo.completed)
    return allIncomplete.filter(todo => todo.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  handleOnChange = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  render() {
    return (
      <div id="todo-container">
        <NewToDoForm controlForm={this.controlForm} inputValue={this.state.inputValue} controlSubmit={this.controlSubmit} />
        <CompletedContainer completedToDos={this.completedToDos()} changeStatus={this.changeStatus} deleteToDo={this.deleteToDo} />
        <IncompleteContainer searchTerm={this.state.searchTerm} handleOnChange={this.handleOnChange} incompleteToDos={this.incompleteToDos()} changeStatus={this.changeStatus} deleteToDo={this.deleteToDo} />
      </div>
    );
  }
}

