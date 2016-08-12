import React, { PropTypes } from 'react'

import map              from 'lodash/map'
import CheckboxGroup    from 'react-checkbox-group'

// const handleCheckboxChange = (props) => {
//     props.handleCheckboxChange(props.id);
// };

const Czechbox = (props) => (
    <CheckboxGroup
        name={props.id}
        value={props.valueContainer[props.id]}
        onChange={props.handleCheckboxChange}>{
            (Checkbox) => (
                <div className="form-horizontal">
                    {map(props.options, o => {
                        return (
                            <label key={o.value}>
                                <Checkbox value={o.value} /> {o.display}
                            </label>
                        )
                    })}
                </div>
            )
        }</CheckboxGroup>
);

Czechbox.propTypes = {
    id: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    valueContainer: PropTypes.object.isRequired
};

export default Czechbox;
