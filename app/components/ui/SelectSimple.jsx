import React, { PropTypes } from 'react'
import map                  from 'lodash/map'

const SelectSimple = (props) => (
    <select id={props.id} onChange={props.handleFieldChange} value={props.valueContainer[props.id]} className="form-control">
        {map(props.options, v => <option key={v} label={v} value={v}>{v}</option>)}
    </select>
);

SelectSimple.propTypes = {
    id: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    valueContainer: PropTypes.object.isRequired
};

export default SelectSimple;
