import React, {Component, Fragment} from 'react';
import List from '@material-ui/core/List';
import axios from 'axios'

import TodoListItem from './TodoListItem';
import Iteminput from './components/Iteminput';

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
            shouldUpdate: false,//flag: after post data
            items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleReEditSend = this.handleReEditSend.bind(this);
        this.handleItemStatus = this.handleItemStatus.bind(this);

    }

    getItemData() {
        axios.get('https://flask-react-todo.herokuapp.com/api/v1/items')
        .then(response => {
            this.setState({
                items: [...response.data.items_list].reverse()
            })
        })
        .catch(function(error) {
            alert(error);
        });
    }

    /*
    getItemId() {
        axios.get('http://127.0.0.1:5000/api/v1/items')
        .then(response => {
            alert(response);
            let last = response.data.items_list.pop();
            return last._id;
        })
        .catch(function(error) {
            alert(error);
        });
    }
    */

    componentDidMount() {
        //alert("Mount done")
        this.getItemData();
    }

    /*
    shouldComponentUpdate() {
        if(this.state.shouldUpdate) {
            this.getItemData();
            return true;
        }
    }
    */

    /*
    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.items)
        if (this.state.items !== prevState.items) {
            this.getItemData();
        }
    }
    */

    /*
    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.items !== prevState.items) {
            alert("event happen")
            console.log(nextProps.items, prevState.items)
            return {
                items: nextProps.items,
            };
        }
        return null;
    }
    */

    //input event monitor
    handleChange(event) {
        let  value = event.target.value
        this.setState({
            inputValue: value
        })
    }

    //process item submit event，ENTER or click
    handleSendClick(event) {
        //console.log(event.type);
        if(event.keyCode === 13 || event.type === 'click'){
            if(this.state.inputValue){
                let new_item = {
                    //'_id': '', //'t'+Math.random().toString ,
                    'value': this.state.inputValue,
                    'isEditing': false,
                    'isDone': false
                };
                this.setState({
                    inputValue: '',
                })
                axios({
                    method: 'post',
                    url: 'https://flask-react-todo.herokuapp.com/api/v1/items',
                    data: new_item,
                    headers: {'Content-Type': 'application/json'}
                }).then(
                    () => this.getItemData()//update state
                )
                //this.getItemData();
                //window.location.reload();
                //alert("/?")
                //new_item._id = this.getItemId();
                //console.log(new_item._id);
                /*
                this.setState({
                    shouldUpdate: true
                });
                */
            }else{
                alert("Please enter value!")
            }
        }
    }

    //process item delete event
    handleDeleteItem(index) {
        let delete_item = this.state.items[index];
        //delete delete_item['value'];
        //new_items.splice(index, 1);
        axios({
            method: 'delete',
            url: 'https://flask-react-todo.herokuapp.com/api/v1/items',
            data: delete_item,
            headers: {'Content-Type': 'application/json'}
        }).then(
            () => this.getItemData()//update state
        )
    }

    // item edit
    handleEditItem(index) {
        let new_items = this.state.items;
        new_items[index].isEditing = true;
        this.setState({
            items: new_items
        });
    }

    //item edit again，send again event
    handleReEditSend(index, value) {
        if(value){
            let update_item = this.state.items[index];
            update_item.isEditing = false;
            update_item.value = value;
/*             this.setState({
                items: new_items
            }); */
            axios({
                method: 'put',
                url: 'https://flask-react-todo.herokuapp.com/api/v1/items',
                data: update_item,
                headers: {'Content-Type': 'application/json'}
            }).then(
                () => this.getItemData()//update state
            )
        }else{
            alert("Please enter value!");
        }
    }

    //change item isDone status，Ajax
    handleItemStatus(index) {
        let new_items = this.state.items;
        new_items[index].isDone = !new_items[index].isDone;
        //console.log(new_items[index])
        axios({
            method: 'put',
            url: 'https://flask-react-todo.herokuapp.com/api/v1/items',
            data: new_items[index],
            headers: {'Content-Type': 'application/json'}
        }).then(
            () => this.getItemData()//update state
        )
    }

    render() {
        return (
            <Fragment>
                {/*
                <div>
                    <input
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                        onKeyUp={this.handleSendClick}
                    />
                    <button onClick={this.handleSendClick}>Send</button>
                </div>
                */}
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