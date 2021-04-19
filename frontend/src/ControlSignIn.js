import React, { useState, Component, Fragment } from 'react';

import SignInSide from './SignInSide';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";

import TodoList from './TodoList';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import logo from './images/logo.png';

import Copyright from './components/Copyright';
import { PrivateRoute, fakeAuth } from './components/PrivateRoute';

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

function ControlSignIn() {
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
    if (email === '' || password === '') {
      alert("Please input your password or email");
    } else {
      let user_data = { 'email': email, 'password': password };
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
      handleSubmit={handleSubmit}
    />
  );
}

class App extends Component {

  render() {
    return (
      <Container maxWidth="md">
        <CssBaseline />
        <Typography variant="h3" component="h1" gutterBottom align="center" style={{ marginTop: '1.0rem' }}>
          <img alt="logo" src={logo} style={{ width: '30.0rem', height: '7.0rem' }} />
          <br />
          <LogoutButton />
        </Typography>
        <TodoList />
        <br />
        <Copyright />
      </Container>
    );
  }
}

// core: Auth Route
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

export default Auth;