import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from './images/logo.png';

import TodoList from './TodoList';
import Copyright from './components/Copyright';

class App extends Component {

    render() {
        return (
            <Container maxWidth="md">
                <CssBaseline />
                <Typography variant="h3" component="h1" gutterBottom align="center" style={{marginTop: '1.0rem'}}>
                <img alt="logo" src={logo} style={{width: '30.0rem', height: '7.0rem'}} />
                </Typography>
                <TodoList />
                <Copyright />
          </Container>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));