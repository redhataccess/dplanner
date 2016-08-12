import combineReducers  from 'redux/lib/combineReducers'

import {
    STEP,
    MAX_STEP,
    ANSWER_ACTION,
    EMAIL_ACTION,
    SAVE_PLAN,
    DELETE_PLAN,
    LOAD_PLAN,
    PLANS_NOT_LOADED,
    PLANS_LOADED,
    PLANS,
    ERROR
} from '../constants/ActionTypes';

import Utils from '../../utils'

function error(state = null, action) {
    switch(action.type) {
        case ERROR:
            return action.err;
            break;
        default:
            return state;
    }
}

function plans(state = [], action) {
    switch(action.type) {
        case PLANS:
            return action.plans;
            break;
        default:
            return state;
    }
}

// We can use this state to know that if the plansState is null, the initial plans have yet to be loaded from cache
// then we can trigger the load
function plansStatus(state = PLANS_NOT_LOADED, action) {
    switch(action.type) {
        case PLANS_LOADED:
            return action.status;
            break;
        default:
            return state;
    }
}

function step(state = Utils.navigationLookup.PROGRAM_NOMINATION, action) {
    switch(action.type) {
        case STEP:
            return action.step;
            break;
        default:
            return state;
    }
}

function maxStep(state = Utils.navigationLookup.PROGRAM_NOMINATION.step, action) {
    switch(action.type) {
        case MAX_STEP:
            return action.maxStep;
            break;
        default:
            return state;
    }
}

function emailAction(state = 'DONE', action) {
    switch(action.type) {
        case EMAIL_ACTION:
            return action.emailStatus;
            break;
        default:
            return state;
    }
}

function answers(state = null, action) {
    switch(action.type) {
        case LOAD_PLAN:
            return action.plan;
            break;
        case SAVE_PLAN:
            return action.plan;
            break;
        case ANSWER_ACTION:
            // Assign isn't adequate, it overwrites certain nested arrays
            // return Object.assign({}, state, action.fieldValueObj);
            // Merge can't handle nested arrays, so we have to handle customize those
            // return mergeWith({}, state, action.fieldValueObj, (objValue, srcValue) => {
            //     // Instead of concatting, just return the src value, this handles checkbox arrays. Otherwise they
            //     // get mangled
            //     if (isArray(srcValue)) {
            //         return srcValue;
            //     }
            // });
            // ^^ The merge is now handled in AnswerActions, but this is a good reference
            return action.answers;
            break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    step,
    maxStep,
    answers,
    plans,
    plansStatus,
    emailAction,
    error
});

export default rootReducer;