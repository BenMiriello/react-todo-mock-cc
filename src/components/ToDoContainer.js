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
    // console.log('haha u submitted me' + this.state.inputValue)
    fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({title: this.state.inputValue, completed: false})
    })
    // .then(r => r.json())
    // .then(newToDo => )
    // ...
  }

  completedToDos = () => {
    return this.state.todos.filter(todo => todo.completed)
  }

  incompleteToDos = () => {
    let allIncomplete = this.state.todos.filter(todo => !todo.completed)
    // console.log('allincomplete', allIncomplete)
    return allIncomplete.filter(todo => todo.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  controlStatus = (todo) => {
    // console.log('changing status', title)

    // let todoToChangeStatus = this.state.todos.find(todo => todo.title === title)
    // console.log(todoToChangeStatus)

    // return this.state.todos.find(todo => todo.title === title)
    // todoToChangeStatus.completed = !todoToChangeStatus.completed

    // console.log(todo)
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({completed: !todo.completed})
    })
    .then(fetch('http://localhost:3000/todos')
      .then(r => r.json())
      .then(todos => this.setState({todos}))
    )
    
  }

  deleteToDo = (todo) => {
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({completed: !todo.completed})
    })
    .then(r => r.json())
    .then(fetch('http://localhost:3000/todos')
      .then(r => r.json())
      .then(todos => this.setState({todos}))
    )
    // .then(todoFromDB => {
    //   delete this.state.todos.find(todo => todo.id === todoFromDB.id)
    //   // delete todoToDelete
    //   this.setState(this.state)
    // })
  }

handleOnChange = (e) => {
  // console.log('haha u changed me')
  // console.log(e.target.value)
  this.setState({searchTerm: e.target.value})
}
  
  render() {
    return (
      <div id="todo-container">
        <NewToDoForm controlForm={this.controlForm} inputValue={this.state.inputValue} controlSubmit={this.controlSubmit} />
        <CompletedContainer completedToDos={this.completedToDos()} controlStatus={this.controlStatus} deleteToDo={this.deleteToDo} />
        <IncompleteContainer searchTerm={this.state.searchTerm} handleOnChange={this.handleOnChange} incompleteToDos={this.incompleteToDos()} controlStatus={this.controlStatus} deleteToDo={this.deleteToDo} />
      </div>
    );
  }
}
