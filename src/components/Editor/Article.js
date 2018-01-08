import * as React from 'react';

import type { ContextRouter } from 'react-router-dom';

type Props = {

} & ContextRouter;

class Article extends React.Component<Props> {
    state = {}
    render() {
        return (
            <div>
                <h4>Article id=<span>{this.props.match.params.id}</span></h4>
            </div>
        );
    }
}

export default Article;
