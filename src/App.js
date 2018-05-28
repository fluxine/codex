// @flow
import React from 'react';
import firebase, { type FirebaseUser } from 'firebase';
import { connect, type DispatchProp } from 'react-redux';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { FocusStyleManager } from '@blueprintjs/core';

import PageWrapper from './components/pages/PageWrapper';
import Unrouted from './components/pages/Unrouted';
import Home from './components/pages/Home';
import UserInfo from './components/pages/UserInfo';
import Editor from './components/pages/Editor/Editor';

import { login, logout } from './actions/auth';
import type AppState from './AppState';

import AppMenu from './components/AppMenu/AppMenu';

import './App.less';

FocusStyleManager.onlyShowFocusOnTabs();

type Props = {
    config: {
        appTitle: string,
        firebase: {
            apiKey: string,
            authDomain: string,
            databaseURL: string,
            projectId: string,
            storageBucket: string,
            messagingSenderId: string
        }
    },
} & DispatchProp<AppState>;

// PageRoute simply insert a route by substituting the component with its wrapped counterpart
const PageRoute = (routeProps: React.ElementProps<typeof Route>) => (
  <Route {...routeProps} component={PageWrapper(routeProps.component)} />
);

class App extends React.Component<Props> {

  componentWillMount() {
    firebase.initializeApp(this.props.config.firebase);
    firebase.auth().useDeviceLanguage();
    firebase.auth().onAuthStateChanged((user: ?FirebaseUser) => {
      this.props.dispatch(user ? login(user) : logout());
    });
    /* firebase.auth().getRedirectResult().then((result) => {
        debugger;
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
        }).catch(function(error) {
        debugger;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });
        */
  }

  props: Props

  render() {
    return [
      <AppMenu key="menu" title={this.props.config.appTitle} />,
      <Switch key="routing">
        { PageRoute({ path: '/', component: Home, exact: true }) }
        { PageRoute({ path: '/me', component: UserInfo, exact: true }) }
        { PageRoute({ path: '/edit', component: Editor }) }
        { PageRoute({ component: Unrouted }) }
      </Switch>,
    ];
  }

}

export default withRouter(connect()(App));
