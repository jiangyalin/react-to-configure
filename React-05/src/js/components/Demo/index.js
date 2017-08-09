import React from 'react';
import styles from './index.scss';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <p className={styles.box}> Yo, React </p>
      </div>
    )
  }
}

export default Demo