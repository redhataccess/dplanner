import { ERROR, ANSWER_ACTION }     from '../constants/ActionTypes'
import { savePlanToCache }          from '../actions/PlanCacheActions'
import moment                       from 'moment'
import forIn                        from 'lodash/forIn'
import cloneDeep                    from 'lodash/cloneDeep'

export function errorAction(err) {
    return {
        type: ERROR,
        err
    }
}

export function answerAction(answers) {
    return {
        type: ANSWER_ACTION,
        answers
    }
}

export function clearErrors() {
    return function (dispatch) {
        dispatch(errorAction(null));
    }
}

export function updateState(fieldValueObj, answers) {
    return function (dispatch) {
        dispatch(errorAction(null));

        // The fieldValueObj looks like, for ex. {programNomination: {phasedGates: 'test'}}
        const newAnswers = cloneDeep(answers);
        forIn(fieldValueObj, (value, key) => {
            forIn(value, (subValue, subKey) => {
                newAnswers[key][subKey] = subValue;
            });
        });

        newAnswers.lastModified = +moment();

        savePlanToCache(answers.id, newAnswers).then(() => {
            // Plan saved, but nothing to really do here
        }).catch(err=> {
            console.warn(`Could not save plan after updating answers: ${err}`)
        });
        dispatch(answerAction(newAnswers));
    }
}
