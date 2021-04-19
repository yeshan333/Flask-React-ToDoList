import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Send from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
  },
  side: {
    width: '19%',
    height: '3.4rem',
    marginLeft: '0.2rem'
  },
}));

function Iteminput(props) {
  const classes = useStyles();
  //form submit ，if use form element ，submit event has refresh problem
  //event.preventDefault()
  return (
    <Fragment>
      <TextField
        id="outlined-basic"
        label="input your task"
        variant="outlined"
        className={classes.root}
        value={props.value}
        onChange={props.handleChange}
        onKeyUp={props.handleSendClick}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.side}
        onClick={props.handleSendClick}
        endIcon={<Send />}
      >
        Send
            </Button>
    </Fragment>
  );
}

export default Iteminput;