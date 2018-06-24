import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const THRESHOLD = 100;

const withFetchOnScroll = (Component) => {
    class FetchOnScroll extends React.Component {
        constructor(props) {
            super(props);
            this.debounceScroll = debounce(this.onScroll, 500);
        }
        static propTypes = {
            onScroll: PropTypes.func.isRequired
        }

        componentDidMount() {
            window.addEventListener('scroll', this.debounceScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.debounceScroll, false);
        }

        onScroll = () => {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - THRESHOLD) && this.props.items.length &&
            !this.props.isLoading)  {
                this.props.onScroll();
            }
        }

        render() {
            return <Component {...this.props} />
        }

    }

    return FetchOnScroll;
}

export default withFetchOnScroll;