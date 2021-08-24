import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './components/LogoutButton';
// import LoginButton from './components/LoginButton';
import Home from './components/Home';
import Login from './components/Login';
import FavFlowers from './components/FavFlowers';



class App extends React.Component {

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `Home` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <LogoutButton /> : <Login />}
                {isAuthenticated ? <Home /> : null }
              </Route>
              <Route exact path="/favFlowers">
              {isAuthenticated ? <FavFlowers /> : <Login /> }
                {/* TODO: if the user is logged in, render the `FavFlowers` component, if they are not, render the `Login` component */}
              </Route>
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
