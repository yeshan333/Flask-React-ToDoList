import React, {Component, Fragment} from 'react';
import List from '@material-ui/core/List';
import axios from 'axios'

import TodoListItem from './TodoListItem';
import Iteminput from './components/Iteminput';

//axios Ajax
/* axios.create({
    baseURL: "",
    responseType: "json"
}); */

const ListStyle = {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '1.0rem'
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            //isEdit: true,//judge is edit?
            items: []
/*             items: [
                {'_id': 't66', 'value': 'nihao', 'isEditing': false, 'isDone': true},
                {'_id': 't77', 'value': 'wocao', 'isEditing': false, 'isDone': false},
                {'_id': 't77', 'value': 'wocao', 'isEditing': true, 'isDone': false},
            ] */
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleReEditSend = this.handleReEditSend.bind(this);
        this.handleItemStatus = this.handleItemStatus.bind(this);

    }

/*     componentDidMount() {
        alert("ToDo挂载完毕")
    } */
    componentDidMount() {
        //alert("挂载完毕")
        axios.get('http://127.0.0.1:5000/api/v1/items')
        .then(response => {
            //alert(response);
            //console.log(response.data.items_list[0]);
            //let new_items = response.data.items_list;
            //console.log('?' + new_items)//?[object Object],[object Object]
            this.setState({
                items: [...response.data.items_list]
            })
        })
        .catch(function(error) {
            alert(error);
        });
    }
/*     UNSAFE_componentWillMount(){
        axios.get('http://127.0.0.1:5000/api/v1/items')
        .then(response => {
            alert(response);
            //console.log(response.data.items_list[0]);
            let new_items = response.data.items_list;
            console.log('?' + new_items)//?[object Object],[object Object]
            this.setState({
                items: [...response.data.items_list]
            })
        })
        .catch(function(error) {
            alert(error);
            alert("??");
        });
    } */
/*
    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.items !== prevState.items) {
            alert("?????????")
            console.log(nextProps.items, prevState.items)
            return {
                items: nextProps.items,
            };
        }
        return null;
    } */

    //input输入监控
    handleChange(event) {
        let  value = event.target.value
        this.setState({
            inputValue: value
        })
    }

    //提交事件
    handleSendClick(event) {
        //console.log(event.type);
        if(event.keyCode === 13 || event.type === 'click'){
            if(this.state.inputValue){
                let new_item = {
                    '_id': 't'+Math.random().toString ,
                    'value': this.state.inputValue,
                    'isEditing': false,
                    'isDone': false
                }
                this.setState({
                    inputValue: '',
                    items: [new_item, ...this.state.items]
                });
            }else{
                alert("Please enter value!")
            }
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
            alert("Please enter value!");
        }
    }

    handleItemStatus(index) {
        let new_items = this.state.items;
        new_items[index].isDone = !new_items[index].isDone;
        this.setState({
            items: new_items
        });
    }

    render() {
        return (
            <Fragment>
{/*                 <div>
                    <input
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        onKeyUp={this.handleSendClick}
                    />
                    <button onClick={this.handleSendClick}>Send</button>
                </div> */}
                <Iteminput
                    value={this.state.inputValue}
                    handleChange={this.handleChange}
                    handleSendClick={this.handleSendClick}
                />
                <List style={ListStyle}>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                    <TodoListItem
                                        key={item._id+index}
                                        item={item}
                                        index={index}
                                        handleDeleteItem={this.handleDeleteItem}
                                        handleEditItem={this.handleEditItem}
                                        handleReEditSend={this.handleReEditSend}
                                        handleItemStatus={this.handleItemStatus}
                                    />
                            );
                        })
                    }
                </List>
            </Fragment>
        );
    }
}

export default TodoList;