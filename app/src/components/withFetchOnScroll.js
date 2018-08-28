import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const THRESHOLD = 100;

const withFetchOnScroll = (Component) => {
  class FetchOnScroll extends React.Component {
    static propTypes = {
      onScroll: PropTypes.func.isRequired
    }

    constructor(props) {
      super(props);
      this.debounceScroll = debounce(this.onScroll, 500);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.debounceScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.debounceScroll, false);
    }

    onScroll = () => {
      const { items, isLoading, onScroll } = this.props;
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - THRESHOLD) && items.length
        && !isLoading) {
        onScroll();
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return FetchOnScroll;
};

export default withFetchOnScroll;
