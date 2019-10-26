import React from 'react';

import Footer from './Footer';
import Nav from './Nav';
import Routes from './Routes';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: ''
    };
  }

  componentDidMount() {
    // console.log('Component DID MOUNT!');
    var mode = localStorage.getItem('mode');
    if (mode) {
      this.setState({ class: mode });
    } else {
      this.setState({ class: 'default' });
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }

  switch = () => {
    var mode = localStorage.getItem('mode');
    if (mode === 'default') {
      localStorage.setItem('mode', 'dark');
      this.setState({ class: 'dark' });
    } else {
      localStorage.setItem('mode', 'default');
      this.setState({ class: 'default' });
    }
  };

  render() {
    return (
      <div className={this.state.class}>
        <Nav />
        <Routes />
        <Footer onClick={this.switch} mode={this.state.class} />
      </div>
    );
  }
}
