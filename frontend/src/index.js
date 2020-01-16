import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import TodoList from './TodoList';
import Copyright from './components/Copyright';

class Main extends Component {

    render() {
        return (
            <Container maxWidth="md">
                <CssBaseline />
                <Typography variant="h3" component="h1" gutterBottom align="center" style={{marginTop: '1.0rem'}}>
                    React-Flask To-Do
                </Typography>
                    <br />
                <TodoList />
                <Copyright />
          </Container>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));