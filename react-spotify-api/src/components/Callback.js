import React, { Component } from 'react';

const postMessage = (isSuccess, tokens) => {
  window.opener.postMessage(
    isSuccess ? { auth: tokens } : { error: 'Login failed' },
    window.opener.location
  );
};

class Callback extends Component {
  componentDidMount() {
    const tokensGroup = new URLSearchParams(window.location.search.substr(1));
    const refreshToken = tokensGroup.get('refresh_token');
    const accessToken = tokensGroup.get('access_token');

    if (!refreshToken || !accessToken) {
      postMessage(false);
      return;
    }

    postMessage(true, { accessToken, refreshToken });
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
