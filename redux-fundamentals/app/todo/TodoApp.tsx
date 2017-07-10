import * as React from 'react';
import { Todo, TodoAction } from './reducers/todoListReducer';
import { FilterAction, TodoFilter } from './reducers/visibilityFilterReducer';
import { FilterLink } from './FilterLink';

interface TodoAppProps {
  dispatch: (action: TodoAction | FilterAction) => void;
  todos: Todo[];
  visibilityFilter: TodoFilter;
}

interface TodoAppState {
  inputValue: string;
}

let id = 1;

class TodoApp extends React.PureComponent<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      inputValue : '',
    };
  }
  onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  }
  toggleTodo(todo: Todo) {
    this.props.dispatch({
      type: 'TOGGLE_TODO',
      id: todo.id,
    });
  }
  addTodo() {
    this.props.dispatch({
      type: 'ADD_TODO',
      text: this.state.inputValue,
      id,
    });
    id += 1;
    this.setState({ inputValue: '' });
  }
  getClassName(todo: Todo) {
    if (todo.completed) {
      return 'completed';
    }

    return '';
  }
  filterTodos() {
    const { todos, visibilityFilter } = this.props;

    return todos.filter((todo) => {
      return (visibilityFilter === 'SHOW_COMPLETED' && todo.completed) ||
        (visibilityFilter === 'SHOW_ACTIVE' && !todo.completed) ||
        (visibilityFilter === 'SHOW_ALL');
    });
  }
  renderTodos() {
    return this.filterTodos().map((todo) => {
      return (
        <li
          key={todo.id}
          className={this.getClassName(todo)}
          onClick={this.toggleTodo.bind(this, todo)}
        >
          {todo.text}
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.onInputChange} value={this.state.inputValue} />
        <button onClick={this.addTodo}>Add Todo</button>
        <ul>
          {this.renderTodos()}
        </ul>
        <p>
          Show:
          <FilterLink
            filter={'SHOW_ALL'}
            dispatch={this.props.dispatch}
            active={this.props.visibilityFilter === 'SHOW_ALL'}
          >
            All
          </FilterLink>
          <FilterLink
            filter={'SHOW_COMPLETED'}
            dispatch={this.props.dispatch}
            active={this.props.visibilityFilter === 'SHOW_COMPLETED'}
          >
            Completed
          </FilterLink>
          <FilterLink
            filter={'SHOW_ACTIVE'}
            dispatch={this.props.dispatch}
            active={this.props.visibilityFilter === 'SHOW_ACTIVE'}
          >
            Active
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default TodoApp;
