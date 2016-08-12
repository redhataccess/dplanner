import React, { Component, PropTypes } from 'react'

import Content                  from "../ui/Content"
import InputSimple              from "../ui/InputSimple"
import Czechbox                 from '../ui/Czechbox'
import Radio                    from "../ui/Radio"
import Textarea                 from "../ui/Textarea"
import If                       from "../ui/If"

import messages                 from '../../messages/messages_en'
import Utils                    from '../../utils'
import includes                 from 'lodash/includes'

class NetworkArchitecture extends Component {

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
        const valueContainer = this.props.answers.networkingArchitecture;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_NETWORKING_ARCHITECTURE.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_NEUTRON_PLUG_IN_QUESTION.display}</h3>
                        <Textarea id={messages.NETWORKING_ARCHITECTURE_NEUTRON_PLUG_IN_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_INFRASTRUCTURE_QUESTION.display}</h3>
                        <Radio id={messages.NETWORKING_ARCHITECTURE_INFRASTRUCTURE_QUESTION.id} values={[messages.NETWORKING_ARCHITECTURE_INFRASTRUCTURE_OPTION_SEPARATED.display, messages.NETWORKING_ARCHITECTURE_INFRASTRUCTURE_OPTION_SINGLE.display]} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_IS_BOND_QUESTION.display}</h3>
                        <Radio id={messages.NETWORKING_ARCHITECTURE_IS_BOND_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                        <If cond={valueContainer.isNetworkingInterfacesBonded === messages.BUTTON_YES.display}>
                            <ul>
                                <li>
                                    <h3>{messages.NETWORKING_ARCHITECTURE_BONDING_MODE_QUESTION.display}</h3>
                                    <Textarea id={messages.NETWORKING_ARCHITECTURE_BONDING_MODE_QUESTION.id} {...defaultProps} />
                                </li>
                            </ul>
                        </If>
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_TENANT_QUESTION.display}</h3>
                        <Czechbox id={messages.NETWORKING_ARCHITECTURE_TENANT_QUESTION.id} options={valueContainer.networkingTenantOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.NETWORKING_ARCHITECTURE_TENANT_QUESTION.id)} valueContainer={valueContainer} />
                        <If cond={includes(valueContainer.networkingTenants, messages.OPTION_OTHER.value)}>
                            <Textarea id={messages.NETWORKING_ARCHITECTURE_TENANT_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_NETWORKS_COUNT_QUESTION.display}</h3>
                        <InputSimple id={messages.NETWORKING_ARCHITECTURE_NETWORKS_COUNT_QUESTION.id} type="number" {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_APPROACH_QUESTION.display}</h3>
                        <Textarea id={messages.NETWORKING_ARCHITECTURE_APPROACH_QUESTION.id} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_BRIDGING_QUESTION.display}</h3>
                        <Radio id={messages.NETWORKING_ARCHITECTURE_BRIDGING_QUESTION.id} values={[messages.NETWORKING_ARCHITECTURE_BRIDGING_OPTION_1.display, messages.OPTION_OTHER.display]} {...defaultProps} />
                        <If cond={valueContainer.networkingBridging === messages.OPTION_OTHER.value}>
                            <InputSimple id={messages.NETWORKING_ARCHITECTURE_BRIDGING_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_ROUTING_PROVISIONING_QUESTION.display}</h3>
                        <Radio id={messages.NETWORKING_ARCHITECTURE_ROUTING_PROVISIONING_QUESTION.id} values={[messages.NETWORKING_ARCHITECTURE_ROUTING_PROVISIONING_OPTION_1.display, messages.NETWORKING_ARCHITECTURE_ROUTING_PROVISIONING_OPTION_2.display]} {...defaultProps} />
                    </li>
                    <li>
                        <h3>{messages.NETWORKING_ARCHITECTURE_ROUTING_EXTERNAL_QUESTION.display}</h3>
                        <Radio id={messages.NETWORKING_ARCHITECTURE_ROUTING_EXTERNAL_QUESTION.id} values={[messages.NETWORKING_ARCHITECTURE_ROUTING_EXTERNAL_OPTION_1.display, messages.NETWORKING_ARCHITECTURE_ROUTING_EXTERNAL_OPTION_2.display]} {...defaultProps} />
                    </li>
                </ul>
            </Content>
        )
    }
}

NetworkArchitecture.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default NetworkArchitecture;
