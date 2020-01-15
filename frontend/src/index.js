import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TodoList from './TodoList'

class Main extends Component {

    render() {
        return (
            <TodoList/>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));