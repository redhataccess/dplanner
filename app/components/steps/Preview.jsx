import React, { Component, PropTypes } from 'react'

import get          from 'lodash/get'
import map          from 'lodash/map'
import find         from 'lodash/find'
import includes     from 'lodash/includes'
import isObject     from 'lodash/isObject'

// https://github.com/MrRio/jsPDF/pull/774
// https://github.com/MrRio/jsPDF/issues/506
// const jsPDF = require('jspdf-works/dist/jspdf.debug.js');
// const jsPDF = require('jspdf');

import DropdownButton   from 'react-bootstrap/lib/DropdownButton'
import MenuItem         from 'react-bootstrap/lib/MenuItem'
import Tabs             from 'react-bootstrap/lib/Tabs'
import Tab              from 'react-bootstrap/lib/Tab'
import Row              from 'react-bootstrap/lib/Row'
import Col              from 'react-bootstrap/lib/Col'


import Content                  from "../ui/Content"
import AppBlock                 from "../ui/AppBlock"
import If                       from "../ui/If"

import messages                 from '../../messages/messages_en'
import Utils                    from '../../utils'

class Preview extends Component {

    constructor(props, context) {
        super(props, context);
        this.generatePDF = this.generatePDF.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.state = {};
    }

    componentWillMount() {
        this.props.modifyStep(this.props.answers);
    }

    createPDF () {
        const doc = new jsPDF('p', 'pt', 'a4'),
            margins = {
                top: 20,
                bottom: 20,
                left: 20,
                width: 522
            },
            pageIDs = [
                '#OSPProgram',
                '#customerContact',
                '#rhContacts',
                '#pre­SalesEngagements',
                '#engineeringFieldEngagementProgramSpecifics',
                '#general',
                '#cloudUseCase',
                '#cloudArchitecture',
                '#networkArchitecture',
                '#storageArchitecture',
                '#workloadScaling',
                '#additionalDocs'
            ];
        for (let i = 0; i < pageIDs.length; i += 1) {
            doc.fromHTML(
                jQuery(pageIDs[i]).get(0),
                margins.top,
                margins.left,
                {'width': margins.width},
                function (dispose) {
                    if (i < pageIDs.length - 1) {
                        doc.addPage();
                    }
                },
                margins
            );
        }
        return doc;
    };
    generatePDF() {
        const doc = this.createPDF();
        doc.save('osp_architecture_review.pdf');
    }

    sendMail() {
        const doc = this.createPDF();
        const mailData = {
            accountNumber: this.props.answers.programNomination.customerAccountNumber,
            version: this.props.answers.generalInformation.ospVersion,
            requester: this.props.answers.programNomination.reporter,
            requesterMail: this.props.answers.programNomination.reporterEmail,
            pdfData: doc.output()
        };
        this.props.sendEmail(mailData);
    };


    static getDisplay(options, value) {
        const optionObj = find(options, {display: value}) || find(options, {value: value}) || {};
        return get(optionObj, 'display', '');
    }

    static renderLi(options, value) {
        const val = isObject(value) ? value.value: value;
        const display = isObject(value) ? value.display : Preview.getDisplay(options, val);
        return <li key={val}>{display}</li>
    }

