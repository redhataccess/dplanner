import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { updateState }          from '../../flux/actions/AnswerActions'
import { modifyStep }           from '../../flux/actions/StepActions'
import CloudUseCases            from '../../components/steps/CloudUseCases.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.GENERAL_INFORMATION,
        nextStep: Utils.navigationLookup.CLOUD_ARCHITECTURE
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({cloudUseCase: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.CLOUD_USE_CASE, answers));
        }
    }
};

const CloudUseCasesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CloudUseCases);

export default CloudUseCasesContainer;