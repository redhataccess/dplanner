import { ERROR, STEP, MAX_STEP }    from '../constants/ActionTypes'
import { savePlan }          from '../actions/PlanCacheActions'

export function errorAction(err) {
    return {
        type: ERROR,
        err
    }
}

export function stepAction(step) {
    return {
        type: STEP,
        step
    }
}

export function maxStepAction(maxStep) {
    return {
        type: MAX_STEP,
        maxStep
    }
}

export function modifyStep(step, answers) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    return function (dispatch) {
        // Reset the error
        dispatch(stepAction(step));
        // For the current set of answers make sure the maxStep is always set to the greater of either what answer we are
        // on or the max one we've seen
        answers.maxStep = Math.max(step.step, answers.maxStep);
        dispatch(maxStepAction(answers.maxStep));
        dispatch(savePlan(answers.id, answers, false));
    }
}
