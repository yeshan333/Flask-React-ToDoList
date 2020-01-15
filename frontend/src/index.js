import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TodoList from './TodoList'

class App extends Component {
    render() {
        return (
            <TodoList />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));