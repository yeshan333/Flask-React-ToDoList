import React, {Component, Fragment} from 'react'

class TodoListItem extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleDeleteItem(this.props.index);
    }

    render() {
        return (
            <Fragment>
                <li>
                    <button onClick={this.handleClick}>delete</button>
                    {this.props.item}
                </li>
            </Fragment>
        );
    }
}

export default TodoListItem;