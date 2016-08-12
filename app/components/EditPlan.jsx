import React, { Component, PropTypes } from 'react'

import moment       from 'moment'
import Row          from 'react-bootstrap/lib/Row'
import Col          from 'react-bootstrap/lib/Col'
import Button       from 'react-bootstrap/lib/Button'

import Content      from "./ui/Content"
import InputLabeled from "./ui/InputLabeled"

import messages     from '../messages/messages_en'

class EditPlan extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
    }

    handleFieldChange(e) {
        const fieldValueObj = {};
        // || name to account for radio and checkboxes
        fieldValueObj[e.target.id || e.target.name] = e.target.value;
        this.props.updateState(fieldValueObj, this.props.answers);
    }

    static formatDate(ms) {
        if (!ms) return '';
        return moment(ms).format('MM/DD/YYYY');
    }

    deletePlan() {
        this.props.deletePlan(this.props.uuid);
    }

    render() {
        const valueContainer = this.props.answers;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_EDIT_PLAN.display} {...this.props} showFooter={false}>
                <InputLabeled id={messages.PLAN_NAME.id} display={messages.PLAN_NAME.display} {...defaultProps} />
                <InputLabeled id={messages.PLAN_CREATED.id} display={messages.PLAN_CREATED.display} {...defaultProps} valueFormatter={EditPlan.formatDate} readOnly={true} />
                <InputLabeled id={messages.PLAN_LAST_MODIFIED.id} display={messages.PLAN_LAST_MODIFIED.display} {...defaultProps} valueFormatter={EditPlan.formatDate} readOnly={true} />
                <Row>
                    <Col xs={12}>
                        <div className="btn-group pull-right">
                            <Button className="btn pull-right" onClick={this.deletePlan}>{messages.BUTTON_DELETE_PLAN.display}</Button>
                        </div>
                    </Col>
                </Row>
            </Content>
        )
    }
}

EditPlan.propTypes = {
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    deletePlan: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    error: PropTypes.object
};

export default EditPlan;
