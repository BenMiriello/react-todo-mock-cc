import React, { Component } from 'react';

export default class NewToDoForm extends Component {

  handleChange = (e) => {
    // console.log(e.target.value)
    this.props.controlForm(e)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.controlSubmit()
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="ui form">
            <h1>New ToDo</h1>
            <div className="field">
                <label>Title</label>
                <input onChange={this.handleChange} value={this.props.inputValue} type="text" name="title" placeholder="Title"/>
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
