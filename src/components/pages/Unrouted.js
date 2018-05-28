// @flow
import * as React from 'react';
import { NonIdealState } from '@blueprintjs/core';

const Unrouted = () => (
  <NonIdealState
    title="Page not found"
    visual="thumbs-down"
    description="The page you request cannot be found, sorry for that"
  />
);

export default Unrouted;
