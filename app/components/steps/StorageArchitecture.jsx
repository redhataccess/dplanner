import React, { Component, PropTypes } from 'react'

import includes                 from 'lodash/includes'

import Content                  from "../ui/Content"
import InputSimple              from "../ui/InputSimple"
import Czechbox                 from '../ui/Czechbox'
import Radio                    from "../ui/Radio"
import Textarea                 from "../ui/Textarea"
import If                       from "../ui/If"

import Utils                    from '../../utils'
import messages                 from '../../messages/messages_en'

class StorageArchitecture extends Component {

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
        const valueContainer = this.props.answers.storageArchitecture;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <Content title={messages.MENU_STORAGE_ARCHITECTURE.display} {...this.props}>
                <ul>
                    <li>
                        <h3>{messages.STORAGE_ARCHITECTURE_STORAGE_PLUGINS_QUESTION.display}</h3>
                        <Czechbox id={messages.STORAGE_ARCHITECTURE_STORAGE_PLUGINS_QUESTION.id} options={valueContainer.storagePlugInOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.STORAGE_ARCHITECTURE_STORAGE_PLUGINS_QUESTION.id)} valueContainer={valueContainer} />
                        <If cond={includes(valueContainer.storagePlugIn, messages.OPTION_OTHER.value)}>
                            <Textarea id={messages.STORAGE_ARCHITECTURE_STORAGE_PLUGINS_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                        <If cond={includes(valueContainer.storagePlugIn, valueContainer.storagePlugInOptions[0].value)}>
                            <ul>
                                <li>
                                    <h3>{messages.STORAGE_ARCHITECTURE_PHYSICAL_SERVER_QUESTION.display}</h3>
                                    <Textarea id={messages.STORAGE_ARCHITECTURE_PHYSICAL_SERVER_QUESTION.id} {...defaultProps} />
                                </li>
                                <li>
                                    <h3>{messages.STORAGE_ARCHITECTURE_NEW_CEPH_QUESTION.display}</h3>
                                    <Radio id={messages.STORAGE_ARCHITECTURE_NEW_CEPH_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                                    <If cond={valueContainer.isNewCephPlanned == messages.BUTTON_NO.display}>
                                        <ul>
                                            <li>
                                                <h3>{messages.STORAGE_ARCHITECTURE_EXISTING_CEPH_QUESTION.display}</h3>
                                                <Radio id={messages.STORAGE_ARCHITECTURE_EXISTING_CEPH_QUESTION.id} values={messages.YES_NO_OPTIONS} {...defaultProps} />
                                            </li>
                                        </ul>
                                    </If>
                                </li>
                            </ul>
                        </If>
                    </li>
                    <li>
                        <h3>{messages.STORAGE_ARCHITECTURE_GLANCE_QUESTION.display}</h3>
                        <Radio id={messages.STORAGE_ARCHITECTURE_GLANCE_QUESTION.id} values={['Swift', 'Local', 'NFS', 'Ceph', 'other']} {...defaultProps} />
                        <If cond={valueContainer.storageGlance === messages.OPTION_OTHER.display}>
                            <InputSimple id={messages.STORAGE_ARCHITECTURE_GLANCE_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.STORAGE_ARCHITECTURE_NOVA_QUESTION.display}</h3>
                        <Radio id={messages.STORAGE_ARCHITECTURE_NOVA_QUESTION.id} values={['Local', 'NFS', 'Ceph', 'other']} {...defaultProps} />
                        <If cond={valueContainer.storageNova === messages.OPTION_OTHER.display}>
                            <InputSimple id={messages.STORAGE_ARCHITECTURE_NOVA_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.STORAGE_ARCHITECTURE_CINDER_QUESTION.display}</h3>
                        <Radio id={messages.STORAGE_ARCHITECTURE_CINDER_QUESTION.id} values={['Local', 'NFS', 'Ceph', 'other']} {...defaultProps} />
                        <If cond={valueContainer.storageCinder === messages.OPTION_OTHER.display}>
                            <InputSimple id={messages.STORAGE_ARCHITECTURE_CINDER_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                    <li>
                        <h3>{messages.STORAGE_ARCHITECTURE_SWIFT_QUESTION.display}</h3>
                        <Radio id={messages.STORAGE_ARCHITECTURE_SWIFT_QUESTION.id} values={['Local', 'NFS', 'Ceph', 'other']} {...defaultProps} />
                        <If cond={valueContainer.storageSwift === messages.OPTION_OTHER.display}>
                            <InputSimple id={messages.STORAGE_ARCHITECTURE_SWIFT_OTHER_CONTENT.id} {...defaultProps} />
                        </If>
                    </li>
                </ul>
            </Content>
        )
    }
}

StorageArchitecture.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default StorageArchitecture;
