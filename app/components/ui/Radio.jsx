import React, { PropTypes } from 'react'
import map                  from 'lodash/map'
import isObject             from 'lodash/isObject'

const renderRadioOptions = (props) => {
    return map(props.values, v => {
        // This will allow passing in a single value or passing in a {display: ..., value: ...} form.
        let display = v, value = v;
        if (isObject(v)) {
            display = v.display;
            value = v.value;
        }
        const isChecked = props.valueContainer[props.id] == value;
        return (
            <label key={value}>
                <input type='radio' name={props.id} onChange={props.handleFieldChange} value={value} checked={isChecked} />{display}
            </label>
        )
    })
};

const Radio = (props) => (
    <div className='radio'>
        {renderRadioOptions(props)}
    </div>
);

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    valueContainer: PropTypes.object.isRequired
};

export default Radio;
