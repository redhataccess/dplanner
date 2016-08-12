import React, { PropTypes } from 'react'

const Header = (props) => (
    <div className="header-container">
        <h2 className="no-margin-bottom no-margin-top">{props.title}</h2>
        {props.children}
    </div>
);

Header.propTypes = {
};

export default Header;
