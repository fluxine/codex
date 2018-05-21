import React from 'react';
import { connect } from 'react-redux';
import firebase, { type User } from 'firebase';

// eslint-disable-next-line import/no-extraneous-dependencies
// import { If } from 'babel-plugin-jsx-control-statements/jsx-control-statements.latest.flow';

import styles from './SignIn.css';

type Props = {
    user: User,
}

class SignIn extends React.Component<Props> {

  props: Props

  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>Sign in component</h2>
        <If condition={!!user}>
            <p className={styles.signedIn}>Signed in as {user.displayName}</p>
            <button onClick={this.signOut}>SIGN OUT</button>
        </If>
        <If condition={!user}>
            <p className={styles.signedOut}>Signed out</p>
            <button onClick={this.signIn}>SIGN IN</button>
        </If>
      </div>
    );
  }

}

const map = ({ auth: { user } }) => ({ user });

export default connect(map)(SignIn);
