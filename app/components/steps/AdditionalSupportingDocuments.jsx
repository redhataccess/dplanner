import React, { Component, PropTypes } from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import Content                  from "../ui/Content"
import Textarea                 from "../ui/Textarea"
import Radio                    from "../ui/Radio"
import If                       from "../ui/If"

import messages                 from '../../messages/messages_en'
import Utils                    from '../../utils'


class AdditionalSupportingDocuments extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentWillMount() {
        this.props.modifyStep(this.props.answers);
    }

    handleFieldChange(e) {
        const fieldValueObj = {};
        // || name to account for radio and checkboxes
        fieldValueObj[e.target.id || e.target.name] = e.target.value;
        this.props.updateState(fieldValueObj, this.props.answers);
    }
    handleCheckboxChange(id, e) {
        const fieldValueObj = {};
        fieldValueObj[id] = e;
        this.props.updateState(fieldValueObj, this.props.answers);
    }

    render() {
        const valueContainer = this.props.answers.additionalSupportingDocuments;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_ADDITIONAL_SUPPORTING_DOCUMENTS.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ARCHITECURE_QUESTION.display}</h3>
                        <Textarea id={messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ARCHITECURE_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ISSUE_QUESTION.display}</h3>
                        <Textarea id={messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ISSUE_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_THIRD_PARTY_QUESTION.display}</h3>
                        <Textarea id={messages.ADDITIONAL_SUPPORTING_DOCUMENTS_THIRD_PARTY_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_RFE_QUESTION.display}</h3>
                        <Textarea id={messages.ADDITIONAL_SUPPORTING_DOCUMENTS_RFE_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ENV_DIAGRAMS_QUESTION.display}</h3>
                        <Radio id={messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ENV_DIAGRAMS_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                        <If cond={valueContainer.additionalDocsENVDiagrams === messages.BUTTON_YES.display}>
                            <Row>
                                <Col xs={12}>
                                    <div className="alert alert-info alert-w-icon">
                                        <i className="fa fa-info-circle" />&nbsp;
                                        Please send the diagrams of the environment to <a href="mailto:rhos-pos-help@redhat.com">rhos-pos-help@redhat.com</a>.
                                    </div>
                                </Col>
                            </Row>
                        </If>
                    </li>
                </ul>
            </Content>
        )
    }
}

AdditionalSupportingDocuments.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default AdditionalSupportingDocuments;
