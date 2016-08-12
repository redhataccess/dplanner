import React, { PropTypes } from 'react'

const If = (props) => {
    if (!props.cond || !props.children) return null;
    return props.children
};

If.propTypes = {
    cond: PropTypes.bool.isRequired
};

export default If;