    render() {
        const {
            programNomination,
            generalInformation,
            cloudUseCase,
            cloudArchitecture,
            networkingArchitecture,
            storageArchitecture,
            workloadScaling,
            additionalSupportingDocuments
        } = this.props.answers;
        return (
            <Content title={messages.MENU_PREVIEW.display} {...this.props}>
                <Row>
                    <Tabs id="ospProgramTabs" justified={true} defaultActiveKey={1}>
                        <Tab title={messages.PROGRAM_NOMINATION_OSP_PROGRAM_PREVIEW_TITLE.display} eventKey={1}>
                            <AppBlock>
                                <div id="OSPProgram" className="content">
                                    <ul>
                                        {/* TODO -- could easily create a component to just take messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_PG
                                        then render the li/h3/p */}
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_PG.display}</h3>
                                            <p>{programNomination.phasedGates}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_CSA.display}</h3>
                                            <p>{programNomination.cloudSuccessArchitect}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_OSP_PROGRAM_LABEL_EFE.display}</h3>
                                            <p>{programNomination.engineeringFieldEngagement}</p>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_TITLE.display} eventKey={2}>
                            <AppBlock>
                                <div id="customerContact" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CN.display}</h3>
                                            <p>{programNomination.customerName}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CAN.display}</h3>
                                            <p>{programNomination.customerAccountNumber}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCP.display}</h3>
                                            <p>{programNomination.customerContact}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCE.display}</h3>
                                            <p>{programNomination.customerContactEmail}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CPCL.display}</h3>
                                            <p>{programNomination.customerContactLoginName}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_PROGRAM_LOCATION.display}</h3>
                                            <p>{programNomination.projectLocation}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_CONTACT_LOCATION.display}</h3>
                                            <p>{programNomination.customerContactLocation}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_REGION.display}</h3>
                                            <p>{programNomination.regionAndTerritory}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_CUSTOMER_CONTACTS_TIMEZONE.display}</h3>
                                            <p>{programNomination.timezone}</p>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.PROGRAM_NOMINATION_RH_CONTACTS_PREVIEW_TITLE.display} eventKey={3}>
                            <AppBlock>
                                <div id="rhContacts" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SA.display}</h3><p>{programNomination.solutionArchitect}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_REPORTER.display}</h3><p>{programNomination.reporter}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_REPORTER_EMAIL.display}</h3><p>{programNomination.reporterEmail}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SALES_REP.display}</h3><p>{programNomination.salesRep}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SSP.display}</h3><p>{programNomination.cloudSSP}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SALES_LEADER.display}</h3><p>{programNomination.salesLeader}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_GPS.display}</h3><p>{programNomination.GPSContact}</p></li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_RH_CONTACTS_LABEL_SRM.display}</h3><p>{programNomination.SRMOrTAM}</p></li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                    </Tabs>
                    <Tabs id="preSalesEngagementTabs" justified={true} defaultActiveKey={1}>
                        <Tab title={messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_TITLE.display} eventKey={1}>
                            <AppBlock>
                                <div id="pre­SalesEngagements" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_HEADCOUNT_RESOURCE_QUESTION.display}</h3>
                                            <p>{programNomination.headcountResource}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_HARDWARE_RESOURCE_QUESTION.display}</h3>
                                            <p>{programNomination.hardwareResource}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_QUESTION.display}</h3>
                                            <table className="table">
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
                                                    <td>{programNomination.planningStart}</td>
                                                    <td>{programNomination.planningEnd}</td>
                                                </tr>
                                                <tr>
                                                    <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_STAGING.display}</td>
                                                    <td>{programNomination.stagingStart}</td>
                                                    <td>{programNomination.stagingEnd}</td>
                                                </tr>
                                                <tr>
                                                    <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_INSTALLATION.display}</td>
                                                    <td>{programNomination.installationStart}</td>
                                                    <td>{programNomination.installationEnd}</td>
                                                </tr>
                                                <tr>
                                                    <td>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_CUSTOMER_TIMELINE_EVALUATION.display}</td>
                                                    <td>{programNomination.evaluationStart}</td>
                                                    <td>{programNomination.evaluationEnd}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_ONSITE_DATE_QUESTION.display}</h3>
                                            <p>{programNomination.onsiteDate}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_POST_POC_PLAN_QUESTION.display}</h3>
                                            <p>{programNomination.postPOCPlan}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_PRE_SALES_ENGAGEMENTS_LEADER_QUESTION.display}</h3>
                                            <If cond={programNomination.leader !== messages.OPTION_OTHER.value}><span>{programNomination.leader}</span></If>
                                            <If cond={programNomination.leader === messages.OPTION_OTHER.value}><span>{programNomination.leaderOther}</span></If>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PREVIEW.display} eventKey={2}>
                            <AppBlock>
                                <div id="engineeringFieldEngagementProgramSpecifics" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_IS_REQUEST_QUESTION.display}</h3>
                                            <p>{programNomination.isRequestByCustomer}</p>
                                        </li>
                                        <If cond={programNomination.isRequestByCustomer === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_SALES_LEADER_QUESTION.display}</h3>
                                                <ul>
                                                    {map(programNomination.salesLeaders, (o) => Preview.renderLi(programNomination.salesLeaderOptions, o))}
                                                </ul>
                                            </li>
                                        </If>
                                        <If cond={programNomination.isRequestByCustomer === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_QUESTION.display}</h3>
                                                <If cond={!includes(programNomination.projectTypes, messages.OPTION_OTHER.value)}>
                                                    <ul>
                                                        {map(programNomination.projectTypes, (o) => Preview.renderLi(programNomination.projectTypeOptions, o))}
                                                    </ul>
                                                </If>
                                                <If cond={includes(programNomination.projectTypeOther, messages.OPTION_OTHER.value)}>
                                                    <p>{programNomination.projectTypeOther}</p>
                                                </If>
                                            </li>
                                        </If>
                                        <If cond={programNomination.isRequestByCustomer === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_ONSITE_PHASE_QUESTION.display}</h3>
                                                <p>{programNomination.onsitePhase}</p>
                                            </li>
                                        </If>
                                        <If cond={programNomination.isRequestByCustomer === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_REMOTE_ACCESS_QUESTION.display}</h3>
                                                <p>{programNomination.isEnvRemoteAccessible}</p>
                                            </li>
                                        </If>
                                        <If cond={programNomination.isRequestByCustomer === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_IS_CUSTOMER_PARTICIPATE_QUESTION.display}</h3>
                                                <p>{programNomination.isCustomerParticipate}</p>
                                            </li>
                                        </If>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                    </Tabs>
                    <Tabs id="generalTabs" justified={true} defaultActiveKey={1}>
                        <Tab title={messages.MENU_GENERAL.display} eventKey={1}>
                            <AppBlock>
                                <div id="general" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.GENERAL_PURPOSE_QUESTION.display}</h3>
                                            <p>{Preview.getDisplay(generalInformation.ospPurposeOptions, generalInformation.ospPurpose)}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.GENERAL_INSTALLATION_TYPE_QUESTION.display}</h3>
                                            <p>{Preview.getDisplay(generalInformation.ospInstallationOptions, generalInformation.ospInstallationType)}</p>
                                        </li>
                                        <If cond={generalInformation.ospInstallationType === 'GENERAL_INSTALLATION_TYPE_OPTION_UPGRADE'}>
                                            <li>
                                                <h3>{messages.GENERAL_CURRENT_RHEL_VERSION_QUESTION.display}</h3>
                                                <p>{generalInformation.currentRHELVersion}</p>
                                            </li>
                                        </If>
                                        <If cond={generalInformation.ospInstallationType === 'GENERAL_INSTALLATION_TYPE_OPTION_UPGRADE'}>
                                            <li>
                                                <h3>{messages.GENERAL_CURRENT_OSP_VERSION_QUESTION.display}</h3>
                                                <p>{generalInformation.currentOSPVersion}</p>
                                            </li>
                                        </If>
                                        <If cond={generalInformation.ospInstallationType === 'GENERAL_INSTALLATION_TYPE_OPTION_UPGRADE'}>
                                            <li>
                                                <h3>{messages.GENERAL_CURRENT_OSP_DIRECTOR_VERSION_QUESTION.display}</h3>
                                                <p>{generalInformation.currentOSPDVersion}</p>
                                            </li>
                                        </If>
                                        <li>
                                            <h3>{messages.GENERAL_PLANEND_OSP_VERSION_QUESTION.display}</h3>
                                            <p>{generalInformation.ospVersion}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.GENERAL_PLANEND_OSP_DIRECTOR_VERSION_QUESTION.display}</h3>
                                            <p>{generalInformation.ospdVersion}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.GENERAL_EXPERIENCE_QUESTION.display}</h3>
                                            <p>{generalInformation.previousExperience}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.GENERAL_CLOUD_SITUATION_QUESTION.display}</h3>
                                            <p>{generalInformation.cloudSituation}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.GENERAL_IS_POC_QUESTION.display}</h3>
                                            <p>{generalInformation.generalIsPOC}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.GENERAL_IS_ESCALATION_QUESTION.display}</h3>
                                            <p>{generalInformation.generalIsEscalation}</p>
                                        </li>
                                        <If cond={generalInformation.generalIsEscalation === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.GENERAL_IS_ESCALATION_POC_IN_PROGRESS_QUESTION.display}</h3>
                                                <p>{generalInformation.generalIsEscalationPOC}</p>
                                            </li>
                                        </If>
                                        <If cond={generalInformation.generalIsEscalation === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.GENERAL_IS_ESCALATION_PROD_IN_TROUBLE_QUESTION.display}</h3>
                                                <p>{generalInformation.generalIsEscalationPROD}</p>
                                            </li>
                                        </If>
                                        <If cond={generalInformation.generalIsEscalationPROD === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.GENERAL_IS_ESCALATION_PROD_IN_TROUBLE_EXPLAIN.display}</h3>
                                                <p>{generalInformation.generalIsEscalationPRODExplain}</p>
                                            </li>
                                        </If>
                                        <li>
                                            <h3>{messages.GENERAL_IS_REFERENCE_QUESTION.display}</h3>
                                            <p>{Preview.getDisplay(generalInformation.rhReferenceOptions, generalInformation.generalIsReference)}</p>
                                        </li>
                                        <If cond={generalInformation.generalIsReference === 'GENERAL_IS_REFERENCE_OPTION_NO'}>
                                            <li>
                                                <h3>{messages.GENERAL_REFERENCE_WILLING_QUESTION.display}</h3>
                                                <p>{generalInformation.generalReferenceWilling}</p>
                                            </li>
                                        </If>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.MENU_CLOUD.display} eventKey={2}>
                            <AppBlock>
                                <div id="cloudUseCase" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.CLOUD_TYPE_QUESTION.display}</h3>
                                            <p>{cloudUseCase.cloudType}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_PURPOSE_QUESTION.display}</h3>
                                            <p>{cloudUseCase.cloudPurpose}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_OSP_TYPE_QUESTION.display}</h3>
                                            <ul>
                                                {map(cloudUseCase.ospTypes, (o) => Preview.renderLi(cloudUseCase.ospTypeOptions, o))}
                                            </ul>
                                            <If cond={find(cloudUseCase.cloudTypes, messages.OPTION_OTHER.value) != null}>
                                                <span>{cloudUseCase.ospTypeOptionOtherContent}</span>
                                            </If>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_WORKLOADS_QUESTION.display}</h3>
                                            <p>{cloudUseCase.workloads}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_SPECIAL_USE_CASE_QUESTION.display}</h3>
                                            <ul>
                                                {map(cloudUseCase.cloudSpecialUseCases, (o) => Preview.renderLi(cloudUseCase.cloudSpecialUseCaseOptions, o))}
                                            </ul>
                                            <If cond={includes(cloudUseCase.cloudSpecialUseCases, messages.OPTION_OTHER.value)}>
                                                <span>{cloudUseCase.cloudSpecialUseCaseOtherContent}</span>
                                            </If>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_APPS_QUESTION_1.display}</h3>
                                            <p>{cloudUseCase.isCustomerPurchaseApps}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_APPS_QUESTION_2.display}</h3>
                                            <ul>
                                                {map(cloudUseCase.cloudCustomerDeployedAppsTypes, (o) => Preview.renderLi(cloudUseCase.cloudCustomerDeployedAppsTypeOptions, o))}
                                            </ul>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_SERVICES_QUESTION.display}</h3>
                                            <ul>
                                                {map(cloudUseCase.cloudServices, (o) => Preview.renderLi(cloudUseCase.cloudServiceOptions, o))}
                                            </ul>
                                            <If cond={includes(cloudUseCase.cloudServices, messages.OPTION_OTHER.value)}>
                                                <span>{cloudUseCase.cloudServicesOtherContent}</span>
                                            </If>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_MULTIPLE_TARGET_QUESTION.display}</h3>
                                            <p>{cloudUseCase.cloudMultipleTarget}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_IS_COMPUTE_RESOURCES_GROUPED_QUESTION.display}</h3>
                                            <p>{cloudUseCase.isCloudComputeResourcesGrouped}</p>
                                        </li>
                                        <If cond={cloudUseCase.isCloudComputeResourcesGrouped === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.CLOUD_COMPUTE_RESOURCES_GROUPING_METHODS_QUESTION.display}</h3>
                                                <ul>
                                                    {map(cloudUseCase.cloudComputeResourcesGroupedTypes, (o) => Preview.renderLi(cloudUseCase.cloudComputeResourcesGroupedTypeOptions, o))}
                                                </ul>
                                            </li>
                                        </If>
                                        <li>
                                            <h3>{messages.CLOUD_HA_REQUIREMENT_QUESTION.display}</h3>
                                            <p>{cloudUseCase.cloudHARequirement}</p>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.MENU_CLOUD_ARCHITECTURE.display} eventKey={3}>
                            <AppBlock>
                                <div id="cloudArchitecture" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_INSTALLATION_QUESTION.display}</h3>
                                            <If cond={cloudArchitecture.cloudInstallType !== messages.OPTION_OTHER.value}><p>{cloudArchitecture.cloudInstallType}</p></If>
                                            <If cond={cloudArchitecture.cloudInstallType === messages.OPTION_OTHER.value}><p>{cloudArchitecture.cloudInstallTypeOther}</p></If>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_COMPUTE_HYPERVISOR_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudComputeHypervisor}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_COMPUTE_PHYSICAL_SERVER_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudComputePhysical}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_COMPUTE_NODE_COUNT_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudComputeNodeCount}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_LDAP_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudLDAPIntegration}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_CONTROLLER_LAYOUT_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudControllerLayout}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_CONTROL_PLANE_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudControlPlane}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_CONTROLLER_PHYSICAL_SERVER_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudControllerPhysical}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_MULTI_SITE_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudMultiSite}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_BACKUP_CONTROL_PLANE_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudBRApproachForControlPlane}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_BACKUP_USER_OBJECTS_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudBRApproachForUserObjects}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_DISASTER_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudDisasterApproach}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_MESSAGE_BROKER_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.cloudMessageBroker}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.CLOUD_ARCHITECTURE_MONITOR_QUESTION.display}</h3>
                                            <p>{cloudArchitecture.hasMonitorTool}</p>
                                        </li>
                                        <If cond={cloudArchitecture.hasMonitorTool === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.CLOUD_ARCHITECTURE_MONITOR_PLACEHOLDER.display}</h3>
                                                <p>{cloudArchitecture.cloudMonitorTool}</p>
                                            </li>
                                        </If>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                    </Tabs>
                    <Tabs id="networkingArchitectureTabs" justified={true} defaultActiveKey={1}>
                        <Tab title={messages.MENU_NETWORKING_ARCHITECTURE.display} eventKey={1}>
                            <AppBlock>
                                <div id="networkingArchitecture" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_NEUTRON_PLUG_IN_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.networkingNeutronPlugIn}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_INFRASTRUCTURE_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.networkingInfrastructure}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_IS_BOND_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.isNetworkingInterfacesBonded}</p>
                                        </li>
                                        <If cond={networkingArchitecture.isNetworkingInterfacesBonded === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.NETWORKING_ARCHITECTURE_BONDING_MODE_QUESTION.display}</h3>
                                                <p>{networkingArchitecture.networkingInterfacesBond}</p>
                                            </li>
                                        </If>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_TENANT_QUESTION.display}</h3>
                                            <ul>
                                                {map(networkingArchitecture.networkingTenants, (o) => Preview.renderLi(networkingArchitecture.networkingTenantOptions, o))}
                                            </ul>
                                            <If cond={includes(networkingArchitecture.networkingTenants, messages.OPTION_OTHER.value)}>
                                                <span>{networkingArchitecture.networkingTenantOtherContent}</span>
                                            </If>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_NETWORKS_COUNT_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.networkingProviderNetworksCount}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_APPROACH_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.networkingApproach}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_BRIDGING_QUESTION.display}</h3>
                                            <If cond={networkingArchitecture.networkingBridging !== messages.OPTION_OTHER.value}><p>{networkingArchitecture.networkingBridging}</p></If>
                                            <If cond={networkingArchitecture.networkingBridging === messages.OPTION_OTHER.value}><p>{networkingArchitecture.networkingBridgingOtherContent}</p></If>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_ROUTING_PROVISIONING_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.networkingRoutingProvisioning}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.NETWORKING_ARCHITECTURE_ROUTING_EXTERNAL_QUESTION.display}</h3>
                                            <p>{networkingArchitecture.networkingRoutingExternal}</p>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.MENU_STORAGE_ARCHITECTURE.display} eventKey={2}>
                            <AppBlock>
                                <div id="storageArchitecture" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.STORAGE_ARCHITECTURE_STORAGE_PLUGINS_QUESTION.display}</h3>
                                            <ul>
                                                {map(storageArchitecture.storagePlugIn, (o) => Preview.renderLi(storageArchitecture.storagePlugInOptions, o))}
                                            </ul>
                                            <If cond={includes(storageArchitecture.storagePlugIn, messages.OPTION_OTHER.value)}>
                                                <span>{storageArchitecture.storagePlugInOtherContent}</span>
                                            </If>
                                        </li>
                                        <If cond={storageArchitecture.storagePlugIn === 'Ceph'}>
                                            <li>
                                                <h3>{messages.STORAGE_ARCHITECTURE_PHYSICAL_SERVER_QUESTION.display}</h3>
                                                <p>{storageArchitecture.storageCephPhysicalServer}</p>
                                            </li>
                                        </If>
                                        <If cond={storageArchitecture.storagePlugIn === 'Ceph'}>
                                            <li>
                                                <h3>{messages.STORAGE_ARCHITECTURE_NEW_CEPH_QUESTION.display}</h3>
                                                <p>{storageArchitecture.isNewCephPlanned}</p>
                                            </li>
                                        </If>
                                        <If cond={storageArchitecture.storagePlugIn === 'Ceph' && storageArchitecture.isNewCephPlanned === messages.BUTTON_NO.display}>
                                            <li>
                                                <h3>{messages.STORAGE_ARCHITECTURE_EXISTING_CEPH_QUESTION.display}</h3>
                                                <p>{storageArchitecture.isExistingCephPlanned}</p>
                                            </li>
                                        </If>
                                        <li>
                                            <h3>{messages.STORAGE_ARCHITECTURE_GLANCE_QUESTION.display}</h3>
                                            <If cond={storageArchitecture.storageGlance !== messages.OPTION_OTHER.value}><p>{storageArchitecture.storageGlance}</p></If>
                                            <If cond={storageArchitecture.storageGlance === messages.OPTION_OTHER.value}><p>{storageArchitecture.storageGlanceOther}</p></If>
                                        </li>
                                        <li>
                                            <h3>{messages.STORAGE_ARCHITECTURE_NOVA_QUESTION.display}</h3>
                                            <If cond={storageArchitecture.storageNova !== messages.OPTION_OTHER.value}><p>{storageArchitecture.storageNova}</p></If>
                                            <If cond={storageArchitecture.storageNova === messages.OPTION_OTHER.value}><p>{storageArchitecture.storageNovaOther}</p></If>
                                        </li>
                                        <li>
                                            <h3>{messages.STORAGE_ARCHITECTURE_CINDER_QUESTION.display}</h3>
                                            <If cond={storageArchitecture.storageCinder !== messages.OPTION_OTHER.value}><p>{storageArchitecture.storageCinder}</p></If>
                                            <If cond={storageArchitecture.storageCinder === messages.OPTION_OTHER.value}><p>{storageArchitecture.storageCinderOther}</p></If>
                                        </li>
                                        <li>
                                            <h3>{messages.STORAGE_ARCHITECTURE_SWIFT_QUESTION.display}</h3>
                                            <If cond={storageArchitecture.storageSwift !== messages.OPTION_OTHER.value}><p>{storageArchitecture.storageSwift}</p></If>
                                            <If cond={storageArchitecture.storageSwift === messages.OPTION_OTHER.value}><p>{storageArchitecture.storageSwiftOther}</p></If>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                        <Tab title={messages.MENU_WORKLOAD_SCALING.display} eventKey={3}>
                            <AppBlock>
                                <div id="workloadScaling" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_PROJECTS_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingProjectsCount}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_USERS_PROJECTS_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingProjectsUserCount}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_INSTANCES_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingInstances}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_INSTANCES_AVERAGE_SIZE_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingInstancesAverageSize}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_VOLUMES_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingVolumes}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_VOLUMES_AVERAGE_SIZE_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingVolumesAverageSize}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_OBJECTS_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingObjects}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_OBJECTS_AVERAGE_SIZE_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingObjectsAverageSize}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_TENANT_NETWORKS_QUESTION.display}</h3>
                                            <p>{workloadScaling.workloadScalingTenant}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.WORKLOAD_SCALING_ADDITIONAL_QUESTION.display}</h3>
                                            <p>{workloadScaling.hasAdditionalParam}</p>
                                        </li>
                                        <If cond={workloadScaling.hasAdditionalParam === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.WORKLOAD_SCALING_VNICS_QUESTION.display}</h3>
                                                <p>{workloadScaling.workloadScalingAdditionalVnics}</p>
                                            </li>
                                        </If>
                                        <If cond={workloadScaling.hasAdditionalParam === messages.BUTTON_YES.display}>
                                            <li>
                                                <h3>{messages.WORKLOAD_SCALING_VOLUMES_PER_INSTANCE_QUESTION.display}</h3>
                                                <p>{workloadScaling.workloadScalingAdditionalVolumes}</p>
                                            </li>
                                        </If>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                    </Tabs>
                    <Tabs id="additionalSupportingDocumentsTabs" justified={true} defaultActiveKey={1}>
                        <Tab title={messages.MENU_ADDITIONAL_SUPPORTING_DOCUMENTS.display} eventKey={1}>
                            <AppBlock>
                                <div id="additionalDocs" className="content">
                                    <ul>
                                        <li>
                                            <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ARCHITECURE_QUESTION.display}</h3>
                                            <p>{additionalSupportingDocuments.additionalDocsArchitecure}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ISSUE_QUESTION.display}</h3>
                                            <p>{additionalSupportingDocuments.additionalDocsIssue}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_THIRD_PARTY_QUESTION.display}</h3>
                                            <p>{additionalSupportingDocuments.additionalDocsThirdParty}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_RFE_QUESTION.display}</h3>
                                            <p>{additionalSupportingDocuments.additionalDocsRFE}</p>
                                        </li>
                                        <li>
                                            <h3>{messages.ADDITIONAL_SUPPORTING_DOCUMENTS_ENV_DIAGRAMS_QUESTION.display}</h3>
                                            <p>{additionalSupportingDocuments.additionalDocsENVDiagrams}</p>
                                        </li>
                                    </ul>
                                </div>
                            </AppBlock>
                        </Tab>
                    </Tabs>
                </Row>
                {/*<div ng-if="showMsg" className="row">*/}
                    {/*<div className="col-xs-12">*/}
                        {/*<div className="alert alert-info alert-w-icon"><i ng-if="isSendingMail" className="fa fa-refresh fa-spin">&#160;&#160;</i><i ng-if="!isSendingMail" className="fa fa-info-circle">&#160;&#160;</i>{{message | translate}}</div>*/}
                    {/*// </div>*/}
                {/*// </div>*/}
                <Row>
                    <Col xs={12}>
                        <div className="btn-group pull-right">
                            <DropdownButton id="previewActions" bsStyle="default" title={messages.BUTTON_MORE_ACTION.display}>
                                <MenuItem onClick={this.generatePDF} eventKey={1}>{messages.BUTTON_GENERATE_PDF.display}</MenuItem>
                                <MenuItem divider={true}/>
                                <MenuItem onClick={this.sendMail} eventKey={2}>{messages.BUTTON_SEND_MAIL.display}</MenuItem>
                            </DropdownButton>
                        </div>
                    </Col>
                </Row>
            </Content>
        )
    }
}

Preview.propTypes = {
    step: Utils.navigationShape,
    answers: PropTypes.object.isRequired,
    uuid: PropTypes.string.isRequired,
    prevStep: Utils.navigationShape,
    modifyStep: PropTypes.func.isRequired,
    sendEmail: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default Preview;
