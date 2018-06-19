import React from 'react';
import { connect } from 'dva';
import pageConfig from './config.json';

class Entry extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let style = {
      width: '100%',
      height: '100vh',
      color: 'green',
      fontSize: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <div style={style}>
        页面建设中......
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Entry);
