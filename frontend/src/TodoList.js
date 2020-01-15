import React, {Component, Fragment} from 'react'
import TodoListItem from './TodoListItem'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            //isEdit: true,//judge is edit?
            items: [
                {'id': 't66', 'value': 'nihao', 'isEditing': false},
                {'id': 't77', 'value': 'wocao', 'isEditing': true},
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleReEditSend = this.handleReEditSend.bind(this);
    }

    //input输入监控
    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    //提交事件
    handleSendClick(event) {
        if(this.state.inputValue){
            let new_item = {
                'id': 't'+Math.random().toString ,
                'value': this.state.inputValue,
                'isEditing': false
            }
            this.setState({
                inputValue: '',
                items: [new_item, ...this.state.items]
            })
        }else{
            alert("Please enter value!")
        }
    }

    //删除列表项事件
    handleDeleteItem(index) {
        let new_items = this.state.items;
        new_items.splice(index, 1);
        this.setState({
            items: new_items
        })
    }

    //编辑列表项事件
    handleEditItem(index) {
        let new_items = this.state.items;
        new_items[index].isEditing = true;
        this.setState({
            items: new_items
        });
    }

    handleReEditSend(index, value) {
        if(value){
            let new_items = this.state.items;
            new_items[index].isEditing = false;
            new_items[index].value = value;
            this.setState({
                items: new_items
            });
        }else{
            alert("Please enter value!")
        }
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
                        onKeyPress={this.handleSendClick}
                    />
                    <button onClick={this.handleSendClick}>Send</button>
                </div>
                <ul>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <TodoListItem
                                    key={item.id+index}
                                    item={item}
                                    index={index}
                                    handleDeleteItem={this.handleDeleteItem}
                                    handleEditItem={this.handleEditItem}
                                    handleReEditSend={this.handleReEditSend}
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