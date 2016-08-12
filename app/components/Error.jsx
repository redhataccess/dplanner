import React, { PropTypes } from 'react'

const Error = (props) => props.error == null ? null : (
    <Alert bsStyle={props.bsStyle || "warning"}>{props.error.message}</Alert>
);

Error.propTypes = {
    error: PropTypes.object,
    bsStyle: PropTypes.string
};

export default Error;
