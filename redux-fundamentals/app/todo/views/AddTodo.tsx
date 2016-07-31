import * as React from 'react';
import ActionTypes from '../reducers/ActionTypes.ts';

export interface AddTodoProps {
  store: any
}

export interface AddTodoState {
  inputValue: string
}

let id = 0;

class AddTodo extends React.Component<AddTodoProps,AddTodoState> {
  constructor() {
    super();

    this.state = {
      inputValue: ''
    }
  }

  updateInputValue(e) {
    e.preventDefault();
    this.setState({inputValue: e.target.value});
  }

  addTodo() {
    this.props.store.dispatch({
      text: this.state.inputValue,
      type: ActionTypes.ADD_TODO,
      id: id++
    });

    this.setState({inputValue: ''});
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} />
        <button onClick={this.addTodo.bind(this)}>Add Todo</button>
      </div>
    )
  }
}

export default AddTodo;