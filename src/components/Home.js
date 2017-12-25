import * as React from 'react';

import type ContextRouter from 'react-router-dom';

type Props = {

} & ContextRouter;

class Home extends React.Component<Props> {

  state = {}
  render() {
    return <h1>Home</h1>;
  }

}

export default Home;
