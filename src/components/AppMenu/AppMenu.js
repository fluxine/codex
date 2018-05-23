// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import firebase, { type FirebaseUser } from 'firebase';
import { withRouter, type ContextRouter } from 'react-router-dom';
import { Navbar, Button, Alignment } from '@blueprintjs/core';

import styles from './AppMenu.less';

type Props = {|
  ...ContextRouter,
  title: string,
  // injected
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
    const { user, title } = this.props;
    return (
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>{title}</Navbar.Heading>
          <Navbar.Divider />
          <Button className="pt-minimal" icon="home" text="Home" onClick={this.navigateTo('/')} />
          <If condition={!!user}>
            <Button className="pt-minimal" icon="document" text="Editor" onClick={this.navigateTo('/edit')} />
          </If>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Choose>
            <When condition={!!user}>
              <p className={styles.signedIn}>Signed in as {user.displayName}</p>
              <button onClick={this.signOut}>SIGN OUT</button>
            </When>
            <Otherwise>
              <p className={styles.signedOut}>Signed out</p>
              <button onClick={this.signIn}>SIGN IN</button>
            </Otherwise>
          </Choose>
        </Navbar.Group>
      </Navbar>
    );
  }

}

const map = ({ auth: { user } }) => ({ user });

export default connect(map)(withRouter(AppMenu));
