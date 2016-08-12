import lf                   from 'localforage'
import { browserHistory }   from 'react-router'
import cloneDeep            from 'lodash/cloneDeep'
import forIn                from 'lodash/forIn'
import each                 from 'lodash/each'
import moment               from 'moment'
import uuid                 from 'node-uuid'

import messages             from '../../messages/messages_en'
import Utils                from '../../utils'
import { makeAnswers }      from '../reducers/defaultAnswers'

import {
    ERROR,
    SAVE_PLAN,
    DELETE_PLAN,
    LOAD_PLAN,
    PLANS_LOADED,
    PLANS_NOT_LOADED,
    MAX_STEP,
    STEP,
    PLANS
}   from '../constants/ActionTypes'

lf.config({
    name: 'dplanner'
});

export function errorAction(err) {
    return {
        type: ERROR,
        err
    }
}

export function savePlanAction(plan) {
    return {
        type: SAVE_PLAN,
        plan
    }
}

// export function deletePlanAction(plan) {
//     return {
//         type: DELETE_PLAN,
//         plan
//     }
// }

export function loadPlanAction(plan) {
    return {
        type: LOAD_PLAN,
        plan
    }
}

export function plansStatusAction(status) {
    return {
        type: PLANS_LOADED,
        status
    }
}

export function plansAction(plans) {
    return {
        type: PLANS,
        plans
    }
}

export function maxStepAction(maxStep) {
    return {
        type: MAX_STEP,
        maxStep
    }
}

export function stepAction(step) {
    return {
        type: STEP,
        step
    }
}

function makeKey(name) {
    return `${Utils.getRHUserCookie()}-${name}`
}

export function getPlanFromCache(id) {
    return lf.getItem(makeKey(id));
}

function getPlansFromCache() {
    const cachedPlans = [];
    return lf.iterate((value, key, idx) => {
        cachedPlans.push(value);
    }).then(() => {
        // All plans loaded
        return cachedPlans;
    })
}

export function loadCachedPlans() {
    return function (dispatch) {
        dispatch(errorAction(null));

        getPlansFromCache().then(cachedPlans => {
            dispatch(plansStatusAction(PLANS_LOADED));
            dispatch(plansAction(cachedPlans));
        }).catch(err => {
            dispatch(plansStatusAction(PLANS_NOT_LOADED));
            console.warn(`Could not load cached plans`);
            console.error(err);
        });
    }
}

export function savePlanToCache(id, plan) {
    plan.lastModified = +moment();
    return lf.setItem(makeKey(id), plan);
}

export function savePlan(id, plan, alert=true) {
    return function (dispatch) {
        if (!id) return dispatch(errorAction({message: messages.PLAN_SAVE_ERROR_NO_ID.display}));
        if (!plan) return dispatch(errorAction({message: messages.PLAN_SAVE_ERROR_NO_ANSWERS.display}));

        if (alert) dispatch(errorAction(null));
        return savePlanToCache(id, plan).then((value) => {
            if (alert) dispatch(errorAction({message: messages.PLAN_SAVED.display, bsStyle: 'success'}));
            dispatch(savePlanAction(plan));
        }).catch(err => {
            dispatch(errorAction({message: messages.PLAN_SAVE_ERROR.display}));
            console.error(err)
        });
    }
}


export function newPlan(name) {
    return function (dispatch) {
        dispatch(errorAction(null));

        const newPlan = makeAnswers({id: uuid.v1(), name: name, created: +moment()});

        return savePlanToCache(newPlan.id, newPlan).then((value) => {
            // When loading a plan always default to the first step
            dispatch(stepAction(Utils.navigationLookup.PROGRAM_NOMINATION));
            // Load the maxStep if it is set or defualt to the first step
            dispatch(maxStepAction(newPlan.maxStep || 1));
            dispatch(loadPlanAction(newPlan));

            getPlansFromCache().then(cachedPlans => {
                dispatch(plansStatusAction(PLANS_LOADED));
                dispatch(plansAction(cachedPlans));
                browserHistory.push(`${Utils.browserPath}/${newPlan.id}/${Utils.navigationLookup.PROGRAM_NOMINATION.link}`);
            });
        }).catch(err => {
            dispatch(errorAction({message: messages.PLAN_NEW_ERROR.display}));
            console.error(err)
        });
    }
}

