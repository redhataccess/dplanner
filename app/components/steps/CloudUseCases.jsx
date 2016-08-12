import React, { Component, PropTypes } from 'react'

import includes                 from 'lodash/includes'

import Czechbox                 from '../ui/Czechbox'
import Radio                    from "../ui/Radio"
import Textarea                 from "../ui/Textarea"
import If                       from "../ui/If"

import messages                 from '../../messages/messages_en'
import Content                  from '../ui/Content'

import Utils                    from '../../utils'

class CloudUseCases extends Component {

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
        const valueContainer = this.props.answers.cloudUseCase;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_CLOUD.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.CLOUD_TYPE_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_TYPE_QUESTION.id} values={valueContainer.cloudTypes} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_PURPOSE_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_PURPOSE_QUESTION.id} values={valueContainer.cloudPurposes} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_OSP_TYPE_QUESTION.display}</h3>
                        <Czechbox id={messages.CLOUD_OSP_TYPE_QUESTION.id} options={valueContainer.ospTypeOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.CLOUD_OSP_TYPE_QUESTION.id)} valueContainer={valueContainer} />
                        <If cond={includes(valueContainer.ospTypes, messages.OPTION_OTHER.display)}>
                            <Textarea id={messages.CLOUD_OSP_TYPE_QUESTION_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.CLOUD_WORKLOADS_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_WORKLOADS_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_SPECIAL_USE_CASE_QUESTION.display}</h3>
                        <Czechbox id={messages.CLOUD_SPECIAL_USE_CASE_QUESTION.id} options={valueContainer.cloudSpecialUseCaseOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.CLOUD_SPECIAL_USE_CASE_QUESTION.id)} valueContainer={valueContainer} />
                        <If cond={includes(valueContainer.cloudSpecialUseCases, messages.OPTION_OTHER.display)}>
                            <Textarea id={messages.CLOUD_SPECIAL_USE_CASE_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.CLOUD_APPS_QUESTION_1.display}</h3>
                        <Radio id={messages.CLOUD_APPS_QUESTION_1.id} values={[messages.CLOUD_APPS_QUESTION_1_YES.display, messages.CLOUD_APPS_QUESTION_1_NO.display]} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_APPS_QUESTION_2.display}</h3>
                        <Czechbox id={messages.CLOUD_APPS_QUESTION_2.id} options={valueContainer.cloudCustomerDeployedAppsTypeOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.CLOUD_APPS_QUESTION_2.id)} valueContainer={valueContainer} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_SERVICES_QUESTION.display}</h3>
                        <Czechbox id={messages.CLOUD_SERVICES_QUESTION.id} options={valueContainer.cloudServiceOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.CLOUD_SERVICES_QUESTION.id)} valueContainer={valueContainer} />
                        <If cond={includes(valueContainer.cloudServices, messages.OPTION_OTHER.display)}>
                            <Textarea id={messages.CLOUD_SERVICES_QUESTION_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.CLOUD_MULTIPLE_TARGET_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_MULTIPLE_TARGET_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_IS_COMPUTE_RESOURCES_GROUPED_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_IS_COMPUTE_RESOURCES_GROUPED_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                        <If cond={valueContainer.isCloudComputeResourcesGrouped === messages.BUTTON_YES.display}>
                            <ul>
                                <li>
                                    <h3>{messages.CLOUD_COMPUTE_RESOURCES_GROUPING_METHODS_QUESTION.display}</h3>
                                    <Czechbox id={messages.CLOUD_COMPUTE_RESOURCES_GROUPING_METHODS_QUESTION.id} options={valueContainer.cloudComputeResourcesGroupedTypeOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.CLOUD_COMPUTE_RESOURCES_GROUPING_METHODS_QUESTION.id)} valueContainer={valueContainer} />
                                </li>
                            </ul>
                        </If>
                    </li>
                    <li>
                        <h3>{messages.CLOUD_HA_REQUIREMENT_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_HA_REQUIREMENT_QUESTION.id} {...defaultProps} />
                    </li>
                </ul>
            </Content>
        )
    }
}

CloudUseCases.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default CloudUseCases;
