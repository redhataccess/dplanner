import connect                      from 'react-redux/lib/components/connect'
import Utils                        from '../../utils'
import { updateState }              from '../../flux/actions/AnswerActions'
import { modifyStep }               from '../../flux/actions/StepActions'
import NetworkingArchitecture       from '../../components/steps/NetworkingArchitecture'

const mapStateToProps = (state, ownProps) => {
    return {
        step: state.default.step,
        answers: state.default.answers,
        error: state.default.error,
        uuid: ownProps.params.uuid,
        prevStep: Utils.navigationLookup.CLOUD_ARCHITECTURE,
        nextStep: Utils.navigationLookup.STORAGE_ARCHITECTURE
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (fieldValueObj, answers) => {
            dispatch(updateState({networkingArchitecture: fieldValueObj}, answers));
        },
        modifyStep: (answers) => {
            dispatch(modifyStep(Utils.navigationLookup.NETWORKING_ARCHITECTURE, answers));
        }
    }
};

const NetworkingArchitectureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetworkingArchitecture);

export default NetworkingArchitectureContainer;