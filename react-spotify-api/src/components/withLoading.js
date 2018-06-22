import React from 'react';
import Loading from './Loading';

const withLoading = (Component) => ({ isLoading, ...props}) => {
    return isLoading ? <Loading isLoading={isLoading} /> : <Component { ...props } />
}

export default withLoading;