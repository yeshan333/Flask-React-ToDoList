import React, {Component, Fragment} from 'react'
import TodoListItem from './TodoListItem'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            items: [
                "新年",
                "你好"
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleSendClick(event) {
        this.setState({
            items: [this.state.inputValue, ...this.state.items]
        })
    }

    handleDeleteItem(index) {
        let new_items = this.state.items;
        new_items.splice(index, 1);
        this.setState({
            items: new_items
        })
    }

    render() {
        return (
            <Fragment>
                <h1>To-Do List</h1>
                <div>
                    <label>Task：</label>
                    <input
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSendClick}>Send</button>
                </div>
                <ul>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <TodoListItem
                                    key={item+index}
                                    item={item}
                                    index={index}
                                    handleDeleteItem={this.handleDeleteItem}
                                />
                            );
                        })
                    }
                </ul>
            </Fragment>
        );
    }
}

export default TodoList;