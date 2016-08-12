import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { updateState }          from '../../flux/actions/AnswerActions'
import { modifyStep }           from '../../flux/actions/StepActions'
import WorkloadScaling          from '../../components/steps/WorkloadScaling'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.STORAGE_ARCHITECTURE,
        nextStep: Utils.navigationLookup.ADDITIONAL_SUPPORTING_DOCUMENTS
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({workloadScaling: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.WORKLOAD_SCALING, answers));
        }
    }
};

const WorkloadScalingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkloadScaling);

export default WorkloadScalingContainer;