import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { updateState }          from '../../flux/actions/AnswerActions'
import { modifyStep }           from '../../flux/actions/StepActions'
import GeneralInformation       from '../../components/steps/GeneralInformation.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.PROGRAM_NOMINATION,
        nextStep: Utils.navigationLookup.CLOUD_USE_CASE
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({generalInformation: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.GENERAL_INFORMATION, answers));
        }
    }
};

const GeneralInformationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GeneralInformation);

export default GeneralInformationContainer;