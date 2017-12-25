// @flow
import * as React from 'react';
import { NonIdealState, Spinner } from '@blueprintjs/core';

import styles from './WaitingForAuthState.less';

export default () => <NonIdealState className={styles.content} title="Waiting for authentication state" visual={<Spinner large />} />;
