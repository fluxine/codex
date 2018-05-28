// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import firebase, { type FirebaseUser } from 'firebase';
import { withRouter, NavLink, type ContextRouter } from 'react-router-dom';
import { Navbar, Alignment, Icon } from '@blueprintjs/core';

import styles from './AppMenu.less';
import userNoPhoto from './userNoPhoto.png';

type Props = {|
  ...ContextRouter,
  title: string,
  // injected
  authStateIsKnown: boolean,
  user: FirebaseUser,
|}

class AppMenu extends React.Component<Props> {

  props: Props

  signOut = () => {
    firebase.auth().signOut().then(() => {
      // TODO ?
    }).catch(() => {
      // TODO
    });
  }

  signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  navigateTo = (path: string) => () => {
    this.props.history.push(path);
  }

  render() {
    const { user, authStateIsKnown, title } = this.props;
    const signedIn = authStateIsKnown && !!user;
    return (
      <Navbar fixedToTop className={styles.navbar}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <NavLink
              to="/"
              exact
              className={styles.item}
              activeClassName={styles.active}
            >
              {title}
            </NavLink>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Choose>
            <When condition={signedIn}>
              <NavLink
                to="/edit"
                exact
                className={styles.item}
                activeClassName={styles.active}
                style={{ marginRight: '20px' }}
              >
                <Icon icon="edit" iconSize={20} />
              </NavLink>
              <NavLink to="/me" exact activeClassName={styles.active}>
                <img alt="signed-in user avatar" src={user.photoURL || userNoPhoto} className={styles.avatar} />
              </NavLink>
              <Icon icon="log-out" iconSize={20} className={styles.item} onClick={this.signOut} />
            </When>
            <Otherwise>
              <Icon icon="log-in" iconSize={20} className={styles.item} onClick={this.signIn} />
            </Otherwise>
          </Choose>
        </Navbar.Group>
      </Navbar>
    );
  }

}

const map = ({ auth: { user, authStateIsKnown } }) => ({ user, authStateIsKnown });

export default withRouter(connect(map)(AppMenu));
