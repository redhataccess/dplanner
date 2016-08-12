import React, { PropTypes } from 'react'
import InputLabeled from "./InputLabeled"

const Select = (props) => {
    const select = (
        <select id={props.id} onChange={props.handleFieldChange} value={props.valueContainer[props.id]} className="form-control">
            {props.options}
        </select>
    );
    return <InputLabeled id={props.id} display={props.display} handleFieldChange={props.handleFieldChange} valueContainer={props.valueContainer} child={select} />
};

Select.propTypes = {
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    valueContainer: PropTypes.object.isRequired,
    child: PropTypes.object,
};

export default Select;
