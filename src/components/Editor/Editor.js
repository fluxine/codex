import * as React from 'react';

import {
    Route,
    Link,
} from 'react-router-dom';

import type ContextRouter from 'react-router-dom';

import Articles from './Articles';

type Props = {

} & ContextRouter;

class Editor extends React.Component<Props> {
    state = {}
    render() {
        return (
            <div>
                <h2>Editor</h2>
                <ul>
                    <li><Link to={`${this.props.match.url}/articles`}>Articles</Link></li>
                </ul>
                <Route path={`${this.props.match.url}/articles`} component={Articles} />
            </div>
        );
    }
}

export default Editor;
