import * as React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  Link,
  type ContextRouter,
} from 'react-router-dom';
import { type FirebaseUser } from 'firebase';

import WaitingForAuthState from '../WaitingForAuthState';
import Articles from './Articles';

type Props = {|
    ...ContextRouter,
  // injected
  authStateIsKnown: boolean,
  user: FirebaseUser,
|};

class Editor extends React.Component<Props> {

  state = {}
  render() {
    const { user, authStateIsKnown } = this.props;
    if (!authStateIsKnown) return <WaitingForAuthState />;
    if (!user) return <Redirect to="/" />;
    return (
      <div>
        <h1>Editor</h1>
        <ul>
          <li><Link to={`${this.props.match.url}/articles`}>Articles</Link></li>
        </ul>
        <Route path={`${this.props.match.url}/articles`} component={Articles} />
      </div>
    );
  }

}

const map = ({ auth: { user, authStateIsKnown } }) => ({ user, authStateIsKnown });

export default connect(map)(Editor);
