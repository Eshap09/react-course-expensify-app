import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';




//issue is after logging in when we click dashboard it redirects the page to ogin pagee

// 1.create PublicRoute(copy the privateroute)
//2.redirect to /dashboard if logged in
//3.render component if not logged in
//4.use it for the login page



export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
          
      ) : (
        <Component {...props} />
        )
    )} />
  );
//<component> makes them stay on the same page or can say allows to view the page if not logged in

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
