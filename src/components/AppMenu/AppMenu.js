// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import firebase, { type FirebaseUser } from 'firebase';
import { withRouter, NavLink, type ContextRouter } from 'react-router-dom';
import { Navbar, Alignment, Icon } from '@blueprintjs/core';

import styles from './AppMenu.less';

type MenuItemProps = {
  to: string,
  icon: string,
  exact?: boolean,
}

const MenuItem = (props: MenuItemProps): React.Node => (
  <NavLink
    to={props.to}
    exact={props.exact}
    className={styles.item}
    activeClassName={styles.active}
  >
    <Icon icon={props.icon} iconSize={20} />
  </NavLink>
);

MenuItem.defaultProps = {
  exact: false,
};

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
          <Navbar.Heading>{title}</Navbar.Heading>
          <Navbar.Divider />
          <MenuItem to="/" icon="home" exact />
          <If condition={signedIn}>
            <MenuItem to="/edit" icon="edit" />
          </If>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Choose>
            <When condition={signedIn}>
              <div className={styles.userDisplayName}>{user.displayName}</div>
              <If condition={!!user.photoURL}>
                <img alt="signed-in user avatar" src={user.photoURL} className={styles.avatar} />
              </If>
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
