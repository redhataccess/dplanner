import React, { PropTypes } from 'react'

const Spacer = (props) => (
    <div style={{marginBottom: props.size || 10}}></div>
);

Spacer.propTypes = {
    size: PropTypes.number
};

export default Spacer;
