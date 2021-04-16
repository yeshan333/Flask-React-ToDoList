import React, {useState, Component, Fragment} from 'react';
import SignInSide from './SignInSide';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import axios from 'axios';
import TodoList from './TodoList';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import logo from './images/logo.png';

import Copyright from './components/Copyright';

import Backend_Service_URL from './config';

class App extends Component {

    render() {
        return (
            <Container maxWidth="md">
                <CssBaseline />
                <Typography variant="h3" component="h1" gutterBottom align="center" style={{marginTop: '1.0rem'}}>
                <img alt="logo" src={logo} style={{width: '30.0rem', height: '7.0rem'}} />
                <br />
                <LogoutButton />
                </Typography>
                <TodoList />
                <Copyright />
            </Container>
        );
    }
}


// core: Route
function Auth() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <ControlSignIn />
            </Route>
            <PrivateRoute path="/">
                <App />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }

const fakeAuth = {
    isAuthenticated: false,
    user_email: '',
    authenticate(user_data, callback) {
        axios({
            method: 'post',
            url: Backend_Service_URL + '/api/v1/users',
            data: user_data,
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            fakeAuth.isAuthenticated = true;
            fakeAuth.user_email = user_data['email'];
            setTimeout(callback, 100);  // fake async, 登录时延模拟
        })
        .catch(function(error) {
            alert(error);
            alert("user not exist or your password is wrong")
        });
    },
    signout(callback) {
        let user_data = {'email': fakeAuth.user_email};
        axios({
            method: 'put',
            url: Backend_Service_URL + '/api/v1/users',
            data: user_data,
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            fakeAuth.isAuthenticated = false;
            alert("Bye!")
            setTimeout(callback, 100);
        })
        .catch(function(error) {
            alert(error);
        });
    }
};

function LogoutButton() {
    let history = useHistory();

    return fakeAuth.isAuthenticated ? (
        <Fragment>
            <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                fakeAuth.signout(() => history.push("/"));
            }}>
                Sign out
            </Button>
            <br />
        </Fragment>
        ) : (
        <Fragment>
            <h1>You are not logged in.now you are in public page</h1>
        </Fragment>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                fakeAuth.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                />
            )
            }
        />
    );
}

function ControlSignIn () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = (user_data) => {
      fakeAuth.authenticate(user_data, () => {
        history.replace(from);
      });
    };

    const handleSubmit = (event) => {
        //event.preventDefault();
        if(email === '' || password === '') {
            alert("Please input your password or email");
        }else{
            let user_data = {'email': email, 'password': password};
            login(user_data);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <SignInSide
            email={email}
            password={password}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit = {handleSubmit}
        />
    );
}

export default Auth;