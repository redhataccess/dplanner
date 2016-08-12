import React, { PropTypes } from 'react'

const Textarea = (props) => (
    <textarea id={props.id} onChange={props.handleFieldChange} value={props.valueContainer[props.id]} />
);

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    valueContainer: PropTypes.object.isRequired
};

export default Textarea;
