import * as React from 'react';

import type { ContextRouter } from 'react-router-dom';

type Props = {

} & ContextRouter;

class Home extends React.Component<Props> {
    state = {}
    render() {
        return <h2>Home</h2>;
    }
}

export default Home;
