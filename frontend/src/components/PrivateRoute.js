import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Backend_Service_URL from '../config';

export const fakeAuth = {
  isAuthenticated: false,
  user_email: '',
  authenticate(user_data, callback) {
    axios({
      method: 'post',
      url: Backend_Service_URL + '/api/v1/users',
      data: user_data,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        fakeAuth.isAuthenticated = true;
        // console.log("登录响应", response);
        fakeAuth.user_email = user_data['email'];
        callback();
        // setTimeout(callback, 100);  // fake async, 登录时延模拟
      })
      .catch(error => {
        // alert(error);
        // console.log(error);
        alert("user not exist or your password is wrong");
      });
  },
  signout(callback) {
    let user_data = { 'email': fakeAuth.user_email };
    axios({
      method: 'put',
      url: Backend_Service_URL + '/api/v1/users',
      data: user_data,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        fakeAuth.isAuthenticated = false;
        alert("Bye!")
        callback();
        // setTimeout(callback, 100);
      })
      .catch(error => {
        alert(error);
      });
  }
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
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