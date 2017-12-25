// @flow
import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
    withRouter,
    Route,
    Link,
} from 'react-router-dom';

import type { DispatchProp } from 'react-redux';
import type { User } from 'firebase';

import Home from './components/Home';
import Editor from './components/Editor/Editor';

import { login, logout } from './actions/auth';
import type AppState from './AppState';


import SignIn from './components/SignIn';

// import styles from './App.css';

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


class App extends React.Component<Props> {
    componentWillMount() {
        firebase.initializeApp(this.props.config.firebase);
        firebase.auth().useDeviceLanguage();
        firebase.auth().onAuthStateChanged((user: ?User) => {
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
        return (
            <div>
                <h1>{this.props.config.appTitle}</h1>
                <SignIn />
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/edit">Editor</Link></li>
                </ul>
                <Route exact path="/" component={Home} />
                <Route path="/edit" component={Editor} />
            </div>
        );
    }
}

export default withRouter(connect()(App));
