import React, {Component, Fragment} from 'react'

class TodoListItem extends Component {
    constructor(props){
        super(props);
        const {item} = this.props;
        this.state = {
            inputValue : item.value
        };

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleReEditSend = this.handleReEditSend.bind(this);
    }

    //删除事项
    handleDeleteClick() {
        this.props.handleDeleteItem(this.props.index);
    }

    handleEditClick() {
        this.props.handleEditItem(this.props.index)
    }

    //监听编辑修改
    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    //再编辑提交
    handleReEditSend(event) {
        if(event.keyCode === 13){
            this.props.handleReEditSend(this.props.index, this.state.inputValue);
        }
    }

    render() {
        if(!this.props.item.isEditing){
            return (
                <Fragment>
                    <li>
                        <button onClick={this.handleDeleteClick}>delete</button>
                        <button onClick={this.handleEditClick}>edit</button>
                        {this.props.item.value}
                    </li>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <li>
                        <input
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            onKeyUp={this.handleReEditSend}
                        />
                    </li>
                </Fragment>
            );
        }
    }
}

export default TodoListItem;