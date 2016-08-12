import React, { Component, PropTypes } from 'react'

import Content                  from "../ui/Content"
import InputSimple              from "../ui/InputSimple"
import Radio                    from "../ui/Radio"
import If                       from "../ui/If"
import messages                 from '../../messages/messages_en'
import Utils                    from '../../utils'

class WorkloadScaling extends Component {

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
        const valueContainer = this.props.answers.workloadScaling;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_WORKLOAD_SCALING.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_PROJECTS_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_PROJECTS_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_USERS_PROJECTS_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_USERS_PROJECTS_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_INSTANCES_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_INSTANCES_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_INSTANCES_AVERAGE_SIZE_QUESTION.display}</h3>
                        <InputSimple id={messages.WORKLOAD_SCALING_INSTANCES_AVERAGE_SIZE_QUESTION.id} type="number" {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_VOLUMES_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_VOLUMES_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_VOLUMES_AVERAGE_SIZE_QUESTION.display}</h3>
                        <InputSimple id={messages.WORKLOAD_SCALING_VOLUMES_AVERAGE_SIZE_QUESTION.id} type="number" {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_OBJECTS_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_OBJECTS_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_OBJECTS_AVERAGE_SIZE_QUESTION.display}</h3>
                        <InputSimple id={messages.WORKLOAD_SCALING_OBJECTS_AVERAGE_SIZE_QUESTION.id} type="number" {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_TENANT_NETWORKS_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_TENANT_NETWORKS_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.WORKLOAD_SCALING_ADDITIONAL_QUESTION.display}</h3>
                        <Radio id={messages.WORKLOAD_SCALING_ADDITIONAL_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                        <If cond={valueContainer.hasAdditionalParam === messages.BUTTON_YES.display}>
                            <ul>
                                <li>
                                    <h3>{messages.WORKLOAD_SCALING_VNICS_QUESTION.display}</h3>
                                    <Radio id={messages.WORKLOAD_SCALING_VNICS_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                                </li>
                                <li>
                                    <h3>{messages.WORKLOAD_SCALING_VOLUMES_PER_INSTANCE_QUESTION.display}</h3>
                                    <Radio id={messages.WORKLOAD_SCALING_VOLUMES_PER_INSTANCE_QUESTION.id} values={valueContainer.countRangeOptions} {...defaultProps} />
                                </li>
                            </ul>
                        </If>
                    </li>
                </ul>
            </Content>
        )
    }
}

WorkloadScaling.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default WorkloadScaling;
