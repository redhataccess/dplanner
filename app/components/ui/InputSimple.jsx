import React, { PropTypes } from 'react'


const InputSimple = (props) => (
    <input type={props.type || 'text'} id={props.id} onChange={props.handleFieldChange} value={props.valueContainer[props.id]} />
);

InputSimple.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    handleFieldChange: PropTypes.func.isRequired,
    valueContainer: PropTypes.object.isRequired
};

export default InputSimple;
