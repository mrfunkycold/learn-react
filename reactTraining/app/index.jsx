import * as React from 'react';
import * as ReactDOM from 'react-dom';
require('./index.css');

class App extends React.Component {
  render() {
    return (
      <div>
        Hello react training!
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);