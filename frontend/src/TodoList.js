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
            shouldUpdate: false,//flag: after post data
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

    getItemData() {
        axios.get('http://127.0.0.1:5000/api/v1/items')
        .then(response => {
            //alert(response);
            //console.log(response.data.items_list[0]);
            //let new_items = response.data.items_list;
            //console.log('?' + new_items)//?[object Object],[object Object]
            this.setState({
                items: [...response.data.items_list].reverse()
            })
        })
        .catch(function(error) {
            alert(error);
        });
    }

    getItemId() {
        axios.get('http://127.0.0.1:5000/api/v1/items')
        .then(response => {
            alert(response);
            //console.log(response.data.items_list[0]);
            //let new_items = response.data.items_list;
            //console.log('?' + new_items)//?[object Object],[object Object]
/*             this.setState({
                items: [...response.data.items_list].reverse()
            }) */
            let last = response.data.items_list.pop();
            return last._id;
        })
        .catch(function(error) {
            alert(error);
        });
    }

    componentDidMount() {
        //alert("挂载完毕")
        this.getItemData();
    }

/*     shouldComponentUpdate() {
        if(this.state.shouldUpdate) {
            this.getItemData();
            return true;
        }
    } */

/*     componentDidUpdate(prevProps, prevState) {
        console.log(prevState.items)
        if (this.state.items !== prevState.items) {
            this.getItemData();
        }
      } */

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
                    //'_id': '', //'t'+Math.random().toString ,
                    'value': this.state.inputValue,
                    'isEditing': false,
                    'isDone': false
                };
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:5000/api/v1/items',
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
/*                 this.setState({
                    shouldUpdate: true
                }); */
            }else{
                alert("Please enter value!")
            }
        }
    }

    //删除列表项事件
    handleDeleteItem(index) {
        let delete_item = this.state.items[index];
        //delete delete_item['value'];
        //new_items.splice(index, 1);
/*         this.setState({
            items: new_items
        }) */
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:5000/api/v1/items',
            data: delete_item,
            headers: {'Content-Type': 'application/json'}
        }).then(
            () => this.getItemData()//update state
        )
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
            let update_item = this.state.items[index];
            update_item.isEditing = false;
            update_item.value = value;
/*             this.setState({
                items: new_items
            }); */
            axios({
                method: 'put',
                url: 'http://127.0.0.1:5000/api/v1/items',
                data: update_item,
                headers: {'Content-Type': 'application/json'}
            }).then(
                () => this.getItemData()//update state
            )
        }else{
            alert("Please enter value!");
        }
    }

    handleItemStatus(index) {
        let new_items = this.state.items;
        new_items[index].isDone = !new_items[index].isDone;
        //console.log(new_items[index])
        axios({
            method: 'put',
            url: 'http://127.0.0.1:5000/api/v1/items',
            data: new_items[index],
            headers: {'Content-Type': 'application/json'}
        }).then(
            () => this.getItemData()//update state
        )
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