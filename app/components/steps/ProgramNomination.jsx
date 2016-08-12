import React, { Component, PropTypes } from 'react'
import Link from 'react-router/lib/Link'

import map              from 'lodash/map'
import includes         from 'lodash/includes'
import Row              from 'react-bootstrap/lib/Row'
import Col              from 'react-bootstrap/lib/Col'

import countries                from '../../options/countries'

import Czechbox                     from '../ui/Czechbox'
import InputSimple                  from "../ui/InputSimple"
import InputLabeled                 from "../ui/InputLabeled"
import Select                       from "../ui/Select"
import Radio                        from "../ui/Radio"
import Textarea                     from "../ui/Textarea"
import AppBlock                     from "../ui/AppBlock"
import If                           from "../ui/If"
import Utils                        from "../../utils"
import messages                     from '../../messages/messages_en'

class ProgramNomination extends Component {

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

    static renderCountryOptions() {
        return map(countries, c => <option key={c.name} value={c.name}>{c.name}</option>);
    }
    renderTimezoneOptions() {
        return map(Utils.getCountryTimezones(this.props.answers.programNomination.regionAndTerritory), t => <option key={t.GMT} value={t.GMT}>{t.GMT}</option>);
    }

    render() {
        const valueContainer = this.props.answers.programNomination;
        const defaultProps = {
            handleFieldChange: this.handleFieldChange,
            valueContainer: valueContainer
        };
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <AppBlock title={messages.PROGRAM_NOMINATION_OSP_PROGRAM_TITLE.display}>
                            <div className="content form-horizontal">
                                <InputLabeled id={messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_PG.id} display={messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_PG.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_CSA.id} display={messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_CSA.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_EFE.id} display={messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_EFE.display} {...defaultProps} />
                            </div>
                        </AppBlock>
                        <AppBlock title={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_TITLE.display}>
                            <div className='content form-horizontal'>
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CN.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CN.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CAN.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CAN.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCP.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCP.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCE.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCE.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCL.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCL.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_PROGRAM_LOCATION.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_PROGRAM_LOCATION.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CONTACT_LOCATION.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CONTACT_LOCATION.display} {...defaultProps} />
                                <Select id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_REGION.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_REGION.display} options={ProgramNomination.renderCountryOptions()} {...defaultProps} />
                                <Select id={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_TIMEZONE.id} display={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_TIMEZONE.display} options={this.renderTimezoneOptions()} {...defaultProps} />
                            </div>
                        </AppBlock>
                        <AppBlock title={messages.PROGRAM_NOMINATION_RH_CONTACTS_TITLE.display}>
                            <div className='content form-horizontal'>
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SA.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SA.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_REPORTER.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_REPORTER.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_REPORTER_EMAIL.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_REPORTER_EMAIL.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SALES_REP.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SALES_REP.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SSP.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SSP.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SALES_LEADER.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SALES_LEADER.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_GPS.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_GPS.display} {...defaultProps} />
                                <InputLabeled id={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SRM.id} display={messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SRM.display} {...defaultProps} />
                            </div>
                        </AppBlock>
                        <AppBlock title={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_TITLE.display}>
                            <div className='content'>
                                <ul>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_HEADCOUNT_RESOURCE_QUESTION.display}</h3>
                                        <Textarea id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_HEADCOUNT_RESOURCE_QUESTION.id} {...defaultProps} />
                                    </li>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_HARDWARE_RESOURCE_QUESTION.display}</h3>
                                        <Textarea id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_HARDWARE_RESOURCE_QUESTION.id} {...defaultProps} />
                                    </li>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_QUESTION.display}</h3>
                                        <table className='table'>
                                            <thead>
                                            <tr>
                                                <th>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_PHASE.display}</th>
                                                <th>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_START.display}</th>
                                                <th>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_END.display}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_PLANNING.display}</td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_PLANNING.startId} {...defaultProps} /></td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_PLANNING.endId} {...defaultProps} /></td>
                                            </tr>
                                            <tr>
                                                <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_STAGING.display}</td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_STAGING.startId} {...defaultProps} /></td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_STAGING.endId} {...defaultProps} /></td>
                                            </tr>
                                            <tr>
                                                <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_INSTALLATION.display}</td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_INSTALLATION.startId} {...defaultProps} /></td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_INSTALLATION.endId} {...defaultProps} /></td>
                                            </tr>
                                            <tr>
                                                <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_EVALUATION.display}</td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_EVALUATION.startId} {...defaultProps} /></td>
                                                <td><InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_EVALUATION.endId} {...defaultProps} /></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_ONSITE_DATE_QUESTION.display}</h3>
                                        <Textarea id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_ONSITE_DATE_QUESTION.id} {...defaultProps} />
                                    </li>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_POST_POC_PLAN_QUESTION.display}</h3>
                                        <Textarea id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_POST_POC_PLAN_QUESTION.id} {...defaultProps} />
                                    </li>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_LEADER_QUESTION.display}</h3>
                                        <Radio id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_LEADER_QUESTION.id} values={[messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_LEADER_OPTION_SA.display, messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_LEADER_OPTION_GPS.display, messages.OPTION_OTHER.display]} {...defaultProps} />
                                        <If cond={valueContainer.leader === messages.OPTION_OTHER.value}>
                                            <InputSimple id={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_LEADER_OTHER.id} {...defaultProps} />
                                        </If>
                                    </li>
                                </ul>
                            </div>
                        </AppBlock>
                        <AppBlock title={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_TITLE.display}>
                            <div className='content'>
                                <ul>
                                    <li>
                                        <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_IS_REQUEST_QUESTION.display}</h3>
                                        <Radio id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_IS_REQUEST_QUESTION.id} values={[messages.BUTTON_YES.display, messages.BUTTON_NO.display]} {...defaultProps} />
                                        <If cond={valueContainer.isRequestByCustomer === messages.BUTTON_YES.display}>
                                            <ul>
                                                <li>
                                                    <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_SALES_LEADER_QUESTION.display}</h3>
                                                    <Czechbox id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_SALES_LEADER_QUESTION.id} options={valueContainer.salesLeaderOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_SALES_LEADER_QUESTION.id)} valueContainer={valueContainer} />
                                                </li>
                                                <li>
                                                    <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_QUESTION.display}</h3>
                                                    <Czechbox id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_QUESTION.id} options={valueContainer.projectTypeOptions} handleCheckboxChange={this.handleCheckboxChange.bind(this, messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_QUESTION.id)} valueContainer={valueContainer} />
                                                    <If cond={includes(valueContainer.projectTypes, messages.OPTION_OTHER.display)}>
                                                        <InputSimple id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_OTHER.id} {...defaultProps} />
                                                    </If>
                                                </li>
                                                <li>
                                                    <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_ONSITE_PHASE_QUESTION.display}</h3>
                                                    <Radio id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_ONSITE_PHASE_QUESTION.id} values={[messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_ONSITE_PHASE_OPTION_1.display, messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_ONSITE_PHASE_OPTION_2.display]} {...defaultProps} />
                                                </li>
                                                <li>
                                                    <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_REMOTE_ACCESS_QUESTION.display}</h3>
                                                    <Radio id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_REMOTE_ACCESS_QUESTION.id} values={[messages.BUTTON_YES.display, messages.BUTTON_NO.display]} {...defaultProps} />
                                                </li>
                                                <li>
                                                    <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_IS_CUSTOMER_PARTICIPATE_QUESTION.display}</h3>
                                                    <Radio id={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_IS_CUSTOMER_PARTICIPATE_QUESTION.id} values={[messages.BUTTON_YES.display, messages.BUTTON_NO.display]} {...defaultProps} />
                                                </li>
                                            </ul>
                                        </If>
                                    </li>
                                </ul>
                            </div>
                        </AppBlock>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='app-block app-block-guided'>
                        <Link className='btn btn-next pull-right' to={`${Utils.browserPath}/${this.props.uuid}/${this.props.nextStep.link}`}>{messages.BUTTON_NEXT.display}</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

ProgramNomination.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    updateState: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    nextStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default ProgramNomination;
