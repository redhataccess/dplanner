import React, { Component, PropTypes } from 'react'

import Content                  from "../ui/Content"
import Radio                    from "../ui/Radio"
import Textarea                 from "../ui/Textarea"
import SelectSimple             from "../ui/SelectSimple"
import If                       from "../ui/If"

import messages                 from '../../messages/messages_en'
import Utils                    from '../../utils'

class GeneralInformation extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.handleFieldChange = this.handleFieldChange.bind(this);
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

    render() {
        const valueContainer = this.props.answers.generalInformation;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_GENERAL.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.GENERAL_PURPOSE_QUESTION.display}</h3>
                        <Radio id={messages.GENERAL_PURPOSE_QUESTION.id} values={valueContainer.ospPurposeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.GENERAL_INSTALLATION_TYPE_QUESTION.display}</h3>
                        <Radio id={messages.GENERAL_INSTALLATION_TYPE_QUESTION.id} values={valueContainer.ospInstallationOptions} {...defaultProps} />
                        <If cond={valueContainer.ospInstallationType === messages.GENERAL_INSTALLATION_TYPE_OPTION_UPGRADE.value}>
                            <ul>
                                <li>
                                    <h3>{messages.GENERAL_CURRENT_RHEL_VERSION_QUESTION.display}</h3>
                                    <SelectSimple id={messages.GENERAL_CURRENT_RHEL_VERSION_QUESTION.id} options={valueContainer.rhelVersions} {...defaultProps} />
                                </li>
                                <li>
                                    <h3>{messages.GENERAL_CURRENT_OSP_VERSION_QUESTION.display}</h3>
                                    <SelectSimple id={messages.GENERAL_CURRENT_OSP_VERSION_QUESTION.id} options={valueContainer.ospVersions} {...defaultProps} />
                                </li>
                                <li>
                                    <h3>{messages.GENERAL_CURRENT_OSP_DIRECTOR_VERSION_QUESTION.display}</h3>
                                    <SelectSimple id={messages.GENERAL_CURRENT_OSP_DIRECTOR_VERSION_QUESTION.id} options={valueContainer.ospdVersions} {...defaultProps} />
                                </li>
                            </ul>

                        </If>
                    </li>
                    <li>
                        <h3>{messages.GENERAL_PLANEND_OSP_VERSION_QUESTION.display}</h3>
                        <SelectSimple id={messages.GENERAL_PLANEND_OSP_VERSION_QUESTION.id} options={valueContainer.ospVersions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.GENERAL_PLANEND_OSP_DIRECTOR_VERSION_QUESTION.display}</h3>
                        <SelectSimple id={messages.GENERAL_PLANEND_OSP_DIRECTOR_VERSION_QUESTION.id} options={valueContainer.ospdVersions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.GENERAL_EXPERIENCE_QUESTION.display}</h3>
                        <Textarea id={messages.GENERAL_EXPERIENCE_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.GENERAL_CLOUD_SITUATION_QUESTION.display}</h3>
                        <Textarea id={messages.GENERAL_CLOUD_SITUATION_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.GENERAL_IS_POC_QUESTION.display}</h3>
                        <Radio id={messages.GENERAL_IS_POC_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.GENERAL_IS_ESCALATION_QUESTION.display}</h3>
                        <Radio id={messages.GENERAL_IS_ESCALATION_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />

                        <If cond={valueContainer.generalIsEscalation === messages.BUTTON_YES.display}>
                            <ul>
                                <li>
                                    <h3>{messages.GENERAL_IS_ESCALATION_POC_IN_PROGRESS_QUESTION.display}</h3>
                                    <Radio id={messages.GENERAL_IS_ESCALATION_POC_IN_PROGRESS_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                                </li>
                                <li>
                                    <h3>{messages.GENERAL_IS_ESCALATION_PROD_IN_TROUBLE_QUESTION.display}</h3>
                                    <Radio id={messages.GENERAL_IS_ESCALATION_PROD_IN_TROUBLE_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                                    <If cond={valueContainer.generalIsEscalationPROD === messages.BUTTON_YES.display}>
                                        <Textarea id={messages.GENERAL_IS_ESCALATION_PROD_IN_TROUBLE_EXPLAIN.id} {...defaultProps} />
                                    </If>
                                </li>
                            </ul>
                        </If>
                    </li>
                    <li>
                        <h3>{messages.GENERAL_IS_REFERENCE_QUESTION.display}</h3>
                        <Radio id={messages.GENERAL_IS_REFERENCE_QUESTION.id} values={valueContainer.rhReferenceOptions} {...defaultProps} />
                        <If cond={valueContainer.generalIsReference === messages.GENERAL_IS_REFERENCE_OPTION_NO.value}>
                            <ul>
                                <li>
                                    <h3>{messages.GENERAL_REFERENCE_WILLING_QUESTION.display}</h3>
                                    <Radio id={messages.GENERAL_REFERENCE_WILLING_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                                </li>
                            </ul>
                        </If>
                    </li>
                </ul>
            </Content>
        )
    }
}

GeneralInformation.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default GeneralInformation;
