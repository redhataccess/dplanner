import React, { Component, PropTypes } from 'react'

import includes                 from 'lodash/includes'

import Content                  from "../ui/Content"
import Radio                    from "../ui/Radio"
import Textarea                 from "../ui/Textarea"
import InputSimple              from "../ui/InputSimple"
import If                       from "../ui/If"

import messages                 from '../../messages/messages_en'
import Utils                    from '../../utils'

class CloudArchitecture extends Component {

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
        const valueContainer = this.props.answers.cloudArchitecture;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_CLOUD_ARCHITECTURE.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_INSTALLATION_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_ARCHITECTURE_INSTALLATION_QUESTION.id} values={[messages.CLOUD_ARCHITECTURE_INSTALLATION_OPTION_1.display, messages.CLOUD_ARCHITECTURE_INSTALLATION_OPTION_2.display, messages.OPTION_OTHER.display]} {...defaultProps} />
                        <If cond={includes(valueContainer.cloudInstallType, messages.OPTION_OTHER.display)}>
                            <Textarea id={messages.CLOUD_ARCHITECTURE_INSTALLATION_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_COMPUTE_HYPERVISOR_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_ARCHITECTURE_COMPUTE_HYPERVISOR_QUESTION.id} values={['RHEL', 'ESXi']} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_COMPUTE_PHYSICAL_SERVER_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_COMPUTE_PHYSICAL_SERVER_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_COMPUTE_NODE_COUNT_QUESTION.display}</h3>
                        <InputSimple id={messages.CLOUD_ARCHITECTURE_COMPUTE_NODE_COUNT_QUESTION.id} type="number" {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_LDAP_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_LDAP_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_CONTROLLER_LAYOUT_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_CONTROLLER_LAYOUT_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_CONTROL_PLANE_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_ARCHITECTURE_CONTROL_PLANE_QUESTION.id} values={[messages.CLOUD_ARCHITECTURE_CONTROL_PLANE_OPTION_1.display, messages.CLOUD_ARCHITECTURE_CONTROL_PLANE_OPTION_2.display]} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_CONTROLLER_PHYSICAL_SERVER_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_CONTROLLER_PHYSICAL_SERVER_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_MULTI_SITE_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_MULTI_SITE_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_BACKUP_CONTROL_PLANE_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_BACKUP_CONTROL_PLANE_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_BACKUP_USER_OBJECTS_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_BACKUP_USER_OBJECTS_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_DISASTER_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_DISASTER_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_MESSAGE_BROKER_QUESTION.display}</h3>
                        <Textarea id={messages.CLOUD_ARCHITECTURE_MESSAGE_BROKER_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.CLOUD_ARCHITECTURE_MONITOR_QUESTION.display}</h3>
                        <Radio id={messages.CLOUD_ARCHITECTURE_MONITOR_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                        <If cond={valueContainer.hasMonitorTool === messages.BUTTON_YES.value}>
                            <div>
                                <h3>{messages.CLOUD_ARCHITECTURE_MONITOR_PLACEHOLDER.display}</h3>
                                <Textarea id={messages.CLOUD_ARCHITECTURE_MONITOR_PLACEHOLDER.id} {...defaultProps} />
                            </div>
                        </If>
                    </li>
                </ul>
            </Content>
        )
    }
}

CloudArchitecture.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default CloudArchitecture;
