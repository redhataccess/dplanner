import connect                  from 'react-redux/lib/components/connect'
import Utils                    from '../../utils'
import { updateState }          from '../../flux/actions/AnswerActions'
import { modifyStep }           from '../../flux/actions/StepActions'
import ProgramNomination        from '../../components/steps/ProgramNomination.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        nextStep: Utils.navigationLookup.GENERAL_INFORMATION
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({programNomination: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.PROGRAM_NOMINATION, answers));
        }
    }
};

const ProgramNominationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgramNomination);

export default ProgramNominationContainer;