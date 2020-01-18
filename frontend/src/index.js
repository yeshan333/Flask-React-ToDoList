import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


import TodoList from './TodoList';
import Copyright from './components/Copyright';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

/*     componentDidMount() {
        alert("挂载完毕")
        axios.get('http://127.0.0.1:5000/api/v1/items')
        .then(response => {
            alert(response);
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
    } */

    render() {
        return (
            <Container maxWidth="md">
                <CssBaseline />
                <Typography variant="h3" component="h1" gutterBottom align="center" style={{marginTop: '1.0rem'}}>
                    React-Flask To-Do
                </Typography>
                    <br />
                <TodoList items={this.state.items}/>
                <Copyright />
          </Container>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));