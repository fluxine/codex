// @flow
/**
 * PageWrapper is a HOC allowing to give the same appeareance to all pages,
 * regarding wrapping layout.
 */
import * as React from 'react';

import styles from './PageWrapper.less';

const PageWrapper = <Props>(PageComponent: React.ComponentType<Props>) => (props: Props) => (
  <div className={styles.sheet}>
    <div className={styles.padder}>
      <PageComponent {...props} />
    </div>
  </div>
);

export default PageWrapper;
