import React, { Component, PropTypes } from 'react'

import Row          from 'react-bootstrap/lib/Row'
import Col          from 'react-bootstrap/lib/Col'
import Button       from 'react-bootstrap/lib/Button'

import Content      from "./ui/Content"
import InputLabeled from "./ui/InputLabeled"

import messages     from '../messages/messages_en'

class NewPlan extends Component {

    constructor(props, context) {
        super(props, context);
        this.createNewPlan = this.createNewPlan.bind(this);
        this.state = {
            name: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    createNewPlan() {
        this.props.createPlan(this.state.name)
    }

    handleFieldChange(e) {
        const fieldValueObj = {};
        // || name to account for radio and checkboxes
        fieldValueObj[e.target.id || e.target.name] = e.target.value;
        this.setState(fieldValueObj);
    }

    render() {
        const valueContainer = this.state;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_NEW_PLAN.display} {...this.props} showFooter={false}>
                <InputLabeled id={messages.PLAN_NAME.id} display={messages.PLAN_NAME.display} {...defaultProps} />
                <Row>
                    <Col xs={12}>
                        <div className="btn-group pull-right">
                            <Button className="btn pull-right" onClick={this.createNewPlan}>{messages.BUTTON_CREATE_PLAN.display}</Button>
                        </div>
                    </Col>
                </Row>
            </Content>
        )
    }
}

NewPlan.propTypes = {
    createPlan: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default NewPlan;
