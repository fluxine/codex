// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import firebase, { type FirebaseUser } from 'firebase';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/components/button/Button';
import { Sidebar } from 'primereact/components/sidebar/Sidebar';

import styles from './AppMenu.css';

type Props = {
  user: FirebaseUser,
}

type State = {
  menuShown: boolean,
}

class AppMenu extends React.Component<Props, State> {

  state: State = {
    menuShown: false,
  }
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

  showMenu = (show: boolean) => {
    this.setState({ menuShown: show });
  }

  render() {
    const { menuShown } = this.state;
    const { user } = this.props;
    return [
      <Button key="menu-toggler" icon="fa-bars" iconPos="right" onClick={() => this.showMenu(true)} />,
      <Sidebar
        key="menu"
        className={styles.menu}
        position="top"
        visible={menuShown}
        onHide={() => this.showMenu(false)}
      >
        <div className="ui-g">
          <div className="ui-g-3">
            <Link to="/">Home</Link>
          </div>
          <div className="ui-g-3" />
          <div className="ui-g-3">
            <If condition={!!user}>
              Editor
            </If>
          </div>
          <div className="ui-g-3">
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
          </div>
        </div>
      </Sidebar>,
    ];
  }

}

const map = ({ auth: { user } }) => ({ user });

export default connect(map)(AppMenu);
