// @flow
import React from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore'; // for side effects

import { connect } from 'react-redux';
import {
    withRouter,
    Route,
    Link,
} from 'react-router-dom';

import type { DispatchProp } from 'react-redux';
import type { FirebaseUser } from 'firebase';

import { Sidebar, Menu, Segment, Container, Button, Icon } from 'semantic-ui-react';

import Home from './components/Home';
import Editor from './components/Editor/Editor';

import { login, logout } from './actions/auth';
import type AppState from './AppState';


import SignIn from './components/SignIn';

// import styles from './App.css';

type State = {
    menuVisible: boolean,
}

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

/*
type DBProps = {
    db: Object,
}

/*export const withDB = (Component: React.Component<{...DBProps, ...P}>): React.Component<P> => {

}*/

class App extends React.Component<Props, State> {
    state = {
        menuVisible: false,
    }
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

    toggleMenu = () => this.setState({ menuVisible: !this.state.menuVisible })

    render() {
        return (
            <Container fluid>
                <Button animated="vertical" onClick={this.toggleMenu}>
                    <Button.Content hidden>Menu</Button.Content>
                    <Button.Content visible>
                        <Icon name="sidebar" />
                    </Button.Content>
                </Button>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='scale down' width='thin' visible={this.state.menuVisible} icon='labeled' vertical inverted>
                        <Menu.Item name='home'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item name='gamepad'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item name='camera'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <h1>{this.props.config.appTitle}</h1>
                            <SignIn />
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/edit">Editor</Link></li>
                            </ul>
                            <Route exact path="/" component={Home} />
                            <Route path="/edit" component={Editor} />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Container>
        );
    }
}

export default withRouter(connect()(App));
