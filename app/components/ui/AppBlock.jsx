import React, { PropTypes } from 'react'

const renderTitle = (props) => {
    if (!props.title) return null;
    return <h3 className="title">{props.title}</h3>
};

const AppBlock = (props) => (
    <div className="app-block app-block-guided">
        {renderTitle(props)}
        {props.children}
    </div>
);

AppBlock.propTypes = {
    title: PropTypes.string
};

export default AppBlock;
