import React, { Component, Fragment } from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';

const InputStyle = {
  width: '100%'
}

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      inputValue: item.value
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleReEditSend = this.handleReEditSend.bind(this);
    this.handleItemStatus = this.handleItemStatus.bind(this);
  }

  //delete item
  handleDeleteClick() {
    this.props.handleDeleteItem(this.props.index);
  }

  //process edit item send event
  handleEditClick() {
    this.props.handleEditItem(this.props.index)
  }

  //Listen for edits
  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  //edit again send event
  handleReEditSend(event) {
    if (event.keyCode === 13) {
      this.props.handleReEditSend(this.props.index, this.state.inputValue);
    }
  }

  //control item isDone status
  handleItemStatus() {
    this.props.handleItemStatus(this.props.index);
  }

  render() {
    if (!this.props.item.isEditing) {
      return (
        <Fragment>
          <ListItem button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={this.props.item.isDone}
                disableRipple
                inputProps={{ 'aria-labelledby': this.props.item._id }}
                onClick={this.handleItemStatus}
              />
            </ListItemIcon>
            <ListItemText
              style={{ textDecorationLine: this.props.item.isDone ? 'line-through' : 'none' }}
              id={this.props.item._id}
            >
              {this.props.item.value}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={this.handleEditClick}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteClick}>
                <DeleteForever />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <ListItem button>
            <TextField
              id={this.props.item._id}
              label="editing"
              variant="outlined"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              onKeyUp={this.handleReEditSend}
              style={InputStyle}
            />
          </ListItem>
        </Fragment>
      );
    }
  }
}

export default TodoListItem;