export function editPlan(fieldValueObj, plan) {
    return function (dispatch) {
        if (!plan) return dispatch(errorAction({message: messages.PLAN_EDIT_ERROR_NO_ANSWERS.display}));
        if (!plan.id) return dispatch(errorAction({message: messages.PLAN_EDIT_ERROR_NO_ID.display}));

        dispatch(errorAction(null));

        // The fieldValueObj looks like, for ex. {name: 'foobaz'}
        const newAnswers = cloneDeep(plan);
        forIn(fieldValueObj, (value, key) => {
            newAnswers[key] = value;
        });

        return savePlanToCache(plan.id, newAnswers).then((value) => {
            dispatch(savePlanAction(newAnswers));
            return getPlansFromCache();
        }).then(cachedPlans => {
            dispatch(plansStatusAction(PLANS_LOADED));
            dispatch(plansAction(cachedPlans));
        }).catch(err => {
            dispatch(errorAction({message: messages.PLAN_EDIT_ERROR.display}));
            console.error(err)
        });
    }
}

export function deletePlan(id) {
    return function (dispatch) {
        if (!id) return dispatch(errorAction({message: messages.PLAN_DELETE_ERROR_NO_ID.display}));

        dispatch(errorAction(null));

        return lf.removeItem(makeKey(id)).then(() => {
            dispatch(errorAction({message: messages.PLAN_DELETED.display, bsStyle: 'success'}));

            getPlansFromCache().then(cachedPlans => {

                each(cachedPlans, p => {
                    if (p.id === id) {
                        console.error(`Supposedly deleted id: ${id}, yet it still exists!!!!`);
                    }
                });

                // Once we've fetched the remaining existing cached plans, load the first one we get
                if (cachedPlans && cachedPlans.length > 0) {
                    const cachedPlan = cachedPlans[0];

                    dispatch(stepAction(Utils.navigationLookup.PROGRAM_NOMINATION));
                    // Load the maxStep if it is set or defualt to the first step
                    dispatch(maxStepAction(cachedPlan.maxStep || 1));
                    dispatch(loadPlanAction(cachedPlan));

                    dispatch(plansStatusAction(PLANS_LOADED));
                    dispatch(plansAction(cachedPlans));
                    browserHistory.push(`${Utils.browserPath}/${cachedPlan.id}/${Utils.navigationLookup.PROGRAM_NOMINATION.link}`);

                }
                // Or if there aren't any, create a new one given the given id
                else {
                    dispatch(plansStatusAction(PLANS_LOADED));
                    dispatch(plansAction([]));
                    browserHistory.push(`${Utils.browserPath}/new`);
                }
            }).catch(err => {
                dispatch(plansStatusAction(PLANS_NOT_LOADED));
                console.warn(`Could not load cached plans`);
                console.error(err);
            });
            // If there are none to load create a new plan
        }).catch(err => {
            dispatch(errorAction({message: messages.PLAN_DELETE_ERROR.display}));
            console.error(err)
        });

    }
}

export function loadPlan(id) {
    return function (dispatch) {
        if (!id) return dispatch(errorAction({message: messages.PLAN_LOAD_ERROR_NO_ID.display}));

        dispatch(errorAction(null));
        return getPlanFromCache(id).then((plan) => {
            if (plan == null) {
                dispatch(errorAction({message: messages.PLAN_LOAD_ERROR_NO_ID.display}));
                browserHistory.push(`${Utils.browserPath}/new`);
            } else {
                dispatch(errorAction({message: messages.PLAN_LOAD.display, bsStyle: 'success'}));
                // When loading a plan always default to the first step
                dispatch(stepAction(Utils.navigationLookup.PROGRAM_NOMINATION));
                // Load the maxStep if it is set or defualt to the first step
                dispatch(maxStepAction(plan.maxStep || 1));
                dispatch(loadPlanAction(plan));
            }
        }).catch(err => {
            console.warn(err);
            dispatch(errorAction({message: messages.PLAN_LOAD_ERROR_NO_ID.display}));
            browserHistory.push(`${Utils.browserPath}/new`);
        });
    }
}
