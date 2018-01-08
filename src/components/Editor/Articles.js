import * as React from 'react';

import firebase from '@firebase/app';

import {
    Route,
    Link,
} from 'react-router-dom';

import type { ContextRouter } from 'react-router-dom';
//import type { QuerySnapshot } from 'firebase';

import Article from './Article';

type State = {
    articles: ?Object, // TODO when https://github.com/flowtype/flow-typed/pull/1690 is merged : use QuerySnapShot,
    loadingError: ?string,
}

type Props = {

} & ContextRouter;

class Articles extends React.Component<Props, State> {
    state = {
        articles: null,
        loadingError: null,
    }

    componentWillMount() {
        const db = firebase.firestore();
        db.collection('articles')
            .get()
            .then(articles => this.setState({ articles }))
            .catch(error => this.setState({ loadingError: error }));
    }

    render() {
        return (
            <div>
                <h3>Articles</h3>
                <p>
                    <Choose>
                        <When condition={this.state.loadingError}>
                            Could not load articles : <span>{this.state.loadingError}</span>
                        </When>
                        <Otherwise>
                            <Choose>
                                <When condition={this.state.articles}>
                                    <span>{this.state.articles.size}</span> articles found !
                                </When>
                                <Otherwise>
                                    Loading articles ...
                                </Otherwise>
                            </Choose>
                        </Otherwise>
                    </Choose>
                </p>
                <Link to={`${this.props.match.url}/someArticleID`}>Edit article id=someArticleID</Link>
                <Route path={`${this.props.match.url}/:id`} component={Article} />
            </div>
        );
    }
}

export default Articles;
