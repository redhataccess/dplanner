import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { updateState }          from '../../flux/actions/AnswerActions'
import { modifyStep }           from '../../flux/actions/StepActions'
import CloudArchitecture        from '../../components/steps/CloudArchitecture'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.CLOUD_USE_CASE,
        nextStep: Utils.navigationLookup.NETWORKING_ARCHITECTURE
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({cloudArchitecture: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.CLOUD_ARCHITECTURE, answers));
        }
    }
};

const CloudArchitectureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CloudArchitecture);

export default CloudArchitectureContainer;