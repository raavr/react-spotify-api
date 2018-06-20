import React, { Component } from 'react';

const postMessage = (isSuccess, token) => {
  window.opener.postMessage(
    isSuccess ? { auth: { token } } : { error: 'Login failed' },
    window.opener.location
  );
}

class Callback extends Component {
  componentDidMount() {
    // const url = '/private';
    // window.opener.open(url, '_self');
    // window.opener.focus();
    // window.close();
    const tokenGroup = window.location.search.substr(1).split('&').filter((item) => item.match('access_token'))[0];
    console.log(tokenGroup);
    if(!tokenGroup || tokenGroup.indexOf('=') === -1) {
      postMessage(false);
      return;
    }
    const token = tokenGroup.split('=').pop();
    if(!token) {
      postMessage(false);
      return;
    }

    postMessage(true, token);
  }

  render() {
    return (
      <div>
        This page should close soon!
      </div>
    );
  }
}

export default Callback;