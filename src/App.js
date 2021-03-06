import './App.css';

import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";

import { withSuspense } from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    // alert("Some error occured");
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/'
              render={() => <Redirect to={"/profile"} />} />

            <Route path='/dialogs'
              render={withSuspense(DialogsContainer)} />

            <Route path='/profile/:userId?'
              render={withSuspense(ProfileContainer)} />

            <Route path='/users'
              render={() => <UsersContainer />} />

            <Route path='/login'
              render={() => <LoginPage />} />

            <Route path='/news' render={() => <News />} />

            <Route path='/music' render={() => <Music />} />

            <Route path='/settings' render={() => <Settings />} />

            <Route path='*'
              render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp;