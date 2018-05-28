// @flow
import * as React from 'react';
import { NonIdealState, Spinner } from '@blueprintjs/core';

import PageWrapper from './PageWrapper';

const WFAS = () => (
  <NonIdealState
    title="Authentication"
    visual={<Spinner large />}
    description="We are waiting a bit for your authentication to succeed."
  />
);

export default PageWrapper(WFAS);
