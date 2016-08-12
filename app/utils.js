import { PropTypes } from 'react'
import fetch        from 'isomorphic-fetch';
import get          from 'lodash/get'
import find         from 'lodash/find'
import isBoolean    from 'lodash/isBoolean'
import isString     from 'lodash/isString'
import includes     from 'lodash/includes'
import isNumber     from 'lodash/isNumber'
import countries    from './options/countries'

let browserPath = get(window, 'dplanner.browserPath') || '/labs/dplanner';
let env = "development";
let packageJson = require("../package.json");

if (ENV == "production") {
    env = "production";
}

const truthyVals = ['YES', 'Yes', 'yes', 'Y', 'y', '1', 'true', 'TRUE', 'ok', 'OK', 'Ok'];

const navigationShape = PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
}).isRequired;

const navigationLookup = {
    PROGRAM_NOMINATION: {
        link: 'programNomination' ,
        title: 'Program Nomination',
        step: 1
    },
    GENERAL_INFORMATION: {
        link: 'generalInformation' ,
        title: 'General Information',
        step: 2
    },
    CLOUD_USE_CASE: {
        link: 'cloudUseCase' ,
        title: 'Cloud Use Cases',
        step: 3
    },
    CLOUD_ARCHITECTURE: {
        link: 'cloudArchitecture' ,
        title: 'Cloud Architecture',
        step: 4
    },
    NETWORKING_ARCHITECTURE: {
        link: 'networkingArchitecture' ,
        title: 'Networking Architecture',
        step: 5
    },
    STORAGE_ARCHITECTURE: {
        link: 'storageArchitecture' ,
        title: 'Storage Architecture',
        step: 6
    },
    WORKLOAD_SCALING: {
        link: 'workloadScaling' ,
        title: 'Workload Scaling',
        step: 7
    },
    ADDITIONAL_SUPPORTING_DOCUMENTS: {
        link: 'additionalSupportingDocuments',
        title: 'Additional Supporting Documents',
        step: 8
    },
    PREVIEW: {
        link: 'preview',
        title: 'Preview',
        step: 9
    }
};

const menuItems = [
    {
        title: navigationLookup.PROGRAM_NOMINATION.title,
        link: navigationLookup.PROGRAM_NOMINATION.link,
        step: navigationLookup.PROGRAM_NOMINATION.step
    },
    {
        title: navigationLookup.GENERAL_INFORMATION.title,
        link: navigationLookup.GENERAL_INFORMATION.link,
        step: navigationLookup.GENERAL_INFORMATION.step
    },
    {
        title: navigationLookup.CLOUD_USE_CASE.title,
        link: navigationLookup.CLOUD_USE_CASE.link,
        step: navigationLookup.CLOUD_USE_CASE.step
    },
    {
        title: navigationLookup.CLOUD_ARCHITECTURE.title,
        link: navigationLookup.CLOUD_ARCHITECTURE.link,
        step: navigationLookup.CLOUD_ARCHITECTURE.step
    },
    {
        title: navigationLookup.NETWORKING_ARCHITECTURE.title,
        link: navigationLookup.NETWORKING_ARCHITECTURE.link,
        step: navigationLookup.NETWORKING_ARCHITECTURE.step
    },
    {
        title: navigationLookup.STORAGE_ARCHITECTURE.title,
        link: navigationLookup.STORAGE_ARCHITECTURE.link,
        step: navigationLookup.STORAGE_ARCHITECTURE.step
    },
    {
        title: navigationLookup.WORKLOAD_SCALING.title,
        link: navigationLookup.WORKLOAD_SCALING.link,
        step: navigationLookup.WORKLOAD_SCALING.step
    },
    {
        title: navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS.title,
        link: navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS.link,
        step: navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS.step
    },
    {
        title: navigationLookup.PREVIEW.title,
        link: navigationLookup.PREVIEW.link,
        step: navigationLookup.PREVIEW.step
    }
];

function getThatUri(uri) {
    return fetch(uri.toString(), {credentials: 'same-origin'})
        .then(response => response.json());
}

function postThatUri(uri, body) {
    let postParams = {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return fetch(uri.toString(), postParams).then(response => response.json() )
}

function postThatUriWithParams(uri, params) {
    return fetch(uri.toString(), params).then(response => response.json() )
}

function makeUserName(u) {
    if (!u) return "";
    if (u.first_name && u.last_name) {
        return `${u.last_name}, ${u.first_name}`;
    } else if (u.last_name) {
        return u.last_name;
    } else {
        return u.first_name;
    }
}

function getCountryTimezones(countryName) {
    const country = find(countries, {name: countryName});
    if (country) {
        return country.timezones;
    }
    return [];
}

function truthy (obj) {
    if (obj === void 0) {
        return false;
    } else if (isBoolean(obj)) {
        return obj;
    } else if (isString(obj)) {
        if (includes(truthyVals, obj)) {
            return true;
        } else {
            return false;
        }
    } else if (isNumber(obj)) {
        return parseInt(obj) === 1;
    } else {
        return false;
    }
}

function getCookieValue(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function getRHUserCookie() {
    const cookieVal = getCookieValue('rh_user');
    if (!cookieVal || cookieVal === '') {
        return null;
    }
    let sso = cookieVal.split('|');
    sso = sso && sso[0];
    sso = sso && sso.replace(/"/g, '');
    return sso;
}

export default {
    navigationLookup: navigationLookup,
    navigationShape: navigationShape,
    menuItems: menuItems,
    getCountryTimezones: getCountryTimezones,
    browserPath: browserPath,
    env: env,
    version: packageJson.version,
    urlRe: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
    getThatUri: getThatUri,
    postThatUri: postThatUri,
    postThatUriWithParams: postThatUriWithParams,
    makeUserName: makeUserName,
    truthy: truthy,
    getRHUserCookie: getRHUserCookie
};