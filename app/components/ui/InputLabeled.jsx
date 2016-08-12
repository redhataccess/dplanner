import React, { PropTypes } from 'react'

import Col from 'react-bootstrap/lib/Col'

const renderInput = (props) => {
    const attrs = {
        id: props.id,
        value: props.valueFormatter != null ? props.valueFormatter(props.valueContainer[props.id]) : props.valueContainer[props.id],
        onChange: props.handleFieldChange,
        className: "form-control"
    };
    if (props.readOnly) {
        attrs['readOnly'] = true;
    }
    return (
        <input type="text" {...attrs} />
    )
};

const InputLabeled = (props) => (
    <div className="form-group">
        <Col md={6} xs={12}>
            <label htmlFor={props.id} className="control-label">{props.display}</label>
        </Col>
        <Col md={4} xs={12}>
            {props.child != null ? props.child : renderInput(props)}
        </Col>
    </div>
);

InputLabeled.propTypes = {
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    valueContainer: PropTypes.object.isRequired,
    valueFormatter: PropTypes.func,
    readOnly: PropTypes.bool,
    child: PropTypes.object,
};

InputLabeled.defaultProps = {
    readOnly: false
};

export default InputLabeled;
