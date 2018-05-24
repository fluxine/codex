import * as React from 'react';

import {
  Route,
  Link,
} from 'react-router-dom';

import type ContextRouter from 'react-router-dom';

import Article from './Article';

type Props = {

} & ContextRouter;

class Articles extends React.Component<Props> {

  state = {}
  render() {
    return (
      <div>
        <h3>Articles</h3>
        <Link to={`${this.props.match.url}/someArticleID`}>Edit article id=someArticleID</Link>
        <Route path={`${this.props.match.url}/:id`} component={Article} />
      </div>
    );
  }

}

export default Articles;
