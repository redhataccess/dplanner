import messages from '../../messages/messages_en'

export function makeAnswers(obj={}) {
    return {
        created: obj.created,
        lastModified: obj.created,
        name: obj.name || obj.id,
        id: obj.id,
        maxStep: 1,
        programNomination: {
            phasedGates: '',
            cloudSuccessArchitect: '',
            engineeringFieldEngagement: '',
            customerName: '',
            customerAccountNumber: '',
            customerContact: '',
            customerContactEmail: '',
            customerContactLoginName: '',
            projectLocation: '',
            customerContactLocation: '',
            regionAndTerritory: 'United States',
            timezone: '(GMT-05:00) Eastern Time',
            solutionArchitect: '',
            reporter: '',
            reporterEmail: '',
            salesRep: '',
            cloudSSP: '',
            salesLeader: '',
            GPSContact: '',
            SRMOrTAM: '',
            headcountResource: '',
            hardwareResource: '',
            planningStart: ' ',
            planningEnd: ' ',
            stagingStart: ' ',
            stagingEnd: ' ',
            installationStart: ' ',
            installationEnd: ' ',
            evaluationStart: ' ',
            evaluationEnd: ' ',
            onsiteDate: '',
            postPOCPlan: '',
            leader: '',
            leaderOther: '',
            isRequestByCustomer: '',
            salesLeaders: [],
            salesLeaderOptions: [
                {
                    display: 'NA Commercial, Marcus Cziesla',
                    value: 'NA Commercial, Marcus Cziesla'
                }, {
                    display: 'NA Public Sector, Joel Jackson',
                    value: 'NA Public Sector, Joel Jackson'
                }, {
                    display: 'EMEA, Franz Meyer',
                    value: 'EMEA, Franz Meyer'
                }, {
                    display: 'APAC, Kingsley Wood',
                    value: 'APAC, Kingsley Wood'
                }, {
                    display: 'LATAM, Adrian Cambareri',
                    value: 'LATAM, Adrian Cambareri'
                }, {
                    display: 'TELCO/NFV, Darrell Jordan Smith',
                    value: 'TELCO/NFV, Darrell Jordan Smith'
                }
            ],
            salesLeaderOther: '',
            projectTypeOptions: [
                {
                    display: messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_OPTION_1.display,
                    value: 'PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_OPTION_1',
                }, {
                    display: messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_OPTION_2.display,
                    value: 'PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_OPTION_2',
                }, {
                    display: messages.PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_OPTION_3.display,
                    value: 'PROGRAM_NOMINATION_ENGINEERING_FIELD_ENGAGEMENT_PROJECT_TYPE_OPTION_3'
                }, {
                    display: messages.OPTION_OTHER.display,
                    value: messages.OPTION_OTHER.value
                }
            ],
            projectTypes: '',
            projectTypeOther: '',
            onsitePhase: '',
            isEnvRemoteAccessible: '',
            isCustomerParticipate: '',
        },
        generalInformation: {
            previousExperience: '',
            cloudSituation: '',
            generalIsPOC: '',
            generalIsEscalation: '',
            generalIsEscalationPOC: '',
            generalIsEscalationPROD: '',
            generalIsEscalationPRODExplain: '',
            ospPurpose: '',
            ospPurposeOptions: [
                {
                    display: messages.GENERAL_PURPOSE_OPTION_POC.display,
                    value: 'GENERAL_PURPOSE_OPTION_POC'
                }, {
                    display: messages.GENERAL_PURPOSE_OPTION_PROD.display,
                    value: 'GENERAL_PURPOSE_OPTION_PROD'
                }
            ],
            ospInstallationType: '',
            ospInstallationOptions: [
                {
                    display: messages.GENERAL_INSTALLATION_TYPE_OPTION_NEW.display,
                    value: 'GENERAL_INSTALLATION_TYPE_OPTION_NEW'
                }, {
                    display: messages.GENERAL_INSTALLATION_TYPE_OPTION_UPGRADE.display,
                    value: 'GENERAL_INSTALLATION_TYPE_OPTION_UPGRADE'
                }
            ],
            generalIsReference: '',
            generalReferenceWilling: '',
            rhReferenceOptions: [
                {
                    display: messages.GENERAL_IS_REFERENCE_OPTION_PUBLIC.display,
                    value: 'GENERAL_IS_REFERENCE_OPTION_PUBLIC'
                }, {
                    display: messages.GENERAL_IS_REFERENCE_OPTION_PRIVATE.display,
                    value: 'GENERAL_IS_REFERENCE_OPTION_PRIVATE'
                },
                {
                    display: messages.GENERAL_IS_REFERENCE_OPTION_NO.display,
                    value: 'GENERAL_IS_REFERENCE_OPTION_NO'
                }
            ],
            currentRHELVersion: '7.2',
            rhelVersions: [
                '7.2',
                '7.1',
                '6.7',
                '6.6',
                '6.5',
                '6.4',
                '6.3',
                '6.2',
                '6.1',
                '6.0'
            ],
            currentOSPVersion: '7.0',
            ospVersion: '7.0',
            ospVersions: [
                '7.0',
                '8.0'
            ],
            currentOSPDVersion: '7.0',
            ospdVersion: '7.0',
            ospdVersions: [
                '7.0',
                '7.1',
                '7.2',
                '7.3',
                '8.0'
            ]
        },
        cloudUseCase: {
            cloudType: '',
            cloudPurpose: '',
            ospTypes: [],
            ospTypeOptionOtherContent: '',
            ospTypeOptions: [
                {
                    display: messages.CLOUD_OSP_OPTION_IAAS.display,
                    value: 'CLOUD_OSP_OPTION_IAAS'
                }, {
                    display: messages.CLOUD_OSP_OPTION_PAAS.display,
                    value: 'CLOUD_OSP_OPTION_PAAS'
                }, {
                    display: messages.CLOUD_OSP_OPTION_SAAS.display,
                    value: 'CLOUD_OSP_OPTION_SAAS'
                }, {
                    display: messages.CLOUD_OSP_OPTION_DAAS.display,
                    value: 'CLOUD_OSP_OPTION_DAAS'
                }, {
                    display: messages.OPTION_OTHER.display,
                    value: messages.OPTION_OTHER.display
                }
            ],
            cloudTypes: [
                messages.CLOUD_TYPE_OPTION_PRIVATE.display,
                messages.CLOUD_TYPE_OPTION_HOSTED.display,
                messages.CLOUD_TYPE_OPTION_PUBLIC.display
            ],
            cloudPurposes: [
                messages.CLOUD_PURPOSE_OPTION_DEV.display,
                messages.CLOUD_PURPOSE_OPTION_PROD.display,
                messages.CLOUD_PURPOSE_OPTION_RESEARCH.display
            ],
            workloads: '',
            cloudSpecialUseCaseOtherContent: '',
            cloudSpecialUseCases: [],
            cloudSpecialUseCaseOptions: [
                {
                    display: 'Telco-NIV',
                    value: 'Telco-NIV'
                }, {
                    display: 'Object-Image Storage',
                    value: 'Object-Image Storage',
                }, {
                    display: 'Big Data/Analytics',
                    value: 'Big Data/Analytics'
                }, {
                    display: messages.OPTION_OTHER.display,
                    value: messages.OPTION_OTHER.display
                }
            ],
            isCustomerPurchaseApps: '',
            cloudServices: [],
            cloudServicesOtherContent: '',
            cloudServiceOptions: [
                {
                    display: 'Cells',
                    value: 'Cells'
                }, {
                    display: 'DBaas',
                    value: 'DBaas',
                }, {
                    display: 'DVR',
                    value: 'DVR'
                }, {
                    display: 'DNSaaS',
                    value: 'DNSaaS'
                }, {
                    display: 'Reassure Coding',
                    value: 'Reassure Coding',
                }, {
                    display: 'File Sharing Service',
                    value: 'File Sharing Service',
                }, {
                    display: 'FWaaS',
                    value: 'FWaaS',
                }, {
                    display: messages.OPTION_OTHER.display,
                    value: messages.OPTION_OTHER.value
                }
            ],
            cloudMultipleTarget: '',
            isCloudComputeResourcesGrouped: '',
            cloudComputeResourcesGroupedTypes: [],
            cloudComputeResourcesGroupedTypeOptions: [
                {
                    display: 'Cells',
                    value: 'Cells'
                }, {
                    display: 'Regions',
                    value: 'Regions'
                }, {
                    display: 'Availability Zones',
                    value: 'Availability Zones'
                }, {
                    display: 'Host Aggregates',
                    value: 'Host Aggregates'
                }
            ],
            cloudHARequirement: '',
            cloudCustomerDeployedAppsTypes: [],
            cloudCustomerDeployedAppsTypeOptions: [
                {
                    display: messages.CLOUD_APPS_QUESTION_2_OPTION_TRADITIONAL.display,
                    value: 'traditional',
                    tooltip: {
                        'title': 'Test',
                        'body': 'Test'
                    }
                },
                {
                    display: messages.CLOUD_APPS_QUESTION_2_OPTION_CLOUD_AWARE.display,
                    value: 'cloud',
                    tooltip: {
                        'title': 'Test',
                        'body': 'Test'
                    }

                }
            ]
        },
        cloudArchitecture: {
            cloudInstallType: '',
            cloudInstallTypeOther: '',
            cloudComputeHypervisor: '',
            cloudComputePhysical: '',
            cloudComputeNodeCount: '',
            cloudLDAPIntegration: '',
            cloudControllerLayout: '',
            cloudControlPlane: '',
            cloudControllerPhysical: '',
            cloudMultiSite: '',
            cloudBRApproachForControlPlane: '',
            cloudBRApproachForUserObjects: '',
            cloudDisasterApproach: '',
            cloudMessageBroker: '',
            hasMonitorTool: '',
            cloudMonitorTool: '',
        },
        networkingArchitecture: {
            networkingNeutronPlugIn: '',
            networkingInfrastructure: '',
            isNetworkingInterfacesBonded: '',
            networkingInterfacesBond: '',
            networkingTenants: [],
            networkingTenantOtherContent: '',
            networkingTenantOptions: [
                {
                    display: 'VxLAN',
                    value: 'VxLAN'
                }, {
                    display: 'VLANs',
                    value: 'VLANs'
                }, {
                    display: 'GRE',
                    value: 'GRE'
                }, {
                    display: messages.OPTION_OTHER.display,
                    value: messages.OPTION_OTHER.value
                }
            ],
            networkingProviderNetworksCount: '',
            networkingApproach: '',
            networkingBridging: '',
            networkingBridgingOtherContent: '',
            networkingRoutingProvisioning: '',
            networkingRoutingExternal: '',
        },
        storageArchitecture: {
            storagePlugIn: [],
            storagePlugInOtherContent: '',
            storagePlugInOptions: [
                {
                    display: 'Ceph',
                    value: 'Ceph'
                }, {
                    display: messages.OPTION_OTHER.display,
                    value: messages.OPTION_OTHER.value
                }
            ],
            isCephPlanned: '',
            isNewCephPlanned: '',
            isExistingCephPlanned: '',
            storageCephPhysicalServer: '',
            storageGlance: '',
            storageGlanceOther: '',
            storageNova: '',
            storageNovaOther: '',
            storageCinder: '',
            storageCinderOther: '',
            storageSwift: '',
            storageSwiftOther: '',

        },
        workloadScaling: {
            workloadScalingProjectsCount: '',
            workloadScalingProjectsUserCount: '',
            workloadScalingInstances: '',
            workloadScalingInstancesAverageSize: '',
            workloadScalingVolumes: '',
            workloadScalingVolumesAverageSize: '',
            workloadScalingObjects: '',
            workloadScalingObjectsAverageSize: '',
            workloadScalingTenant: '',
            hasAdditionalParam: '',
            workloadScalingAdditionalVnics: '',
            workloadScalingAdditionalVolumes: '',
            countRangeOptions: [
                '< 10',
                '10 - 50',
                '50 - 100',
                '100 - 500',
                '> 500'
            ]
        },
        additionalSupportingDocuments: {
            additionalDocsArchitecure: '',
            additionalDocsIssue: '',
            additionalDocsThirdParty: '',
            additionalDocsRFE: '',
            additionalDocsENVDiagrams: ''
        }
    };
}
